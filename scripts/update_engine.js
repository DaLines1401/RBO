const fs = require('fs');

let code = fs.readFileSync('web/engine.js', 'utf8');

// 1. Prepend CHARACTER_DEFS
const charDefs = `/**
 * Ragnarok Battle Offline - Authentic Character Definitions
 */
const CHARACTER_DEFS = {
  SWD_M: {
    id: 'SWD_M',
    class: 'SWORDMAN',
    gender: 'M',
    name: 'Swordman (ชาย)',
    title: 'นักดาบหนุ่มผู้กล้าหาญ',
    baseHp: 1350,
    baseSp: 220,
    str: 85, agi: 60, vit: 90, int: 25, dex: 55, luk: 40,
    sheetPrefix: 'swd_m_sheet_',
    skill1Name: 'BASH Lv.10!',
    skill2Name: 'MAGNUM BREAK!!',
    skill1Dmg: 380,
    skill2Dmg: 550,
    skill1Sp: 25,
    skill2Sp: 45
  },
  SWD_F: {
    id: 'SWD_F',
    class: 'SWORDMAN',
    gender: 'F',
    name: 'Swordman (หญิง)',
    title: 'นักดาบสาวผู้ปราดเปรียว',
    baseHp: 1250,
    baseSp: 240,
    str: 80, agi: 75, vit: 75, int: 30, dex: 65, luk: 45,
    sheetPrefix: 'swd_f_sheet_',
    skill1Name: 'SWIFT BASH!',
    skill2Name: 'MAGNUM BREAK!!',
    skill1Dmg: 360,
    skill2Dmg: 530,
    skill1Sp: 25,
    skill2Sp: 45
  },
  ACO_M: {
    id: 'ACO_M',
    class: 'ACOLYTE',
    gender: 'M',
    name: 'Acolyte (ชาย)',
    title: 'นักบวชสายประชิด (Battle Monk)',
    baseHp: 1150,
    baseSp: 340,
    str: 70, agi: 65, vit: 70, int: 80, dex: 60, luk: 50,
    sheetPrefix: 'aco_m_sheet_',
    skill1Name: 'HOLY LIGHT!',
    skill2Name: 'HEAL & ANGELUS',
    skill1Dmg: 310,
    skill2Dmg: 0,
    skill1Sp: 20,
    skill2Sp: 40
  },
  ACO_F: {
    id: 'ACO_F',
    class: 'ACOLYTE',
    gender: 'F',
    name: 'Acolyte (หญิง)',
    title: 'นักบวชสาวผู้เปี่ยมศรัทธา',
    baseHp: 1100,
    baseSp: 380,
    str: 60, agi: 60, vit: 65, int: 95, dex: 65, luk: 60,
    sheetPrefix: 'aco_f_sheet_',
    skill1Name: 'DIVINE LIGHT!',
    skill2Name: 'HEAL & ANGELUS',
    skill1Dmg: 330,
    skill2Dmg: 0,
    skill1Sp: 20,
    skill2Sp: 40
  }
};

`;

if (!code.includes('CHARACTER_DEFS')) {
  code = charDefs + code;
}

// 2. Add character sheets to loadAssets
const oldAssets = "{ type: 'image', key: 'swd_tex', url: 'assets/sprites/swd_paletted_test.png' },";
const newAssets = `{ type: 'image', key: 'swd_tex', url: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'swd_m_sheet_0', url: 'assets/characters/swd_m_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'swd_f_sheet_0', url: 'assets/characters/swd_f_sheet_0.png', fallback: 'assets/sprites/swd_paletted_test.png' },
      { type: 'image', key: 'aco_m_sheet_0', url: 'assets/characters/aco_m_sheet_0.png', fallback: 'assets/sprites/aco_paletted_test.png' },
      { type: 'image', key: 'aco_f_sheet_0', url: 'assets/characters/aco_f_sheet_0.png', fallback: 'assets/sprites/aco_paletted_test.png' },`;

code = code.replace(oldAssets, newAssets);

// 3. Update defaults in constructor
code = code.replace("this.selectedChara = 'SWORDMAN';", "this.selectedChara = 'SWD_M';");
code = code.replace("this.selectedCharaP2 = 'ACOLYTE';", "this.selectedCharaP2 = 'ACO_F';");

// 4. Update createPlayerEntity
const oldCreate = /createPlayerEntity\(id, startX, chara, badgeColor\) \{[\s\S]*?badgeText: `\$\{id\}P`\s*\};\s*\}/;
const newCreate = `createPlayerEntity(id, startX, charaId, badgeColor) {
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
      badgeText: \`\${id}P\`,
      inputHistory: [],
      lastDir: 'NEUTRAL'
    };
  }`;
