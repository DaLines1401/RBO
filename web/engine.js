/**
 * Ragnarok Battle Offline - Authentic Character Definitions
 */
const CHARACTER_DEFS = {
  SWD_M: {
    id: 'SWD_M', class: 'SWORDMAN', gender: 'M',
    name: 'Swordman (ชาย)', title: 'นักดาบหนุ่มผู้กล้าหาญ',
    baseHp: 1350, baseSp: 220,
    str: 85, agi: 60, vit: 90, int: 25, dex: 55, luk: 40,
    sheetPrefix: 'swd_m_sheet_',
    skill1Name: 'BASH Lv.10!', skill2Name: 'MAGNUM BREAK!!',
    skill1Dmg: 380, skill2Dmg: 550, skill1Sp: 25, skill2Sp: 45
  },
  SWD_F: {
    id: 'SWD_F', class: 'SWORDMAN', gender: 'F',
    name: 'Swordman (หญิง)', title: 'นักดาบสาวผู้ปราดเปรียว',
    baseHp: 1250, baseSp: 240,
    str: 80, agi: 75, vit: 75, int: 30, dex: 65, luk: 45,
    sheetPrefix: 'swd_f_sheet_',
    skill1Name: 'SWIFT BASH!', skill2Name: 'MAGNUM BREAK!!',
    skill1Dmg: 360, skill2Dmg: 530, skill1Sp: 25, skill2Sp: 45
  },
  ACO_M: {
    id: 'ACO_M', class: 'ACOLYTE', gender: 'M',
    name: 'Acolyte (ชาย)', title: 'นักบวชสายประชิด (Battle Monk)',
    baseHp: 1150, baseSp: 340,
    str: 70, agi: 65, vit: 70, int: 80, dex: 60, luk: 50,
    sheetPrefix: 'aco_m_sheet_',
    skill1Name: 'HOLY LIGHT!', skill2Name: 'HEAL & ANGELUS',
    skill1Dmg: 310, skill2Dmg: 0, skill1Sp: 20, skill2Sp: 40
  },
  ACO_F: {
    id: 'ACO_F', class: 'ACOLYTE', gender: 'F',
    name: 'Acolyte (หญิง)', title: 'นักบวชสาวผู้เปี่ยมศรัทธา',
    baseHp: 1100, baseSp: 380,
    str: 60, agi: 60, vit: 65, int: 95, dex: 65, luk: 60,
    sheetPrefix: 'aco_f_sheet_',
    skill1Name: 'DIVINE LIGHT!', skill2Name: 'HEAL & ANGELUS',
    skill1Dmg: 330, skill2Dmg: 0, skill1Sp: 20, skill2Sp: 40
  },
  ARC_M: {
    id: 'ARC_M', class: 'ARCHER', gender: 'M',
    name: 'Archer (ชาย)', title: 'นักธนูผู้แม่นยำ',
    baseHp: 1100, baseSp: 280,
    str: 65, agi: 80, vit: 60, int: 40, dex: 90, luk: 55,
    sheetPrefix: 'arc_m_sheet_',
    skill1Name: 'DOUBLE STRAFE!', skill2Name: 'ARROW SHOWER!!',
    skill1Dmg: 350, skill2Dmg: 480, skill1Sp: 22, skill2Sp: 40
  },
  ARC_F: {
    id: 'ARC_F', class: 'ARCHER', gender: 'F',
    name: 'Archer (หญิง)', title: 'นักธนูสาวแห่งพงไพร',
    baseHp: 1050, baseSp: 300,
    str: 60, agi: 85, vit: 55, int: 45, dex: 92, luk: 60,
    sheetPrefix: 'arc_f_sheet_',
    skill1Name: 'DOUBLE STRAFE!', skill2Name: 'ARROW SHOWER!!',
    skill1Dmg: 340, skill2Dmg: 470, skill1Sp: 22, skill2Sp: 40
  },
  MAG_M: {
    id: 'MAG_M', class: 'MAGICIAN', gender: 'M',
    name: 'Magician (ชาย)', title: 'จอมเวทผู้ทรงปัญญา',
    baseHp: 950, baseSp: 450,
    str: 40, agi: 55, vit: 50, int: 98, dex: 70, luk: 50,
    sheetPrefix: 'mag_m_sheet_',
    skill1Name: 'FIRE BALL!', skill2Name: 'THUNDER STORM!!',
    skill1Dmg: 420, skill2Dmg: 600, skill1Sp: 30, skill2Sp: 55
  },
  MAG_F: {
    id: 'MAG_F', class: 'MAGICIAN', gender: 'F',
    name: 'Magician (หญิง)', title: 'แม่มดน้อยพลังเวทสูง',
    baseHp: 900, baseSp: 480,
    str: 35, agi: 60, vit: 45, int: 100, dex: 75, luk: 55,
    sheetPrefix: 'mag_f_sheet_',
    skill1Name: 'SOUL STRIKE!', skill2Name: 'THUNDER STORM!!',
    skill1Dmg: 410, skill2Dmg: 590, skill1Sp: 28, skill2Sp: 55
  },
  THF_M: {
    id: 'THF_M', class: 'THIEF', gender: 'M',
    name: 'Thief (ชาย)', title: 'จอมโจรเงาผู้รวดเร็ว',
    baseHp: 1180, baseSp: 230,
    str: 75, agi: 95, vit: 60, int: 30, dex: 80, luk: 65,
    sheetPrefix: 'thf_m_sheet_',
    skill1Name: 'DOUBLE ATTACK!', skill2Name: 'ENVENOM & LEAP!!',
    skill1Dmg: 340, skill2Dmg: 460, skill1Sp: 20, skill2Sp: 35
  },
  THF_F: {
    id: 'THF_F', class: 'THIEF', gender: 'F',
    name: 'Thief (หญิง)', title: 'นางโจรสาวสะบัดมีด',
    baseHp: 1120, baseSp: 250,
    str: 70, agi: 98, vit: 55, int: 35, dex: 82, luk: 70,
    sheetPrefix: 'thf_f_sheet_',
    skill1Name: 'DOUBLE ATTACK!', skill2Name: 'ENVENOM & LEAP!!',
    skill1Dmg: 330, skill2Dmg: 450, skill1Sp: 20, skill2Sp: 35
  },
  MRC_M: {
    id: 'MRC_M', class: 'MERCHANT', gender: 'M',
    name: 'Merchant (ชาย)', title: 'พ่อค้าจอมพลังหมัดหนัก',
    baseHp: 1300, baseSp: 260,
    str: 88, agi: 55, vit: 85, int: 35, dex: 60, luk: 60,
    sheetPrefix: 'mrc_m_sheet_',
    skill1Name: 'MAMMONITE!', skill2Name: 'CART REVOLUTION!!',
    skill1Dmg: 440, skill2Dmg: 560, skill1Sp: 25, skill2Sp: 45
  },
  MRC_F: {
    id: 'MRC_F', class: 'MERCHANT', gender: 'F',
    name: 'Merchant (หญิง)', title: 'แม่ค้าสาวเสน่ห์แรง',
    baseHp: 1240, baseSp: 270,
    str: 82, agi: 60, vit: 80, int: 40, dex: 65, luk: 65,
    sheetPrefix: 'mrc_f_sheet_',
    skill1Name: 'MAMMONITE!', skill2Name: 'CART REVOLUTION!!',
    skill1Dmg: 420, skill2Dmg: 540, skill1Sp: 25, skill2Sp: 45
  },
  NOV_M: {
    id: 'NOV_M', class: 'NOVICE', gender: 'M',
    name: 'Novice (ชาย)', title: 'ผู้เริ่มต้นผู้ไม่ยอมแพ้',
    baseHp: 1000, baseSp: 200,
    str: 50, agi: 50, vit: 50, int: 50, dex: 50, luk: 80,
    sheetPrefix: 'nov_m_sheet_',
    skill1Name: 'THROW SHOE!', skill2Name: 'PLAY DEAD (HEAL)!',
    skill1Dmg: 280, skill2Dmg: 0, skill1Sp: 15, skill2Sp: 30
  },
  NOV_F: {
    id: 'NOV_F', class: 'NOVICE', gender: 'F',
    name: 'Novice (หญิง)', title: 'สาวน้อยผู้เริ่มต้น',
    baseHp: 950, baseSp: 210,
    str: 48, agi: 52, vit: 48, int: 52, dex: 52, luk: 85,
    sheetPrefix: 'nov_f_sheet_',
    skill1Name: 'THROW SHOE!', skill2Name: 'PLAY DEAD (HEAL)!',
    skill1Dmg: 270, skill2Dmg: 0, skill1Sp: 15, skill2Sp: 30
  }
};

/**
 * Ragnarok Battle Offline - Web Native Engine (Stage 1 Prontera Field)
 * Full 60 FPS HTML5 Canvas Engine with Beat 'em Up Physics, Air Juggle, Hitstop,
 * Dual Player Local Co-op, and Online WebRTC Multiplayer.
 */

class RBOEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    // Virtual Native Resolution (Original RBO Aspect Ratio: 800x480)
    this.width = 800;
    this.height = 480;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Stage Bounds (Prontera Field: 2048px wide)
    this.stageWidth = 2048;
    this.groundY = 380;
    this.camera = { x: 0, y: 0 };

    // Audio System
    this.audioCtx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.audioBuffers = {};
    this.bgmSource = null;
    this.isMuted = false;
    this.bgmVolume = 0.55;
    this.sfxVolume = 0.75;

    // Assets Storage
    this.images = {};
    this.assetsLoaded = false;

    // Input States
    this.keys = {};
    this.gamepads = [];
    this.lastTap = { key: '', time: 0 };

    // Game Mode & Multiplayer
    this.gameMode = 'SOLO'; // 'SOLO', 'LOCAL_COOP', 'ONLINE'
    this.selectedChara = 'SWD_M';
    this.selectedCharaP2 = 'ACO_F';
    this.onlineRole = 'host'; // 'host' or 'guest'
    this.remoteInput = { left: false, right: false, up: false, down: false, jump: false, light: false, mid: false, heavy: false, skill1: false, skill2: false };
    this.netcode = null;

    // Combat & Juice FX
    this.hitStop = 0;
    this.screenShake = 0;
    this.particles = [];
    this.damageNumbers = [];

    // Progression & Waves
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.wave = 1;
    this.isBossWave = false;
    this.isBossSpawned = false;
    this.isStageCleared = false;
    this.cautionTimer = 0;

    // Entities
    this.players = [];
    this.enemies = [];

    // Initialize systems
    this.initAudio();
    this.initControls();
    this.initGamepad();
    this.loadAssets(() => {
      this.resetGame();
      this.startLoop();
    });
  }

  initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
      this.bgmGain = this.audioCtx.createGain();
      this.bgmGain.gain.value = this.bgmVolume;
      this.bgmGain.connect(this.audioCtx.destination);

      this.sfxGain = this.audioCtx.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.audioCtx.destination);
    }
  }

  unlockAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  async loadSound(name, url) {
    if (!this.audioCtx) return;
    try {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
      this.audioBuffers[name] = audioBuffer;
    } catch(e) {
      console.warn('Could not load sound:', name, e);
    }
  }

  playSound(name, pitchVar = 0.05) {
    if (this.isMuted || !this.audioCtx || !this.audioBuffers[name]) return;
    this.unlockAudio();
    try {
      const source = this.audioCtx.createBufferSource();
      source.buffer = this.audioBuffers[name];
      if (pitchVar > 0) {
        source.playbackRate.value = 1.0 + (Math.random() * 2 - 1) * pitchVar;
      }
      source.connect(this.sfxGain);
      source.start(0);
    } catch(e) {}
  }

  playBGM(name) {
    if (!this.audioCtx || !this.audioBuffers[name]) return;
    this.unlockAudio();
    this.stopBGM();
    try {
      this.bgmSource = this.audioCtx.createBufferSource();
      this.bgmSource.buffer = this.audioBuffers[name];
      this.bgmSource.loop = true;
      this.bgmSource.connect(this.bgmGain);
      this.bgmSource.start(0);
    } catch(e) {}
  }

  stopBGM() {
    if (this.bgmSource) {
      try { this.bgmSource.stop(); } catch(e) {}
      this.bgmSource = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmGain) this.bgmGain.gain.value = this.isMuted ? 0 : this.bgmVolume;
    if (this.sfxGain) this.sfxGain.gain.value = this.isMuted ? 0 : this.sfxVolume;
    return this.isMuted;
  }

  async loadAssets(onComplete) {
    // Optimized Lossless PNG assets
    const assetList = [
      { type: 'image', key: 'bg', url: 'assets/bg/stage1_bg.png' },
      { type: 'image', key: 'swd_tex', url: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'swd_m_sheet_0', url: 'assets/characters/swd_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'swd_f_sheet_0', url: 'assets/characters/swd_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'aco_m_sheet_0', url: 'assets/characters/aco_m_sheet_0.png', fallback: 'assets/sprites/aco_paletted_test.png' },
      { type: 'image', key: 'aco_f_sheet_0', url: 'assets/characters/aco_f_sheet_0.png', fallback: 'assets/sprites/aco_paletted_test.png' },
      { type: 'image', key: 'arc_m_sheet_0', url: 'assets/characters/arc_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'arc_f_sheet_0', url: 'assets/characters/arc_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'mag_m_sheet_0', url: 'assets/characters/mag_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'mag_f_sheet_0', url: 'assets/characters/mag_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'thf_m_sheet_0', url: 'assets/characters/thf_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'thf_f_sheet_0', url: 'assets/characters/thf_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'mrc_m_sheet_0', url: 'assets/characters/mrc_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'mrc_f_sheet_0', url: 'assets/characters/mrc_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'nov_m_sheet_0', url: 'assets/characters/nov_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'nov_f_sheet_0', url: 'assets/characters/nov_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'aco_tex', url: 'assets/sprites/aco_paletted_test.png' },
      { type: 'image', key: 'caution', url: 'assets/ui/stage_caution.png' },
      { type: 'audio', key: 'bgm_stage1', url: 'assets/audio/bgm_stage1.wav' },
      { type: 'audio', key: 'bgm_boss', url: 'assets/audio/bgm_boss.wav' },
      { type: 'audio', key: 'clear', url: 'assets/audio/clear.wav' },
      { type: 'audio', key: 'poring', url: 'assets/audio/se_poring.wav' },
      { type: 'audio', key: 'poring_dead', url: 'assets/audio/se_poring_dead.wav' },
      { type: 'audio', key: 'hit1', url: 'assets/audio/se_hit1.wav' },
      { type: 'audio', key: 'hit2', url: 'assets/audio/se_hit2.wav' },
      { type: 'audio', key: 'hit3', url: 'assets/audio/se_hit3.wav' },
      { type: 'audio', key: 'swing1', url: 'assets/audio/se_swing1.wav' },
      { type: 'audio', key: 'swing2', url: 'assets/audio/se_swing2.wav' },
      { type: 'audio', key: 'swing3', url: 'assets/audio/se_swing3.wav' },
      { type: 'audio', key: 'land', url: 'assets/audio/se_land.wav' },
      { type: 'audio', key: 'bash', url: 'assets/audio/se_bash.wav' },
      { type: 'audio', key: 'magnum', url: 'assets/audio/se_magnum.wav' },
      { type: 'audio', key: 'levelup', url: 'assets/audio/se_levelup.wav' },
      { type: 'audio', key: 'item', url: 'assets/audio/se_item.wav' }
    ];

    for (const item of assetList) {
      if (item.type === 'image') {
        await new Promise(resolve => {
          const img = new Image();
          img.onload = () => {
            this.images[item.key] = img;
            resolve();
          };
          img.onerror = () => {
            if (item.fallback) {
              img.onerror = () => resolve();
              img.src = item.fallback;
            } else {
              resolve();
            }
          };
          img.src = item.url;
        });
      } else if (item.type === 'audio') {
        await this.loadSound(item.key, item.url);
      }
    }

    this.assetsLoaded = true;
    if (onComplete) onComplete();
  }

  initControls() {
    window.addEventListener('keydown', e => {
      this.unlockAudio();
      const code = e.code;
      if (!this.keys[code]) {
        const now = performance.now();
        // Dash detection for P1 (A/D or Left/Right)
        if ((code === 'ArrowRight' || code === 'KeyD') && this.lastTap.key === code && (now - this.lastTap.time) < 300) {
          if (this.players[0]) this.players[0].isDashing = true;
        }
        if ((code === 'ArrowLeft' || code === 'KeyA') && this.lastTap.key === code && (now - this.lastTap.time) < 300) {
          if (this.players[0]) this.players[0].isDashing = true;
        }
        this.lastTap = { key: code, time: now };
      }
      this.keys[code] = true;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });

    // Touch Virtual Gamepad for Mobile
    const setupTouchBtn = (id, keyCode) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.unlockAudio();
        this.keys[keyCode] = true;
      });
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys[keyCode] = false;
      });
      btn.addEventListener('mousedown', () => {
        this.unlockAudio();
        this.keys[keyCode] = true;
      });
      btn.addEventListener('mouseup', () => {
        this.keys[keyCode] = false;
      });
    };

    setupTouchBtn('btnLeft', 'ArrowLeft');
    setupTouchBtn('btnRight', 'ArrowRight');
    setupTouchBtn('btnUp', 'ArrowUp');
    setupTouchBtn('btnDown', 'ArrowDown');
    setupTouchBtn('btnJump', 'Space');
    setupTouchBtn('btnLight', 'KeyZ');
    setupTouchBtn('btnMid', 'KeyX');
    setupTouchBtn('btnHeavy', 'KeyC');
    setupTouchBtn('btnSkill1', 'KeyA');
    setupTouchBtn('btnSkill2', 'KeyS');
  }

  initGamepad() {
    window.addEventListener('gamepadconnected', (e) => {
      console.log('Gamepad connected:', e.gamepad.id);
      const ind = document.getElementById('gamepadIndicator');
      if (ind) {
        ind.style.display = 'inline';
        ind.textContent = `🎮 Gamepad Connected: ${e.gamepad.id.split(' ')[0]}`;
      }
    });
    window.addEventListener('gamepaddisconnected', () => {
      const ind = document.getElementById('gamepadIndicator');
      if (ind) ind.style.display = 'none';
    });
  }

  pollGamepad() {
    const gps = navigator.getGamepads ? navigator.getGamepads() : [];
    this.gamepads = [];
    for (let i = 0; i < gps.length; i++) {
      if (gps[i]) this.gamepads.push(gps[i]);
    }
  }

  createPlayerEntity(id, startX, charaId, badgeColor) {
    let cId = charaId;
    if (cId === 'SWORDMAN') cId = 'SWD_M';
    if (cId === 'ACOLYTE') cId = 'ACO_M';
    const def = CHARACTER_DEFS[cId] || CHARACTER_DEFS['SWD_M'];

    return {
      id,
      x: startX,
      y: this.groundY,
      vx: 0,
      vy: 0,
      facing: 1,
      isGrounded: true,
      isDashing: false,
      state: 'IDLE',
      stateTime: 0,
      animFrame: 0,
      hp: def.baseHp,
      maxHp: def.baseHp,
      sp: def.baseSp,
      maxSp: def.baseSp,
      level: 1,
      exp: 0,
      nextExp: 400,
      attackCooldown: 0,
      hitStop: 0,
      chara: def.class,
      charaId: def.id,
      charaDef: def,
      badgeColor,
      badgeText: `${id}P`,
      inputHistory: [],
      lastDir: 'NEUTRAL'
    };
  }

  resetGame() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.wave = 1;
    this.isBossWave = false;
    this.isBossSpawned = false;
    this.isStageCleared = false;
    this.cautionTimer = 0;
    this.enemies = [];
    this.particles = [];
    this.damageNumbers = [];

    const clearModal = document.getElementById('clearModal');
    if (clearModal) clearModal.style.display = 'none';

    const cautionBanner = document.getElementById('cautionBanner');
    if (cautionBanner) cautionBanner.style.display = 'none';

    // Player 1 (Blue Badge)
    const p1 = this.createPlayerEntity(1, 180, this.selectedChara || 'SWD_M', '#40c4ff');
    this.players = [p1];

    // Player 2 (Red Badge) in Co-op or Online mode
    if (this.gameMode === 'LOCAL_COOP' || this.gameMode === 'ONLINE') {
      const p2Chara = this.selectedCharaP2 || (this.selectedChara === 'SWD_M' ? 'ACO_F' : 'SWD_M');
      const p2 = this.createPlayerEntity(2, 260, p2Chara, '#ff5252');
      this.players.push(p2);
    }

    // Spawn Wave 1
    this.startWave(1);
    this.playBGM('bgm_stage1');
  }

  setGameMode(mode) {
    this.gameMode = mode;
    console.log('Game Mode set to:', mode);
    this.resetGame();
  }

  setChara(chara, playerIdx = 0) {
    let cId = chara;
    if (cId === 'SWORDMAN') cId = 'SWD_M';
    if (cId === 'ACOLYTE') cId = 'ACO_M';
    const def = CHARACTER_DEFS[cId] || CHARACTER_DEFS['SWD_M'];

    if (playerIdx === 0) {
      this.selectedChara = def.id;
    } else {
      this.selectedCharaP2 = def.id;
    }
    if (this.players[playerIdx]) {
      const p = this.players[playerIdx];
      p.chara = def.class;
      p.charaId = def.id;
      p.charaDef = def;
      p.maxHp = def.baseHp;
      p.hp = Math.min(p.hp, def.baseHp);
      p.maxSp = def.baseSp;
      p.sp = Math.min(p.sp, def.baseSp);
    }
  }

  // --- Input Mapping per Player ---
  getInput(pIndex) {
    const k = this.keys;
    const gp = this.gamepads[pIndex] || null;

    if (this.gameMode === 'ONLINE') {
      if (this.onlineRole === 'guest') {
        // Guest drives Player 2 locally, receives Player 1 from network
        if (pIndex === 1) {
          const localInput = this.readLocalKeysP1(k, gp);
          if (this.netcode) this.netcode.sendInput(localInput);
          return localInput;
        } else {
          return this.remoteInput;
        }
      } else {
        // Host drives Player 1 locally, receives Player 2 from network
        if (pIndex === 0) {
          const localInput = this.readLocalKeysP1(k, gp);
          return localInput;
        } else {
          return this.remoteInput;
        }
      }
    }

    if (this.gameMode === 'LOCAL_COOP') {
      if (pIndex === 0) {
        return this.readLocalKeysP1(k, this.gamepads[0] || null);
      } else {
        return this.readLocalKeysP2(k, this.gamepads[1] || null);
      }
    }

    // Solo Mode (P1 accepts all keys)
    return this.readLocalKeysSolo(k, this.gamepads[0] || null);
  }

  readLocalKeysSolo(k, gp) {
    let left = !!(k['ArrowLeft'] || k['KeyA']);
    let right = !!(k['ArrowRight'] || k['KeyD']);
    let up = !!(k['ArrowUp'] || k['KeyW']);
    let down = !!(k['ArrowDown'] || k['KeyS']);
    let jump = !!(k['Space'] || k['KeyL'] || k['KeyC']);
    let light = !!(k['KeyZ'] || k['KeyJ']);
    let mid = !!(k['KeyX'] || k['KeyK']);
    let heavy = !!(k['KeyC'] || k['KeyI']);
    let skill1 = !!(k['KeyQ'] || k['KeyU'] || k['Numpad0']);
    let skill2 = !!(k['KeyE'] || k['KeyO']);

    if (gp) {
      const ax = gp.axes[0] || 0;
      const ay = gp.axes[1] || 0;
      if (ax < -0.3 || gp.buttons[14]?.pressed) left = true;
      if (ax > 0.3 || gp.buttons[15]?.pressed) right = true;
      if (ay < -0.3 || gp.buttons[12]?.pressed) up = true;
      if (ay > 0.3 || gp.buttons[13]?.pressed) down = true;
      if (gp.buttons[0]?.pressed) jump = true;
      if (gp.buttons[2]?.pressed) light = true;
      if (gp.buttons[3]?.pressed) mid = true;
      if (gp.buttons[1]?.pressed) heavy = true;
      if (gp.buttons[4]?.pressed) skill1 = true;
      if (gp.buttons[5]?.pressed) skill2 = true;
    }

    return { left, right, up, down, jump, light, mid, heavy, skill1, skill2 };
  }

  readLocalKeysP1(k, gp) {
    // Player 1: WASD + J (Light), K (Mid), L (Heavy/Jump), Space (Skill)
    let left = !!k['KeyA'];
    let right = !!k['KeyD'];
    let up = !!k['KeyW'];
    let down = !!k['KeyS'];
    let jump = !!(k['KeyL'] || k['KeyC']);
    let light = !!k['KeyJ'];
    let mid = !!k['KeyK'];
    let heavy = !!k['KeyI'];
    let skill1 = !!k['Space'];
    let skill2 = !!k['KeyU'];

    // Fallback if arrow keys pressed and no P2
    if (this.gameMode === 'SOLO') {
      return this.readLocalKeysSolo(k, gp);
    }

    if (gp) {
      const ax = gp.axes[0] || 0;
      const ay = gp.axes[1] || 0;
      if (ax < -0.3 || gp.buttons[14]?.pressed) left = true;
      if (ax > 0.3 || gp.buttons[15]?.pressed) right = true;
      if (ay < -0.3 || gp.buttons[12]?.pressed) up = true;
      if (ay > 0.3 || gp.buttons[13]?.pressed) down = true;
      if (gp.buttons[0]?.pressed) jump = true;
      if (gp.buttons[2]?.pressed) light = true;
      if (gp.buttons[3]?.pressed) mid = true;
      if (gp.buttons[1]?.pressed) heavy = true;
      if (gp.buttons[4]?.pressed) skill1 = true;
      if (gp.buttons[5]?.pressed) skill2 = true;
    }

    return { left, right, up, down, jump, light, mid, heavy, skill1, skill2 };
  }

  readLocalKeysP2(k, gp) {
    // Player 2: Arrow Keys + Numpad 1/2/3/0 or Z/X/C/V
    let left = !!k['ArrowLeft'];
    let right = !!k['ArrowRight'];
    let up = !!k['ArrowUp'];
    let down = !!k['ArrowDown'];
    let jump = !!(k['Numpad3'] || k['KeyV'] || k['Slash']);
    let light = !!(k['Numpad1'] || k['KeyZ'] || k['Period']);
    let mid = !!(k['Numpad2'] || k['KeyX'] || k['Comma']);
    let heavy = !!(k['Numpad5'] || k['KeyC']);
    let skill1 = !!(k['Numpad0'] || k['KeyB']);
    let skill2 = !!k['NumpadEnter'];

    if (gp) {
      const ax = gp.axes[0] || 0;
      const ay = gp.axes[1] || 0;
      if (ax < -0.3 || gp.buttons[14]?.pressed) left = true;
      if (ax > 0.3 || gp.buttons[15]?.pressed) right = true;
      if (ay < -0.3 || gp.buttons[12]?.pressed) up = true;
      if (ay > 0.3 || gp.buttons[13]?.pressed) down = true;
      if (gp.buttons[0]?.pressed) jump = true;
      if (gp.buttons[2]?.pressed) light = true;
      if (gp.buttons[3]?.pressed) mid = true;
      if (gp.buttons[1]?.pressed) heavy = true;
      if (gp.buttons[4]?.pressed) skill1 = true;
      if (gp.buttons[5]?.pressed) skill2 = true;
    }

    return { left, right, up, down, jump, light, mid, heavy, skill1, skill2 };
  }

  applyRemoteInput(input) {
    this.remoteInput = input;
  }

  applyHostState(state) {
    if (state.wave && this.wave !== state.wave) this.startWave(state.wave);
    if (state.enemies) {
      // Sync boss HP
      const boss = this.enemies.find(e => e.type === 'BAPHOMET');
      if (boss && state.bossHp !== undefined) boss.hp = state.bossHp;
    }
  }

  // --- Wave Progression ---
  startWave(w) {
    this.wave = w;
    this.enemies = [];

    // Auto-Revive fallen teammates on wave clear!
    this.players.forEach(p => {
      if (p.state === 'KO') {
        p.state = 'IDLE';
        p.hp = Math.round(p.maxHp * 0.5);
        this.addDamageNumber(p.x, p.y - 70, 'REVIVED!', '#69f0ae');
        this.playSound('levelup');
      }
    });

    if (w === 1) {
      for (let i = 0; i < 4; i++) this.spawnPoring(500 + i * 200);
    } else if (w === 2) {
      for (let i = 0; i < 3; i++) this.spawnPoring(450 + i * 220);
      for (let i = 0; i < 2; i++) this.spawnSpore(900 + i * 240);
    } else if (w === 3) {
      for (let i = 0; i < 4; i++) this.spawnPoring(400 + i * 180);
      for (let i = 0; i < 2; i++) this.spawnSpore(850 + i * 200);
      this.spawnRocker(1200);
    } else if (w === 4) {
      this.isBossWave = true;
      this.cautionTimer = 180;
      const cautionBanner = document.getElementById('cautionBanner');
      if (cautionBanner) cautionBanner.style.display = 'flex';
      this.playBGM('bgm_boss');
    }
  }

  spawnPoring(x) {
    this.enemies.push({
      type: 'PORING',
      x: x || (this.players[0].x + 350 + Math.random() * 250),
      y: this.groundY,
      vx: 0,
      vy: 0,
      facing: -1,
      hp: 120,
      maxHp: 120,
      state: 'IDLE',
      stateTime: Math.floor(Math.random() * 30),
      isGrounded: true,
      squashX: 1.0,
      squashY: 1.0,
      hitStop: 0
    });
  }

  spawnSpore(x) {
    this.enemies.push({
      type: 'SPORE',
      x: x || (this.players[0].x + 400 + Math.random() * 250),
      y: this.groundY,
      vx: 0,
      vy: 0,
      facing: -1,
      hp: 240,
      maxHp: 240,
      state: 'IDLE',
      stateTime: Math.floor(Math.random() * 40),
      isGrounded: true,
      squashX: 1.0,
      squashY: 1.0,
      hitStop: 0
    });
  }

  spawnRocker(x) {
    this.enemies.push({
      type: 'ROCKER',
      x: x || (this.players[0].x + 500),
      y: this.groundY,
      vx: 0,
      vy: 0,
      facing: -1,
      hp: 360,
      maxHp: 360,
      state: 'IDLE',
      stateTime: 0,
      isGrounded: true,
      squashX: 1.0,
      squashY: 1.0,
      hitStop: 0
    });
  }

  spawnBaphomet() {
    this.isBossSpawned = true;
    this.enemies.push({
      type: 'BAPHOMET',
      x: Math.min(this.stageWidth - 150, this.players[0].x + 550),
      y: this.groundY,
      vx: 0,
      vy: 0,
      facing: -1,
      hp: 4200,
      maxHp: 4200,
      state: 'SPAWN',
      stateTime: 0,
      isGrounded: true,
      squashX: 1.0,
      squashY: 1.0,
      hitStop: 0
    });
    this.playSound('poring_dead');
    this.screenShake = 18;
  }

  addParticle(x, y, vx, vy, color, life, size = 3) {
    this.particles.push({ x, y, vx, vy, color, life, maxLife: life, size });
  }

  addDamageNumber(x, y, text, color = '#ffeb3b') {
    this.damageNumbers.push({
      x: x + (Math.random() * 20 - 10),
      y: y - 20,
      text,
      color,
      vy: -3.8,
      life: 50,
      maxLife: 50
    });
  }

  addSlashSparks(x, y, count = 10, color = '#ffd54f') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.addParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color, 16 + Math.random() * 10, 2 + Math.random() * 3);
    }
  }

  // --- Update Single Player ---
  updatePlayer(p, input) {
    if (p.hitStop > 0) {
      p.hitStop--;
      return;
    }

    if (p.state === 'KO') {
      p.vx *= 0.8;
      if (!p.isGrounded) {
        p.vy += 0.65;
        p.y += p.vy;
        if (p.y >= this.groundY) {
          p.y = this.groundY;
          p.vy = 0;
          p.isGrounded = true;
        }
      }
      return;
    }

    p.stateTime++;
    if (p.attackCooldown > 0) p.attackCooldown--;

    // SP Auto-Regen
    if (p.sp < p.maxSp && p.stateTime % 25 === 0) {
      p.sp = Math.min(p.maxSp, p.sp + 2);
    }

    // Command Motion Buffer History (↓ ↘ → + Light / ↓ ↑ + Heavy)
    let curDir = 'NEUTRAL';
    const fwd = p.facing === 1 ? input.right : input.left;
    const back = p.facing === 1 ? input.left : input.right;

    if (input.down && fwd) curDir = 'DOWN_FORWARD';
    else if (input.down && back) curDir = 'DOWN_BACK';
    else if (input.down) curDir = 'DOWN';
    else if (input.up && fwd) curDir = 'UP_FORWARD';
    else if (input.up) curDir = 'UP';
    else if (fwd) curDir = 'FORWARD';
    else if (back) curDir = 'BACK';

    const nowTime = performance.now();
    if (!p.inputHistory) p.inputHistory = [];
    if (curDir !== p.lastDir) {
      p.inputHistory.push({ dir: curDir, time: nowTime });
      p.lastDir = curDir;
      if (p.inputHistory.length > 12) p.inputHistory.shift();
    }
    p.inputHistory = p.inputHistory.filter(h => (nowTime - h.time) < 600);

    const hasQCF = () => {
      let sawDown = false;
      for (const h of p.inputHistory) {
        if (h.dir === 'DOWN' || h.dir === 'DOWN_FORWARD') sawDown = true;
        if (sawDown && (h.dir === 'FORWARD' || h.dir === 'DOWN_FORWARD')) return true;
      }
      return false;
    };

    const hasDownUp = () => {
      let sawDown = false;
      for (const h of p.inputHistory) {
        if (h.dir === 'DOWN' || h.dir === 'DOWN_FORWARD') sawDown = true;
        if (sawDown && (h.dir === 'UP' || h.dir === 'UP_FORWARD')) return true;
      }
      return false;
    };

    let triggerSkill1 = !!input.skill1;
    let triggerSkill2 = !!input.skill2;

    if (input.light && hasQCF()) {
      triggerSkill1 = true;
      p.inputHistory = [];
    }
    if (input.heavy && hasDownUp()) {
      triggerSkill2 = true;
      p.inputHistory = [];
    }

    const canMove = !['ATTACK_LIGHT', 'ATTACK_MID', 'ATTACK_HEAVY', 'SKILL_1', 'SKILL_2', 'HURT'].includes(p.state);

    if (canMove) {
      if (input.down && p.isGrounded) {
        p.state = 'GUARD';
        p.vx = 0;
      } else {
        const moveSpeed = p.isDashing ? 8.0 : 4.5;
        if (input.right && !input.left) {
          p.vx = moveSpeed;
          p.facing = 1;
          p.state = p.isDashing ? 'DASH' : (p.isGrounded ? 'WALK' : 'JUMP');
        } else if (input.left && !input.right) {
          p.vx = -moveSpeed;
          p.facing = -1;
          p.state = p.isDashing ? 'DASH' : (p.isGrounded ? 'WALK' : 'JUMP');
        } else {
          p.vx *= 0.72;
          if (Math.abs(p.vx) < 0.2) {
            p.vx = 0;
            p.isDashing = false;
            if (p.isGrounded) p.state = 'IDLE';
          }
        }

        // Jump
        if (input.jump && p.isGrounded) {
          p.vy = -13.5;
          p.isGrounded = false;
          p.state = 'JUMP';
          this.playSound('land');
        }
      }
    }

    // Attacks & Combos
    if (canMove || ['ATTACK_LIGHT', 'ATTACK_MID'].includes(p.state)) {
      if (input.light && p.attackCooldown === 0) {
        p.state = 'ATTACK_LIGHT';
        p.stateTime = 0;
        p.attackCooldown = 15;
        this.playSound('swing1');
        this.performAttack(p, { damage: 65, reach: 75, knockback: 3.5, launch: 0, hitStop: 4 });
      } else if (input.mid && ['ATTACK_LIGHT', 'IDLE', 'WALK'].includes(p.state) && p.attackCooldown <= 8) {
        p.state = 'ATTACK_MID';
        p.stateTime = 0;
        p.attackCooldown = 20;
        this.playSound('swing2');
        this.performAttack(p, { damage: 120, reach: 85, knockback: 6.0, launch: -4.5, hitStop: 6 });
      } else if (input.heavy && ['ATTACK_MID', 'IDLE', 'WALK'].includes(p.state) && p.attackCooldown <= 10) {
        p.state = 'ATTACK_HEAVY';
        p.stateTime = 0;
        p.attackCooldown = 26;
        this.playSound('swing3');
        this.performAttack(p, { damage: 230, reach: 95, knockback: 10.0, launch: -11.0, hitStop: 9 });
      }
    }

    // Skill 1 (Bash / Double Strafe / Fire Ball / Double Attack / Mammonite / Throw Shoe / Holy Light)
    const s1Cost = p.charaDef?.skill1Sp || 25;
    if (triggerSkill1 && p.attackCooldown === 0 && p.sp >= s1Cost && canMove) {
      p.sp -= s1Cost;
      p.state = 'SKILL_1';
      p.stateTime = 0;
      p.attackCooldown = 35;

      if (p.chara === 'SWORDMAN') {
        this.playSound('bash');
        this.screenShake = 8;
        const dmg = p.charaDef?.skill1Dmg || 380;
        this.performAttack(p, { damage: dmg, reach: 110, knockback: 14.0, launch: -13.5, hitStop: 12 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'BASH Lv.10!', '#ffeb3b');
      } else if (p.chara === 'ARCHER') {
        this.playSound('swing1');
        this.screenShake = 5;
        const dmg = p.charaDef?.skill1Dmg || 350;
        this.performAttack(p, { damage: dmg, reach: 320, knockback: 10.0, launch: -6.0, hitStop: 8 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'DOUBLE STRAFE!', '#81d4fa');
      } else if (p.chara === 'MAGICIAN') {
        this.playSound('magnum');
        this.screenShake = 7;
        const dmg = p.charaDef?.skill1Dmg || 420;
        this.performAttack(p, { damage: dmg, reach: 280, knockback: 12.0, launch: -10.0, hitStop: 10, aoe: true });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'FIRE BALL!', '#ff7043');
      } else if (p.chara === 'THIEF') {
        this.playSound('hit2');
        this.screenShake = 4;
        const dmg = p.charaDef?.skill1Dmg || 340;
        this.performAttack(p, { damage: dmg, reach: 95, knockback: 7.0, launch: -5.0, hitStop: 6 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'DOUBLE ATTACK!', '#b388ff');
      } else if (p.chara === 'MERCHANT') {
        this.playSound('item');
        this.screenShake = 8;
        const dmg = p.charaDef?.skill1Dmg || 440;
        this.performAttack(p, { damage: dmg, reach: 110, knockback: 16.0, launch: -12.0, hitStop: 12 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'MAMMONITE!', '#ffd54f');
      } else if (p.chara === 'NOVICE') {
        this.playSound('hit1');
        const dmg = p.charaDef?.skill1Dmg || 280;
        this.performAttack(p, { damage: dmg, reach: 220, knockback: 6.0, launch: -4.0, hitStop: 6 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'THROW SHOE!', '#ffb74d');
      } else {
        // Acolyte: Holy Light / Angelus & Team Revive!
        this.playSound('levelup');
        const dmg = p.charaDef?.skill1Dmg || 310;
        this.performAttack(p, { damage: dmg, reach: 140, knockback: 8.0, launch: -6.0, hitStop: 8 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'HOLY LIGHT!', '#80d8ff');

        this.players.forEach(ally => {
          if (ally.id !== p.id && ally.state === 'KO' && Math.abs(ally.x - p.x) < 140) {
            ally.state = 'IDLE';
            ally.hp = Math.round(ally.maxHp * 0.45);
            this.addDamageNumber(ally.x, ally.y - 80, 'ANGELUS REVIVE!', '#69f0ae');
            this.playSound('levelup');
          }
        });
      }
    }

    // Skill 2 (Magnum Break / Arrow Shower / Thunder Storm / Envenom / Cart Revolution / Play Dead / Heal)
    const s2Cost = p.charaDef?.skill2Sp || 45;
    if (triggerSkill2 && p.attackCooldown === 0 && p.sp >= s2Cost && canMove) {
      p.sp -= s2Cost;
      p.state = 'SKILL_2';
      p.stateTime = 0;
      p.attackCooldown = 45;

      if (p.chara === 'SWORDMAN') {
        this.playSound('magnum');
        this.screenShake = 15;
        const dmg = p.charaDef?.skill2Dmg || 550;
        this.performAttack(p, { damage: dmg, reach: 180, knockback: 18.0, launch: -14.0, hitStop: 16, aoe: true });
        this.addDamageNumber(p.x, p.y - 85, p.charaDef?.skill2Name || 'MAGNUM BREAK!!', '#ff5722');
      } else if (p.chara === 'ARCHER') {
        this.playSound('swing3');
        this.screenShake = 10;
        const dmg = p.charaDef?.skill2Dmg || 480;
        this.performAttack(p, { damage: dmg, reach: 260, knockback: 14.0, launch: -12.0, hitStop: 12, aoe: true });
        this.addDamageNumber(p.x, p.y - 85, p.charaDef?.skill2Name || 'ARROW SHOWER!!', '#4fc3f7');
      } else if (p.chara === 'MAGICIAN') {
        this.playSound('magnum');
        this.screenShake = 16;
        const dmg = p.charaDef?.skill2Dmg || 600;
        this.performAttack(p, { damage: dmg, reach: 300, knockback: 20.0, launch: -15.0, hitStop: 16, aoe: true });
        this.addDamageNumber(p.x, p.y - 85, p.charaDef?.skill2Name || 'THUNDER STORM!!', '#ea80fc');
      } else if (p.chara === 'THIEF') {
        this.playSound('hit3');
        this.screenShake = 9;
        p.vx = -p.facing * 9.0;
        const dmg = p.charaDef?.skill2Dmg || 460;
        this.performAttack(p, { damage: dmg, reach: 130, knockback: 12.0, launch: -8.0, hitStop: 10 });
        this.addDamageNumber(p.x, p.y - 85, p.charaDef?.skill2Name || 'ENVENOM & LEAP!!', '#69f0ae');
      } else if (p.chara === 'MERCHANT') {
        this.playSound('magnum');
        this.screenShake = 15;
        const dmg = p.charaDef?.skill2Dmg || 560;
        this.performAttack(p, { damage: dmg, reach: 200, knockback: 20.0, launch: -14.0, hitStop: 16, aoe: true });
        this.addDamageNumber(p.x, p.y - 85, p.charaDef?.skill2Name || 'CART REVOLUTION!!', '#ffca28');
      } else if (p.chara === 'NOVICE') {
        this.playSound('levelup');
        p.hp = Math.min(p.maxHp, p.hp + 300);
        this.addDamageNumber(p.x, p.y - 80, '+300 HP (PLAY DEAD)', '#a7ffeb');
      } else {
        // Acolyte: Heal & Angelus
        this.playSound('levelup');
        p.hp = Math.min(p.maxHp, p.hp + 450);
        this.addDamageNumber(p.x, p.y - 80, '+450 HP (HEAL)', '#69f0ae');
        this.players.forEach(ally => {
          if (ally.id !== p.id && ally.state !== 'KO' && Math.abs(ally.x - p.x) < 220) {
            ally.hp = Math.min(ally.maxHp, ally.hp + 350);
            this.addDamageNumber(ally.x, ally.y - 80, '+350 HP', '#69f0ae');
          }
        });
      }
    }

    // Physics Update
    p.x += p.vx;
    if (!p.isGrounded) {
      p.vy += 0.65;
      p.y += p.vy;
      if (p.y >= this.groundY) {
        p.y = this.groundY;
        p.vy = 0;
        p.isGrounded = true;
        this.playSound('land');
      }
    }

    // Animation Transitions
    if (['ATTACK_LIGHT', 'ATTACK_MID', 'ATTACK_HEAVY', 'SKILL_1', 'SKILL_2', 'HURT'].includes(p.state)) {
      if (p.stateTime > 24) {
        p.state = p.isGrounded ? 'IDLE' : 'JUMP';
      }
    }
  }

  performAttack(player, config) {
    const atkBox = {
      x: config.aoe ? (player.x - config.reach) : (player.facing === 1 ? player.x : player.x - config.reach),
      y: player.y - 80,
      w: config.aoe ? config.reach * 2 : config.reach,
      h: 80
    };

    let hitCount = 0;
    this.enemies.forEach(e => {
      if (e.state === 'DEAD') return;
      const enemyBox = { x: e.x - 30, y: e.y - 65, w: 60, h: 65 };
      if (this.checkCollision(atkBox, enemyBox)) {
        hitCount++;
        const dmg = Math.round(config.damage * (1 + (player.level - 1) * 0.12) * (0.9 + Math.random() * 0.2));
        e.hp = Math.max(0, e.hp - dmg);
        e.state = 'HURT';
        e.stateTime = 0;
        e.vx = player.facing * config.knockback;
        e.vy = config.launch;
        e.isGrounded = false;
        e.hitStop = config.hitStop;
        player.hitStop = Math.floor(config.hitStop * 0.7);

        this.addSlashSparks(e.x, e.y - 35, 12, '#ffd54f');
        this.addDamageNumber(e.x, e.y - 45, `${dmg}`, '#ffeb3b');

        this.combo++;
        this.comboTimer = 110;
        this.score += dmg * 10 * this.combo;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;

        this.playSound(this.combo % 3 === 0 ? 'hit3' : (this.combo % 2 === 0 ? 'hit2' : 'hit1'));

        if (e.hp <= 0) {
          e.state = 'DEAD';
          this.playSound(e.type === 'PORING' ? 'poring_dead' : 'poring_dead');
          this.addSlashSparks(e.x, e.y - 35, 25, '#ff5252');
          this.gainExp(player, e.type === 'BAPHOMET' ? 1200 : 70);

          if (e.type === 'BAPHOMET') {
            this.handleBossDefeated();
          }
        }
      }
    });

    if (hitCount > 0 && config.hitStop > 5) {
      this.screenShake = config.hitStop;
    }
  }

  gainExp(player, expGained) {
    player.exp += expGained;
    this.score += expGained * 50;

    if (player.exp >= player.nextExp) {
      player.level++;
      player.exp -= player.nextExp;
      player.nextExp = Math.round(player.nextExp * 1.5);
      player.maxHp += 180;
      player.hp = player.maxHp;
      player.maxSp += 40;
      player.sp = player.maxSp;
      this.playSound('levelup');
      this.addDamageNumber(player.x, player.y - 85, 'LEVEL UP!', '#ffea00');
    }
  }

  handleBossDefeated() {
    this.isStageCleared = true;
    this.stopBGM();
    this.playSound('clear');

    setTimeout(() => {
      const clearModal = document.getElementById('clearModal');
      const finalScore = document.getElementById('finalScore');
      const maxComboEl = document.getElementById('maxCombo');
      const finalLevel = document.getElementById('finalLevel');
      const clearRank = document.getElementById('clearRank');

      if (finalScore) finalScore.textContent = this.score.toLocaleString();
      if (maxComboEl) maxComboEl.textContent = `${this.maxCombo} HITS`;
      if (finalLevel) finalLevel.textContent = `Lv.${this.players[0].level}`;
      if (clearRank) {
        if (this.score > 250000 && this.maxCombo > 25) clearRank.textContent = 'SSS';
        else if (this.score > 150000) clearRank.textContent = 'S';
        else clearRank.textContent = 'A';
      }
      if (clearModal) clearModal.style.display = 'flex';
    }, 1800);
  }

  // --- Enemies & AI Logic ---
  updateEnemies() {
    // Boss Caution Transition
    if (this.cautionTimer > 0) {
      this.cautionTimer--;
      if (this.cautionTimer === 0) {
        const cautionBanner = document.getElementById('cautionBanner');
        if (cautionBanner) cautionBanner.style.display = 'none';
        this.spawnBaphomet();
      }
    }

    this.enemies.forEach(e => {
      if (e.hitStop > 0) {
        e.hitStop--;
        return;
      }

      // Find Closest Active Player
      let targetPlayer = null;
      let minDist = 999999;
      this.players.forEach(p => {
        if (p.state !== 'KO') {
          const d = Math.abs(p.x - e.x);
          if (d < minDist) {
            minDist = d;
            targetPlayer = p;
          }
        }
      });

      if (!targetPlayer) targetPlayer = this.players[0];

      const distToPlayer = targetPlayer.x - e.x;
      const absDist = Math.abs(distToPlayer);
      e.facing = distToPlayer > 0 ? 1 : -1;

      if (e.state === 'IDLE' || e.state === 'MOVE') {
        e.stateTime++;
        if (e.type === 'PORING') {
          if (e.stateTime % 70 === 0 && e.isGrounded) {
            e.vy = -7.5;
            e.vx = e.facing * (2.0 + Math.random() * 1.5);
            e.isGrounded = false;
            e.state = 'MOVE';
            this.playSound('poring', 0.1);
          }
        } else if (e.type === 'SPORE') {
          if (absDist > 65) {
            e.vx = e.facing * 1.5;
            e.state = 'MOVE';
          } else {
            e.vx = 0;
            e.state = 'IDLE';
          }
        } else if (e.type === 'BAPHOMET') {
          if (absDist > 110) {
            e.vx = e.facing * 2.8;
            e.state = 'MOVE';
          } else {
            e.vx = 0;
            if (e.stateTime % 85 === 0) {
              e.state = 'ATTACK';
              e.stateTime = 0;
            }
          }
        }
      } else if (e.state === 'ATTACK') {
        e.stateTime++;
        if (e.stateTime === 25) {
          this.playSound('swing3');
          this.screenShake = 10;
          this.addSlashSparks(e.x + e.facing * 80, e.y - 40, 18, '#ff1744');
          if (absDist < 120 && targetPlayer.state !== 'KO') {
            const dmg = 380;
            targetPlayer.hp = Math.max(0, targetPlayer.hp - dmg);
            targetPlayer.state = targetPlayer.hp === 0 ? 'KO' : 'HURT';
            targetPlayer.vx = e.facing * 9;
            targetPlayer.vy = -6;
            this.addDamageNumber(targetPlayer.x, targetPlayer.y - 50, `-${dmg}`, '#ff1744');
            this.playSound('bash');
          }
        }
        if (e.stateTime > 50) e.state = 'IDLE';
      }

      // Physics
      e.x += e.vx;
      if (!e.isGrounded) {
        e.vy += 0.55;
        e.y += e.vy;
        if (e.y >= this.groundY) {
          e.y = this.groundY;
          e.vy = 0;
          e.vx = 0;
          e.isGrounded = true;
          e.squashX = 1.35;
          e.squashY = 0.65;
        }
      }

      // Squash & Stretch
      e.squashX += (1.0 - e.squashX) * 0.15;
      e.squashY += (1.0 - e.squashY) * 0.15;

      // Contact Damage to Players
      if (absDist < (e.type === 'BAPHOMET' ? 80 : 42) && targetPlayer.state !== 'HURT' && targetPlayer.state !== 'KO' && e.state !== 'DEAD') {
        const dmg = e.type === 'BAPHOMET' ? 180 : (e.type === 'SPORE' ? 45 : 22);
        targetPlayer.state = (targetPlayer.hp - dmg <= 0) ? 'KO' : 'HURT';
        targetPlayer.stateTime = 0;
        targetPlayer.vx = e.facing * 6;
        targetPlayer.vy = -3.5;
        targetPlayer.hp = Math.max(0, targetPlayer.hp - dmg);
        this.addDamageNumber(targetPlayer.x, targetPlayer.y - 45, `-${dmg}`, '#ff5252');
        this.playSound('hit1');
      }
    });

    // Remove dead enemies
    this.enemies = this.enemies.filter(e => e.state !== 'DEAD');

    // Trigger next wave if all cleared
    if (this.enemies.length === 0 && !this.isBossWave && !this.isStageCleared) {
      this.startWave(this.wave + 1);
    }

    // Broadcast host state if online
    if (this.gameMode === 'ONLINE' && this.onlineRole === 'host' && this.netcode) {
      const boss = this.enemies.find(e => e.type === 'BAPHOMET');
      this.netcode.sendHostState({
        wave: this.wave,
        bossHp: boss ? boss.hp : undefined
      });
    }
  }

  updateParticles() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    });
    this.particles = this.particles.filter(p => p.life > 0);

    this.damageNumbers.forEach(d => {
      d.y += d.vy;
      d.vy += 0.09;
      d.life--;
    });
    this.damageNumbers = this.damageNumbers.filter(d => d.life > 0);

    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer === 0) this.combo = 0;
    }

    if (this.screenShake > 0) this.screenShake *= 0.86;
  }

  checkCollision(r1, r2) {
    return !(
      r2.x > r1.x + r1.w ||
      r2.x + r2.w < r1.x ||
      r2.y > r1.y + r1.h ||
      r2.y + r2.h < r1.y
    );
  }

  // --- Dynamic Shared Camera ---
  updateCamera() {
    let targetCamX = 0;
    if (this.players.length === 1) {
      targetCamX = this.players[0].x - this.width / 2;
    } else {
      const p1 = this.players[0];
      const p2 = this.players[1];
      const midX = (p1.x + p2.x) / 2;
      targetCamX = midX - this.width / 2;

      // Keep both players clamped inside current screen viewport
      const pad = 40;
      const leftBound = this.camera.x + pad;
      const rightBound = this.camera.x + this.width - pad;
      p1.x = Math.max(leftBound, Math.min(rightBound, p1.x));
      p2.x = Math.max(leftBound, Math.min(rightBound, p2.x));
    }

    this.camera.x += (targetCamX - this.camera.x) * 0.12;
    this.camera.x = Math.max(0, Math.min(this.stageWidth - this.width, this.camera.x));
  }

  render() {
    const ctx = this.ctx;
    ctx.save();

    // Screen Shake
    if (this.screenShake > 0.5) {
      const shakeX = (Math.random() * 2 - 1) * this.screenShake;
      const shakeY = (Math.random() * 2 - 1) * this.screenShake;
      ctx.translate(shakeX, shakeY);
    }

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, this.width, this.height);

    const camX = this.camera.x;

    // 1. Background Parallax (Prontera Field)
    if (this.images.bg) {
      ctx.drawImage(this.images.bg, camX, 0, this.width, this.height, 0, 0, this.width, this.height);
    } else {
      ctx.fillStyle = '#68a048';
      ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);
    }

    // 2. Enemies
    this.enemies.forEach(e => {
      this.renderEnemy(ctx, e, camX);
    });

    // 3. Players
    this.players.forEach(p => {
      this.renderPlayer(ctx, p, camX);
    });

    // 4. Particles & Floating Damage
    this.renderEffects(ctx, camX);

    // 5. Dual HUD
    this.renderHUD(ctx);

    ctx.restore();
  }

  renderPlayer(ctx, p, camX) {
    const screenX = p.x - camX;
    const screenY = p.y;

    ctx.save();
    ctx.translate(screenX, screenY);

    // Player Floating Badge (1P / 2P)
    ctx.fillStyle = p.badgeColor;
    ctx.beginPath();
    ctx.roundRect(-14, -135, 28, 16, 4);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.badgeText, 0, -123);

    // Flip Sprite Horizontally
    ctx.scale(p.facing, 1);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    const charKey = (p.charaId ? p.charaId.toLowerCase() : (p.chara === 'ACOLYTE' ? 'aco_f' : 'swd_m')) + '_sheet_0';
    const charaTex = this.images[charKey] || (p.chara === 'ACOLYTE' ? this.images.aco_tex : this.images.swd_tex);

    if (charaTex) {
      let sw = 105, sh = 115;
      if (p.state === 'KO') {
        // KO on ground
        ctx.drawImage(charaTex, 0, 25, sw, sh, -52, -45, sw, 50);
      } else if (p.state === 'IDLE') {
        const bob = Math.sin(p.stateTime * 0.12) * 2;
        ctx.drawImage(charaTex, 0, 25, sw, sh, -52, -112 + bob, sw, sh);
      } else if (p.state === 'WALK' || p.state === 'DASH') {
        const step = Math.floor((p.stateTime / 6) % 4);
        ctx.drawImage(charaTex, step * 100, 25, sw, sh, -52, -114, sw, sh);
      } else if (p.state === 'JUMP') {
        ctx.drawImage(charaTex, 150, 25, sw, sh, -52, -122, sw, sh);
      } else if (p.state === 'ATTACK_LIGHT') {
        ctx.drawImage(charaTex, 240, 25, 115, sh, -48, -115, 115, sh);
        ctx.strokeStyle = 'rgba(255, 235, 59, 0.85)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(10, -50, 50, -Math.PI * 0.3, Math.PI * 0.2);
        ctx.stroke();
      } else if (p.state === 'ATTACK_MID') {
        ctx.drawImage(charaTex, 350, 25, 120, sh, -45, -118, 120, sh);
        ctx.strokeStyle = 'rgba(255, 193, 7, 0.95)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(15, -55, 62, -Math.PI * 0.5, Math.PI * 0.3);
        ctx.stroke();
      } else if (p.state === 'ATTACK_HEAVY') {
        ctx.drawImage(charaTex, 240, 25, 120, sh, -42, -120, 125, sh);
        ctx.strokeStyle = 'rgba(64, 196, 255, 0.95)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(20, -55, 75, -Math.PI * 0.6, Math.PI * 0.4);
        ctx.stroke();
      } else if (p.state === 'SKILL_1') {
        // Skill 1 (Bash or Holy Light)
        ctx.drawImage(charaTex, 240, 25, 120, sh, -42, -120, 125, sh);
        if (p.chara === 'SWORDMAN') {
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.95)';
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.arc(25, -55, 85, -Math.PI * 0.65, Math.PI * 0.45);
          ctx.stroke();
        } else {
          const grad = ctx.createLinearGradient(30, -180, 30, 0);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.5, 'rgba(128, 222, 234, 0.8)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
          ctx.fillStyle = grad;
          ctx.fillRect(10, -160, 40, 160);
        }
      } else if (p.state === 'SKILL_2') {
        // Skill 2 (Magnum Break or Heal & Angelus)
        ctx.drawImage(charaTex, 350, 25, 125, sh, -45, -122, 125, sh);
        if (p.chara === 'SWORDMAN') {
          const prog = Math.min(1, p.stateTime / 20);
          ctx.strokeStyle = `rgba(255, 87, 34, ${1 - prog * 0.8})`;
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.ellipse(0, -20, 40 + prog * 100, 20 + prog * 40, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(105, 240, 174, 0.85)';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(0, -55, 55, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        ctx.drawImage(charaTex, 0, 25, sw, sh, -52, -112, sw, sh);
      }
    } else {
      ctx.fillStyle = p.chara === 'ACOLYTE' ? '#81d4fa' : '#ef5350';
      ctx.fillRect(-18, -80, 36, 75);
    }

    ctx.restore();
  }

  renderEnemy(ctx, e, camX) {
    const screenX = e.x - camX;
    const screenY = e.y;

    ctx.save();
    ctx.translate(screenX, screenY);
    ctx.scale(e.facing * e.squashX, e.squashY);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.type === 'BAPHOMET' ? 70 : 24, e.type === 'BAPHOMET' ? 18 : 7, 0, 0, Math.PI * 2);
    ctx.fill();

    if (e.type === 'PORING') {
      const r = 24;
      ctx.translate(0, -r);
      const grad = ctx.createRadialGradient(-6, -8, 2, 0, 0, r);
      grad.addColorStop(0, '#ff80ab');
      grad.addColorStop(0.7, '#f50057');
      grad.addColorStop(1, '#c51162');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(6, -4, 3.5, 0, Math.PI * 2);
      ctx.arc(16, -4, 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (e.type === 'SPORE') {
      ctx.fillStyle = '#4e342e';
      ctx.beginPath();
      ctx.arc(0, -28, 26, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#d7ccc8';
      ctx.fillRect(-12, -28, 24, 28);
    } else if (e.type === 'BAPHOMET') {
      // Giant MVP Boss
      ctx.fillStyle = '#212121';
      ctx.fillRect(-38, -135, 76, 135);
      // Horns
      ctx.strokeStyle = '#d50000';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(-20, -135);
      ctx.lineTo(-45, -170);
      ctx.moveTo(20, -135);
      ctx.lineTo(45, -170);
      ctx.stroke();
      // Eyes
      ctx.fillStyle = '#ff1744';
      ctx.fillRect(-14, -110, 8, 8);
      ctx.fillRect(8, -110, 8, 8);
    }

    // Enemy Floating Health Bar
    if (e.hp < e.maxHp && e.type !== 'BAPHOMET') {
      const barW = 44;
      const pct = Math.max(0, e.hp / e.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(-barW / 2, -65, barW, 6);
      ctx.fillStyle = '#ff5252';
      ctx.fillRect(-barW / 2 + 1, -64, (barW - 2) * pct, 4);
    }

    ctx.restore();
  }

  renderEffects(ctx, camX) {
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.beginPath();
      ctx.arc(p.x - camX, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    ctx.font = 'bold 19px "Impact", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    this.damageNumbers.forEach(d => {
      const alpha = Math.min(1.0, d.life / 15);
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillText(d.text, d.x - camX + 1, d.y + 1);
      ctx.fillStyle = d.color;
      ctx.fillText(d.text, d.x - camX, d.y);
    });
  }

  renderHUD(ctx) {
    // 1P HUD (Top-Left)
    if (this.players[0]) {
      this.drawPlayerHUD(ctx, this.players[0], 16, 16, '1P');
    }

    // 2P HUD (Top-Right) in Co-op / Online mode
    if (this.players[1]) {
      this.drawPlayerHUD(ctx, this.players[1], this.width - 250, 16, '2P');
    }

    // Score & Wave Counter
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px "Impact", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(`SCORE: ${this.score.toLocaleString()}`, this.width / 2, 60);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#e2b04a';
    ctx.fillText(this.isBossWave ? '⚠️ BOSS BATTLE!' : `STAGE 1 - WAVE ${this.wave}/3`, this.width / 2, 80);

    // Combo Counter
    if (this.combo > 1) {
      ctx.textAlign = 'left';
      ctx.font = 'italic bold 28px "Impact", sans-serif';
      ctx.fillStyle = '#ffeb3b';
      ctx.fillText(`${this.combo} HITS!`, 20, 135);
    }

    // MVP Boss Bar
    const boss = this.enemies.find(e => e.type === 'BAPHOMET');
    if (boss && boss.state !== 'DEAD') {
      const bossBarW = 420;
      const bossPct = Math.max(0, boss.hp / boss.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect((this.width - bossBarW) / 2, 16, bossBarW, 22);
      ctx.fillStyle = '#d50000';
      ctx.fillRect((this.width - bossBarW) / 2 + 2, 18, (bossBarW - 4) * bossPct, 18);
      ctx.strokeStyle = '#ff1744';
      ctx.lineWidth = 2;
      ctx.strokeRect((this.width - bossBarW) / 2, 16, bossBarW, 22);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`👑 MVP BOSS: BAPHOMET  (${boss.hp} / ${boss.maxHp})`, this.width / 2, 31);
    }
  }

  drawPlayerHUD(ctx, p, x, y, badge) {
    const isKO = p.state === 'KO';

    // Panel
    ctx.fillStyle = 'rgba(18, 22, 32, 0.88)';
    ctx.strokeStyle = p.badgeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, 230, 70, 6);
    ctx.fill();
    ctx.stroke();

    // Badge Icon
    ctx.fillStyle = p.badgeColor;
    ctx.fillRect(x + 8, y + 8, 38, 38);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(badge, x + 27, y + 25);
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText(`Lv.${p.level}`, x + 27, y + 40);

    // HP Bar
    const hpPct = Math.max(0, p.hp / p.maxHp);
    ctx.fillStyle = '#0f121a';
    ctx.fillRect(x + 52, y + 10, 168, 14);
    ctx.fillStyle = isKO ? '#757575' : (hpPct > 0.25 ? '#37d643' : '#d63737');
    ctx.fillRect(x + 53, y + 11, 166 * hpPct, 12);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isKO ? 'KNOCKED OUT' : `HP: ${p.hp}/${p.maxHp}`, x + 135, y + 20);

    // SP Bar
    const spPct = Math.max(0, p.sp / p.maxSp);
    ctx.fillStyle = '#0f121a';
    ctx.fillRect(x + 52, y + 28, 168, 12);
    ctx.fillStyle = '#378cd6';
    ctx.fillRect(x + 53, y + 29, 166 * spPct, 10);
    ctx.fillStyle = '#fff';
    ctx.fillText(`SP: ${p.sp}/${p.maxSp}`, x + 135, y + 37);

    // Character Name Tag
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#e2b04a';
    ctx.textAlign = 'left';
    ctx.fillText(p.charaDef ? p.charaDef.name : p.chara, x + 54, y + 54);
  }

  startLoop() {
    const loop = () => {
      this.pollGamepad();
      
      // Update each player with their respective input
      this.players.forEach((p, idx) => {
        const input = this.getInput(idx);
        this.updatePlayer(p, input);
      });

      this.updateCamera();
      this.updateEnemies();
      this.updateParticles();
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Global UI Hookup & Mode Handlers
window.addEventListener('DOMContentLoaded', () => {
  window.rbo = new RBOEngine('gameCanvas');

  // Mute button
  const muteBtn = document.getElementById('muteBtn');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const muted = window.rbo.toggleMute();
      muteBtn.textContent = muted ? '🔇 Sound: OFF' : '🔊 Sound: ON';
      muteBtn.classList.toggle('muted', muted);
    });
  }

  // CRT Scanlines toggle
  const crtBtn = document.getElementById('crtBtn');
  const gameContainer = document.getElementById('gameContainer');
  if (crtBtn && gameContainer) {
    let crtActive = false;
    crtBtn.addEventListener('click', () => {
      crtActive = !crtActive;
      gameContainer.classList.toggle('crt', crtActive);
      crtBtn.textContent = crtActive ? '📺 CRT: ON' : '📺 CRT: OFF';
      crtBtn.classList.toggle('active', crtActive);
    });
  }

  // Restart & Play Again buttons
  const restartBtn = document.getElementById('restartBtn');
  const btnPlayAgain = document.getElementById('btnPlayAgain');
  if (restartBtn) restartBtn.addEventListener('click', () => window.rbo.resetGame());
  if (btnPlayAgain) btnPlayAgain.addEventListener('click', () => window.rbo.resetGame());

  // Mode Selection: Solo, Local 2P, Online
  const modeSolo = document.getElementById('modeSolo');
  const modeLocal2P = document.getElementById('modeLocal2P');
  const modeOnline = document.getElementById('modeOnline');
  const onlineModal = document.getElementById('onlineModal');

  const setModeUI = (activeBtn) => {
    [modeSolo, modeLocal2P, modeOnline].forEach(b => b && b.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
  };

  if (modeSolo) {
    modeSolo.addEventListener('click', () => {
      setModeUI(modeSolo);
      window.rbo.setGameMode('SOLO');
      if (onlineModal) onlineModal.style.display = 'none';
    });
  }

  if (modeLocal2P) {
    modeLocal2P.addEventListener('click', () => {
      setModeUI(modeLocal2P);
      window.rbo.setGameMode('LOCAL_COOP');
      if (onlineModal) onlineModal.style.display = 'none';
    });
  }

  if (modeOnline) {
    modeOnline.addEventListener('click', () => {
      setModeUI(modeOnline);
      if (onlineModal) onlineModal.style.display = 'flex';
    });
  }

  // Character selection (Legacy header pills)
  const charaSwd = document.getElementById('charaSwd');
  const charaAco = document.getElementById('charaAco');
  if (charaSwd && charaAco) {
    charaSwd.addEventListener('click', () => {
      window.rbo.setChara('SWD_M', 0);
      charaSwd.classList.add('selected');
      charaAco.classList.remove('selected');
    });
    charaAco.addEventListener('click', () => {
      window.rbo.setChara('ACO_M', 0);
      charaAco.classList.add('selected');
      charaSwd.classList.remove('selected');
    });
  }

  // Real RBO Character Roster Selection
  let activeSelectSlot = 0; // 0 for 1P, 1 for 2P
  const btnTabP1 = document.getElementById('btnTabP1');
  const btnTabP2 = document.getElementById('btnTabP2');

  if (btnTabP1 && btnTabP2) {
    btnTabP1.addEventListener('click', () => {
      activeSelectSlot = 0;
      btnTabP1.classList.add('active');
      btnTabP2.classList.remove('active');
    });
    btnTabP2.addEventListener('click', () => {
      activeSelectSlot = 1;
      btnTabP2.classList.add('active');
      btnTabP1.classList.remove('active');
    });
  }

  const charCards = document.querySelectorAll('.chara-card');
  charCards.forEach(card => {
    card.addEventListener('click', () => {
      const charId = card.getAttribute('data-char');
      if (!charId) return;
      window.rbo.setChara(charId, activeSelectSlot);

      if (activeSelectSlot === 0) {
        charCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      } else {
        charCards.forEach(c => c.classList.remove('p2-selected'));
        card.classList.add('p2-selected');
      }
    });
  });

  // Online Room Controls
  if (window.RBONetcode) {
    const netcode = new window.RBONetcode(window.rbo);
    window.rbo.netcode = netcode;

    const btnCreateRoom = document.getElementById('btnCreateRoom');
    const btnJoinRoom = document.getElementById('btnJoinRoom');
    const inputRoomCode = document.getElementById('inputRoomCode');
    const netStatus = document.getElementById('netStatus');
    const roomInfo = document.getElementById('roomInfo');
    const shareLinkBtn = document.getElementById('shareLinkBtn');

    netcode.onStatusChange = (status) => {
      if (netStatus) {
        netStatus.textContent = status.msg;
        netStatus.className = 'net-status ' + (status.isConnected ? 'connected' : 'connecting');
      }
      if (status.roomId && roomInfo) {
        roomInfo.style.display = 'block';
        document.getElementById('displayRoomCode').textContent = status.roomId;
      }
      if (status.isConnected) {
        window.rbo.onlineRole = status.role;
        window.rbo.setGameMode('ONLINE');
      }
    };

    if (btnCreateRoom) {
      btnCreateRoom.addEventListener('click', async () => {
        try {
          const roomId = await netcode.createRoom();
          window.rbo.onlineRole = 'host';
        } catch(e) {}
      });
    }

    if (btnJoinRoom) {
      btnJoinRoom.addEventListener('click', async () => {
        const code = inputRoomCode.value.trim().toUpperCase();
        if (code) {
          try {
            await netcode.joinRoom(code);
            window.rbo.onlineRole = 'guest';
          } catch(e) {}
        }
      });
    }

    if (shareLinkBtn) {
      shareLinkBtn.addEventListener('click', () => {
        if (netcode.roomId) {
          const url = window.location.origin + window.location.pathname + '?room=' + netcode.roomId;
          navigator.clipboard.writeText(url);
          shareLinkBtn.textContent = '✅ Copied Invite Link!';
          setTimeout(() => shareLinkBtn.textContent = '📋 Copy Invite Link', 2500);
        }
      });
    }

    // Auto-join from URL parameter (e.g. ?room=RBO-1234)
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    if (roomParam) {
      if (onlineModal) onlineModal.style.display = 'flex';
      if (inputRoomCode) inputRoomCode.value = roomParam;
      setModeUI(modeOnline);
      setTimeout(() => {
        netcode.joinRoom(roomParam.toUpperCase());
      }, 500);
    }
  }

  // Tab Navigation
  const tabBtns = document.querySelectorAll('.nav-btn');
  const tabViews = document.querySelectorAll('.tab-view');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabViews.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetId).classList.add('active');

      if (targetId === 'tabStudio' && window.initStudio) {
        window.initStudio();
      }
    });
  });
});
