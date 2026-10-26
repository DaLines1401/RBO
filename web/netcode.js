/**
 * Ragnarok Battle Offline Web - Netcode Engine (WebRTC P2P + Relay)
 * High performance deterministic 60Hz input sync for low latency multiplayer.
 */

class RBONetcode {
  constructor(engine) {
    this.engine = engine;
    this.roomId = null;
    this.peerId = null;
    this.role = null; // 'host' or 'guest'
    this.isConnected = false;
    this.isP2P = false;
    this.peerConn = null;
    this.dataChannel = null;
    this.pollTimer = null;
    this.relayTimer = null;
    this.ping = 0;
    this.lastPingTime = 0;
    this.onStatusChange = null;

    // STUN Servers for WebRTC NAT Traversal
    this.rtcConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    };
  }

  setStatus(msg, isConnected = false, isP2P = false) {
    this.isConnected = isConnected;
    this.isP2P = isP2P;
    if (this.onStatusChange) {
      this.onStatusChange({ msg, isConnected, isP2P, ping: this.ping, role: this.role, roomId: this.roomId });
    }
  }

  // --- 1. Host Creates a Room ---
  async createRoom() {
    try {
      this.setStatus('Creating room on server...');
      const res = await fetch('/api/room/create', { method: 'POST' });
      const data = await res.json();
      this.roomId = data.roomId;
      this.peerId = data.peerId;
      this.role = 'host';

      this.setStatus(`Room created: ${this.roomId}. Waiting for player 2...`);
      this.initWebRTC();
      this.startSignalingPoll();
      return this.roomId;
    } catch(err) {
      console.error('Failed to create room:', err);
      this.setStatus('Error creating room: ' + err.message);
      throw err;
    }
  }

  // --- 2. Guest Joins a Room ---
  async joinRoom(roomId) {
    try {
      this.setStatus(`Joining room ${roomId}...`);
      const res = await fetch('/api/room/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      this.roomId = roomId;
      this.peerId = data.peerId;
      this.role = 'guest';

      this.setStatus(`Joined room ${this.roomId}. Connecting P2P...`);
      this.initWebRTC();
      this.startSignalingPoll();
      return true;
    } catch(err) {
      console.error('Failed to join room:', err);
      this.setStatus('Failed to join room: ' + err.message);
      throw err;
    }
  }

  // --- 3. WebRTC Initialization ---
  initWebRTC() {
    try {
      this.peerConn = new RTCPeerConnection(this.rtcConfig);

      this.peerConn.onicecandidate = (event) => {
        if (event.candidate) {
          this.sendSignal({ type: 'candidate', candidate: event.candidate });
        }
      };

      if (this.role === 'host') {
        // Host creates the data channel
        this.dataChannel = this.peerConn.createDataChannel('rbo-game', {
          ordered: false, // low latency UDP mode
          maxRetransmits: 0
        });
        this.setupDataChannel(this.dataChannel);

        this.peerConn.onnegotiationneeded = async () => {
          try {
            const offer = await this.peerConn.createOffer();
            await this.peerConn.setLocalDescription(offer);
            this.sendSignal({ type: 'offer', sdp: this.peerConn.localDescription });
          } catch(e) {
            console.warn('Negotiation error:', e);
          }
        };
      } else {
        // Guest listens for incoming channel
        this.peerConn.ondatachannel = (event) => {
          this.dataChannel = event.channel;
          this.setupDataChannel(this.dataChannel);
        };
      }

      this.peerConn.onconnectionstatechange = () => {
        const state = this.peerConn.connectionState;
        console.log('WebRTC Connection state:', state);
        if (state === 'connected') {
          this.setStatus(`P2P Connected (${this.role.toUpperCase()})`, true, true);
        } else if (state === 'failed' || state === 'disconnected') {
          console.warn('P2P connection lost or failed. Switching to relay fallback...');
          this.startRelayFallback();
        }
      };
    } catch(e) {
      console.warn('WebRTC not supported or failed to init:', e);
      this.startRelayFallback();
    }
  }

  setupDataChannel(channel) {
    channel.onopen = () => {
      console.log('WebRTC DataChannel OPEN!');
      this.setStatus(`Online P2P Active! (Room: ${this.roomId})`, true, true);
      this.sendPing();
    };

    channel.onmessage = (event) => {
      this.handleIncomingMessage(event.data);
    };

    channel.onclose = () => {
      console.log('DataChannel closed.');
      this.setStatus('DataChannel closed. Using relay fallback...', true, false);
      this.startRelayFallback();
    };
  }

  // --- 4. Signaling Channel (SDP / ICE Exchange) ---
  async sendSignal(signal) {
    try {
      await fetch('/api/room/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: this.roomId,
          peerId: this.peerId,
          targetRole: this.role === 'host' ? 'guest' : 'host',
          signal
        })
      });
    } catch(e) {
      console.warn('Signal send error:', e);
    }
  }

  startSignalingPoll() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(async () => {
      if (!this.roomId) return;
      try {
        const res = await fetch(`/api/room/poll?roomId=${encodeURIComponent(this.roomId)}&role=${this.role}`);
        const data = await res.json();
        if (data.signals && data.signals.length > 0) {
          for (const item of data.signals) {
            await this.handleRemoteSignal(item.signal);
          }
        }
        if (this.role === 'host' && data.hasGuest && !this.isConnected && this.peerConn.signalingState === 'stable') {
          // Trigger offer if not started
          const offer = await this.peerConn.createOffer();
          await this.peerConn.setLocalDescription(offer);
          this.sendSignal({ type: 'offer', sdp: this.peerConn.localDescription });
        }
      } catch(e) {}
    }, 600);
  }

  async handleRemoteSignal(signal) {
    if (!this.peerConn) return;
    try {
      if (signal.type === 'offer') {
        await this.peerConn.setRemoteDescription(new RTCSessionDescription(signal.sdp));
        const answer = await this.peerConn.createAnswer();
        await this.peerConn.setLocalDescription(answer);
        this.sendSignal({ type: 'answer', sdp: this.peerConn.localDescription });
      } else if (signal.type === 'answer') {
        await this.peerConn.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      } else if (signal.type === 'candidate') {
        await this.peerConn.addIceCandidate(new RTCIceCandidate(signal.candidate));
      }
    } catch(e) {
      console.warn('Error handling remote signal:', e);
    }
  }

  // --- 5. Ping & Latency Monitoring ---
  sendPing() {
    this.lastPingTime = performance.now();
    this.sendPacket({ type: 'ping', t: this.lastPingTime });
  }

  // --- 6. Packet Serialization (1 Byte Input Bitmask) ---
  encodeInputBitmask(input) {
    let mask = 0;
    if (input.left) mask |= (1 << 0);
    if (input.right) mask |= (1 << 1);
    if (input.up) mask |= (1 << 2);
    if (input.down) mask |= (1 << 3);
    if (input.jump) mask |= (1 << 4);
    if (input.light) mask |= (1 << 5);
    if (input.mid || input.heavy) mask |= (1 << 6);
    if (input.skill1 || input.skill2) mask |= (1 << 7);
    return mask;
  }

  decodeInputBitmask(mask) {
    return {
      left: !!(mask & (1 << 0)),
      right: !!(mask & (1 << 1)),
      up: !!(mask & (1 << 2)),
      down: !!(mask & (1 << 3)),
      jump: !!(mask & (1 << 4)),
      light: !!(mask & (1 << 5)),
      mid: !!(mask & (1 << 6)),
      heavy: !!(mask & (1 << 6)),
      skill1: !!(mask & (1 << 7)),
      skill2: false
    };
  }

  sendInput(input) {
    const mask = this.encodeInputBitmask(input);
    if (this.isP2P && this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(JSON.stringify({ type: 'input', mask }));
    } else if (this.isConnected && this.roomId) {
      // Send via HTTP relay
      fetch('/api/room/relay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: this.roomId, role: this.role, data: { type: 'input', mask } })
      }).catch(() => {});
    }
  }

  sendHostState(state) {
    if (this.role !== 'host') return;
    this.sendPacket({ type: 'state', state });
  }

  sendPacket(obj) {
    const str = JSON.stringify(obj);
    if (this.isP2P && this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(str);
    }
  }

  handleIncomingMessage(dataStr) {
    try {
      const pkt = JSON.parse(dataStr);
      if (pkt.type === 'ping') {
        this.sendPacket({ type: 'pong', t: pkt.t });
      } else if (pkt.type === 'pong') {
        this.ping = Math.round(performance.now() - pkt.t);
      } else if (pkt.type === 'input') {
        const decoded = this.decodeInputBitmask(pkt.mask);
        if (this.engine) {
          this.engine.applyRemoteInput(decoded);
        }
      } else if (pkt.type === 'state') {
        if (this.engine && this.role === 'guest') {
          this.engine.applyHostState(pkt.state);
        }
      }
    } catch(e) {}
  }

  // --- 7. Fallback Relay ---
  startRelayFallback() {
    if (this.relayTimer) return;
    this.setStatus('Connected via Server Relay (Fallback)', true, false);
    const opponentRole = this.role === 'host' ? 'guest' : 'host';
    this.relayTimer = setInterval(async () => {
      if (!this.roomId) return;
      try {
        const res = await fetch(`/api/room/relay-poll?roomId=${encodeURIComponent(this.roomId)}&opponentRole=${opponentRole}`);
        const data = await res.json();
        if (data.frame) {
          this.handleIncomingMessage(JSON.stringify(data.frame));
        }
      } catch(e) {}
    }, 50); // 20 updates per second for relay
  }

  disconnect() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    if (this.relayTimer) clearInterval(this.relayTimer);
    if (this.dataChannel) {
      try { this.dataChannel.close(); } catch(e) {}
    }
    if (this.peerConn) {
      try { this.peerConn.close(); } catch(e) {}
    }
    this.isConnected = false;
    this.isP2P = false;
    this.roomId = null;
    this.role = null;
    this.setStatus('Disconnected', false, false);
  }
}

window.RBONetcode = RBONetcode;
