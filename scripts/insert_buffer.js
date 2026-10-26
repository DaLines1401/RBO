const fs = require('fs');
let code = fs.readFileSync('web/engine.js', 'utf8');

const target = "const canMove = !['ATTACK_LIGHT'";
const insertion = `// Command Motion Buffer History (↓ ↘ → + Light / ↓ ↑ + Heavy)
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

    `;

if (!code.includes('hasQCF')) {
  code = code.replace(target, insertion + target);
  fs.writeFileSync('web/engine.js', code, 'utf8');
  console.log('hasQCF inserted successfully!');
} else {
  console.log('hasQCF already present');
}
