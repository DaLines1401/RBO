const fs = require('fs');
let code = fs.readFileSync('web/engine.js', 'utf8');

const targetRegex = /\/\/ Character selection[\s\S]*?charaSwd\.classList\.remove\('selected'\);\s*\}\);\s*\}/;

const replacement = `// Character selection (Legacy header pills)
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

if (!code.includes('btnTabP1')) {
  code = code.replace(targetRegex, replacement);
  fs.writeFileSync('web/engine.js', code, 'utf8');
  console.log('Character cards UI handlers inserted successfully!');
} else {
  console.log('btnTabP1 already present');
}
