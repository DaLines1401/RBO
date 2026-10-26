const fs = require('fs');
const http = require('http');

console.log('=== [1/5] Verifying Manifest and Character Definitions ===');
const manifestPath = 'web/assets/characters/manifest.json';
if (!fs.existsSync(manifestPath)) {
  console.error('FAIL: manifest.json does not exist');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const requiredChars = ['SWD_M', 'SWD_F', 'ACO_M', 'ACO_F'];
requiredChars.forEach(c => {
  if (!manifest.characters[c]) {
    console.error(`FAIL: Missing character ${c} in manifest`);
    process.exit(1);
  }
  console.log(`  ✔ Found character ${c}: ${manifest.characters[c].name} (HP: ${manifest.characters[c].baseHp}, SP: ${manifest.characters[c].baseSp})`);
});

console.log('\n=== [2/5] Verifying Extracted Character PNG Sheets ===');
const requiredSheets = [
  'swd_m_sheet_0.png', 'swd_m_sheet_1.png', 'swd_m_sheet_2.png',
  'swd_f_sheet_0.png', 'swd_f_sheet_1.png', 'swd_f_sheet_2.png',
  'aco_m_sheet_0.png', 'aco_m_sheet_1.png', 'aco_m_sheet_2.png',
  'aco_f_sheet_0.png', 'aco_f_sheet_1.png', 'aco_f_sheet_2.png'
];

requiredSheets.forEach(sheet => {
  const p = 'web/assets/characters/' + sheet;
  if (!fs.existsSync(p)) {
    console.error(`FAIL: Sheet not found: ${p}`);
    process.exit(1);
  }
  const buf = fs.readFileSync(p);
  // PNG signature: 137 80 78 71 13 10 26 10
  if (buf[0] !== 137 || buf[1] !== 80 || buf[2] !== 78 || buf[3] !== 71) {
    console.error(`FAIL: Invalid PNG header for ${sheet}`);
    process.exit(1);
  }
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  console.log(`  ✔ ${sheet.padEnd(20)}: ${w}x${h} (${(buf.length / 1024).toFixed(1)} KB)`);
});

console.log('\n=== [3/5] Verifying Engine & CSS Integration ===');
const engineCode = fs.readFileSync('web/engine.js', 'utf8');
const checks = [
  ['CHARACTER_DEFS', 'Character Definitions object'],
  ['swd_m_sheet_0', 'Swordman Male Sheet loading'],
  ['swd_f_sheet_0', 'Swordman Female Sheet loading'],
  ['aco_m_sheet_0', 'Acolyte Male Sheet loading'],
  ['aco_f_sheet_0', 'Acolyte Female Sheet loading'],
  ['hasQCF', 'Quarter-Circle Forward motion detection'],
  ['hasDownUp', 'Down-Up motion detection'],
  ['btnTabP1', '1P / 2P Character Selection tabs'],
  ['chara-card', 'Character card click handler']
];

checks.forEach(([token, desc]) => {
  if (!engineCode.includes(token)) {
    console.error(`FAIL: Missing ${desc} (token: ${token}) in web/engine.js`);
    process.exit(1);
  }
  console.log(`  ✔ Engine check: ${desc}`);
});

const cssCode = fs.readFileSync('web/style.css', 'utf8');
['.chara-selector-container', '.chara-card', '.card-gender', '.cmd-pill'].forEach(c => {
  if (!cssCode.includes(c)) {
    console.error(`FAIL: Missing CSS selector ${c} in web/style.css`);
    process.exit(1);
  }
  console.log(`  ✔ CSS check: ${c}`);
});

console.log('\n=== [4/5] Checking HTML Character Roster & Guide ===');
const htmlCode = fs.readFileSync('web/index.html', 'utf8');
['card_SWD_M', 'card_SWD_F', 'card_ACO_M', 'card_ACO_F', 'command-guide'].forEach(id => {
  if (!htmlCode.includes(id)) {
    console.error(`FAIL: Missing HTML element ${id} in web/index.html`);
    process.exit(1);
  }
  console.log(`  ✔ HTML check: ${id}`);
});

console.log('\n=== [5/5] HTTP Server Integration & Asset Headers ===');
// Start server on temporary port 8899
const server = require('../web/server.js');
const port = 8899;

server.listen(port, async () => {
  console.log(`  Test server listening on port ${port}...`);

  const urlsToTest = [
    '/',
    '/assets/characters/manifest.json',
    '/assets/characters/swd_m_sheet_0.png',
    '/assets/characters/swd_f_sheet_0.png',
    '/assets/characters/aco_m_sheet_0.png',
    '/assets/characters/aco_f_sheet_0.png'
  ];

  for (const url of urlsToTest) {
    await new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}${url}`, res => {
        if (res.statusCode !== 200) {
          console.error(`FAIL: URL ${url} returned ${res.statusCode}`);
          process.exit(1);
        }
        console.log(`  ✔ HTTP 200 OK: ${url} (${res.headers['content-type']})`);
        resolve();
      }).on('error', reject);
    });
  }

  console.log('\n🎉 ALL REAL CHARACTER VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
  server.close(() => process.exit(0));
});
