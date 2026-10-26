const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.resolve(__dirname, '..', 'DATA');
const WEB_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.bmp': 'image/bmp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.fob': 'application/octet-stream',
  '.dat': 'application/octet-stream',
  '.img': 'application/octet-stream',
  '.pac': 'application/octet-stream'
};

// In-Memory Room Registry for Multiplayer
const rooms = new Map();

// Periodically clean up rooms inactive for > 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, room] of rooms.entries()) {
    if (now - room.lastActive > 1800000) rooms.delete(id);
  }
}, 60000);

// PAC Reader Helper
function readPacTable(pacPath) {
  const fd = fs.openSync(pacPath, 'r');
  const hdr = Buffer.alloc(8);
  fs.readSync(fd, hdr, 0, 8, 0);
  const version = hdr.readUInt32LE(0);
  const fileCount = (hdr.readUInt32LE(4) ^ 0xe3df59ac) >>> 0;
  const table = Buffer.alloc(fileCount * 68);
  fs.readSync(fd, table, 0, table.length, 8);
  fs.closeSync(fd);

  const files = [];
  for (let i = 0; i < fileCount; i++) {
    const entry = table.slice(i * 68, (i + 1) * 68);
    const nameBytes = Buffer.alloc(59);
    for (let c = 0; c < 59; c++) {
      nameBytes[c] = entry[c] ^ (((i * c * 3) + 0x3d) & 0xff);
    }
    const zero = nameBytes.indexOf(0);
    const name = nameBytes.slice(0, zero === -1 ? 59 : zero).toString('ascii');
    const offset = entry.readUInt32LE(0x3c);
    const size = (entry.readUInt32LE(0x40) ^ 0xe3df59ac) >>> 0;
    files.push({ index: i, name, offset, size });
  }
  return { version, fileCount, files };
}

function extractFromPac(pacPath, targetFileName) {
  const tableInfo = readPacTable(pacPath);
  const target = tableInfo.files.find(f => f.name.toUpperCase() === targetFileName.toUpperCase());
  if (!target) return null;

  const fd = fs.openSync(pacPath, 'r');
  const data = Buffer.alloc(target.size);
  fs.readSync(fd, data, 0, target.size, target.offset);
  fs.closeSync(fd);
  return data;
}