code = code.replace(oldCreate, newCreate);

// 5. Update resetGame p1 & p2 creation
code = code.replace(
  "const p1 = this.createPlayerEntity(1, 180, this.selectedChara, '#40c4ff');",
  "const p1 = this.createPlayerEntity(1, 180, this.selectedChara || 'SWD_M', '#40c4ff');"
);
code = code.replace(
  "const p2Chara = (this.selectedChara === 'SWORDMAN') ? 'ACOLYTE' : 'SWORDMAN';",
  "const p2Chara = this.selectedCharaP2 || (this.selectedChara === 'SWD_M' ? 'ACO_F' : 'SWD_M');"
);

// 6. Update setChara
const oldSetChara = /setChara\(chara, playerIdx = 0\) \{[\s\S]*?\}\s*\}/;
const newSetChara = `setChara(chara, playerIdx = 0) {
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
  }`;
code = code.replace(oldSetChara, newSetChara);

// 7. Update updatePlayer with Fighting Command Motion Buffer and Character Skills
const oldUpdateStart = "    p.stateTime++;\n    if (p.attackCooldown > 0) p.attackCooldown--;";
const newUpdateStart = `    p.stateTime++;
    if (p.attackCooldown > 0) p.attackCooldown--;

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
    }`;
code = code.replace(oldUpdateStart, newUpdateStart);

// 8. Update Skill 1 & Skill 2 execution
const oldSkills = /\/\/ Skill 1 \(Bash[\s\S]*?\/\/ Physics Update/;
const newSkills = `// Skill 1 (Bash / Holy Light)
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
      } else {
        // Acolyte: Holy Light / Angelus & Team Revive!
        this.playSound('levelup');
        const dmg = p.charaDef?.skill1Dmg || 310;
        this.performAttack(p, { damage: dmg, reach: 140, knockback: 8.0, launch: -6.0, hitStop: 8 });
        this.addDamageNumber(p.x, p.y - 75, p.charaDef?.skill1Name || 'HOLY LIGHT!', '#80d8ff');

        // Check if ally is KO nearby and revive them!
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

    // Skill 2 (Magnum Break / Heal)
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
      } else {
        this.playSound('levelup');
        p.hp = Math.min(p.maxHp, p.hp + 450);
        this.addDamageNumber(p.x, p.y - 80, '+450 HP (HEAL)', '#69f0ae');
        // Heal nearby teammates too
        this.players.forEach(ally => {
          if (ally.id !== p.id && ally.state !== 'KO' && Math.abs(ally.x - p.x) < 220) {
            ally.hp = Math.min(ally.maxHp, ally.hp + 350);
            this.addDamageNumber(ally.x, ally.y - 80, '+350 HP', '#69f0ae');
          }
        });
      }
    }

    // Physics Update`;
code = code.replace(oldSkills, newSkills);

// 9. Update renderPlayer
const oldRender = /renderPlayer\(ctx, p, camX\) \{[\s\S]*?ctx\.restore\(\);\s*\}/;
const newRender = `renderPlayer(ctx, p, camX) {
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
          ctx.strokeStyle = \`rgba(255, 87, 34, \${1 - prog * 0.8})\`;
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
  }`;
code = code.replace(oldRender, newRender);

// 10. Update HUD display name
code = code.replace("ctx.fillText(p.chara, x + 54, y + 54);", "ctx.fillText(p.charaDef ? p.charaDef.name : p.chara, x + 54, y + 54);");

// 11. Add Character Select Lobby Card Event Listeners in DOMContentLoaded
const oldCharaSelect = `  // Character selection
  const charaSwd = document.getElementById('charaSwd');
  const charaAco = document.getElementById('charaAco');
  if (charaSwd && charaAco) {
    charaSwd.addEventListener('click', () => {
      window.rbo.setChara('SWORDMAN', 0);
      charaSwd.classList.add('selected');
      charaAco.classList.remove('selected');
    });
    charaAco.addEventListener('click', () => {
      window.rbo.setChara('ACOLYTE', 0);
      charaAco.classList.add('selected');
      charaSwd.classList.remove('selected');
    });
  }`;

const newCharaSelect = `  // Character selection (Legacy header pills)
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
  });`;

code = code.replace(oldCharaSelect, newCharaSelect);

fs.writeFileSync('web/engine.js', code, 'utf8');
console.log('web/engine.js successfully updated!');