function imgToBmp(imgBuf) {
  const w = imgBuf.readUInt32LE(12);
  const h = imgBuf.readUInt32LE(16);
  const rawPixels = imgBuf.slice(20);
  const headerSize = 54;
  const imageSize = w * h * 4;
  const bmpBuf = Buffer.alloc(headerSize + imageSize);
  bmpBuf.write('BM', 0);
  bmpBuf.writeUInt32LE(headerSize + imageSize, 2);
  bmpBuf.writeUInt32LE(headerSize, 10);
  bmpBuf.writeUInt32LE(40, 14);
  bmpBuf.writeInt32LE(w, 18);
  bmpBuf.writeInt32LE(-h, 22);
  bmpBuf.writeUInt16LE(1, 26);
  bmpBuf.writeUInt16LE(32, 28);
  bmpBuf.writeUInt32LE(0, 30);
  bmpBuf.writeUInt32LE(imageSize, 34);
  rawPixels.copy(bmpBuf, 54, 0, imageSize);
  return bmpBuf;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- Multiplayer Signaling & Room Manager ---
  if (pathname === '/api/room/create' && req.method === 'POST') {
    const code = 'RBO-' + Math.floor(1000 + Math.random() * 9000);
    const hostId = 'host_' + Math.random().toString(36).substring(2, 8);
    rooms.set(code, {
      id: code,
      hostId,
      guestId: null,
      signalsForHost: [],
      signalsForGuest: [],
      relayFrames: {},
      lastActive: Date.now()
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ roomId: code, peerId: hostId, role: 'host' }));
    return;
  }

  if (pathname === '/api/room/join' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { roomId } = JSON.parse(body || '{}');
        const room = rooms.get(roomId);
        if (!room) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Room not found' }));
          return;
        }
        const guestId = 'guest_' + Math.random().toString(36).substring(2, 8);
        room.guestId = guestId;
        room.lastActive = Date.now();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ roomId, peerId: guestId, role: 'guest', hostId: room.hostId }));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (pathname === '/api/room/signal' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { roomId, peerId, targetRole, signal } = JSON.parse(body || '{}');
        const room = rooms.get(roomId);
        if (!room) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Room not found' }));
          return;
        }
        room.lastActive = Date.now();
        if (targetRole === 'host') {
          room.signalsForHost.push({ from: peerId, signal });
        } else {
          room.signalsForGuest.push({ from: peerId, signal });
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (pathname === '/api/room/poll' && req.method === 'GET') {
    const { roomId, role } = parsedUrl.query;
    const room = rooms.get(roomId);
    if (!room) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Room not found' }));
      return;
    }
    room.lastActive = Date.now();
    let pending = [];
    if (role === 'host') {
      pending = room.signalsForHost;
      room.signalsForHost = [];
    } else {
      pending = room.signalsForGuest;
      room.signalsForGuest = [];
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ signals: pending, hasGuest: !!room.guestId }));
    return;
  }

  if (pathname === '/api/room/relay' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { roomId, role, data } = JSON.parse(body || '{}');
        const room = rooms.get(roomId);
        if (room) {
          room.relayFrames[role] = data;
          room.lastActive = Date.now();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (pathname === '/api/room/relay-poll' && req.method === 'GET') {
    const { roomId, opponentRole } = parsedUrl.query;
    const room = rooms.get(roomId);
    const frame = (room && room.relayFrames[opponentRole]) || null;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ frame }));
    return;
  }

  // Enable Cross-Origin Isolation for WebAudio & Gamepad
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (pathname === '/api/pacs') {
    try {
      const files = fs.readdirSync(DATA_DIR).filter(f => f.toLowerCase().endsWith('.pac'));
      const details = files.map(f => {
        const full = path.join(DATA_DIR, f);
        const stat = fs.statSync(full);
        return { name: f, size: stat.size };
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(details));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  if (pathname === '/api/pac/files') {
    const pacName = parsedUrl.query.name;
    if (!pacName) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing pac name' }));
      return;
    }
    const pacPath = path.join(DATA_DIR, pacName);
    if (!fs.existsSync(pacPath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'PAC file not found' }));
      return;
    }
    try {
      const info = readPacTable(pacPath);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(info));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  if (pathname === '/api/pac/extract') {
    const { pac, file, format } = parsedUrl.query;
    if (!pac || !file) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing pac or file parameter' }));
      return;
    }
    const pacPath = path.join(DATA_DIR, pac);
    if (!fs.existsSync(pacPath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'PAC not found' }));
      return;
    }
    try {
      const data = extractFromPac(pacPath, file);
      if (!data) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found inside PAC' }));
        return;
      }

      // If requested file is .IMG and format=bmp requested, convert to BMP on the fly!
      if (file.toLowerCase().endsWith('.img') && (format === 'bmp' || !format)) {
        const bmp = imgToBmp(data);
        res.writeHead(200, {
          'Content-Type': 'image/bmp',
          'Content-Length': bmp.length,
          'Content-Disposition': `inline; filename="${file.replace(/\.img$/i, '.bmp')}"`
        });
        res.end(bmp);
        return;
      }

      // Check audio or raw
      let mime = 'application/octet-stream';
      if (file.toLowerCase().endsWith('.wav')) mime = 'audio/wav';
      if (file.toLowerCase().endsWith('.txt')) mime = 'text/plain; charset=shift_jis';

      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': data.length,
        'Content-Disposition': `inline; filename="${file}"`
      });
      res.end(data);
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // Static File Serving
  let filePath = path.join(WEB_DIR, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>${pathname}</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle range requests for audio files
    const range = req.headers.range;
    if (range && mime.startsWith('audio/')) {
      const total = stats.size;
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': mime,
      });

      const fileStream = fs.createReadStream(filePath, { start, end });
      fileStream.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`====================================================`);
    console.log(`   Ragnarok Battle Offline - Web Engine & Studio   `);
    console.log(`====================================================`);
    console.log(`🚀 Running at: http://localhost:${port}/`);
    console.log(`🎮 Game Viewport: http://localhost:${port}/index.html`);
    console.log(`🛠️ Asset Studio:  http://localhost:${port}/studio.html`);
    console.log(`📁 Serving from: ${WEB_DIR}`);
    console.log(`====================================================`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

if (require.main === module) {
  startServer(PORT);
}
module.exports = server;

