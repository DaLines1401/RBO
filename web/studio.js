/**
 * Ragnarok Battle Offline - Live PAC Explorer & PacNyx Sprite Inspector
 * Community-Standard Reverse-Engineered HAN2RBO DAT/PAC Visualizer
 */

// ==========================================
// 1. PAC Archive Explorer State
// ==========================================
let currentPac = '';
let pacFiles = [];

// ==========================================
// 2. PacNyx Character & Pose Inspector State
// ==========================================
let pacnyxManifest = null;
let currentCharaId = 'SWD_M';
let currentCharaData = null; // { poses: [], sheets: [HTMLImageElement, ...] }
let currentPoseIndex = 0;
let isAnimPlaying = false;
let animTimer = null;
let animLastTime = 0;
let filteredPoses = [];

/**
 * Main Studio Initialization
 */
async function initStudio() {
  setupSubnav();
  initArchiveExplorer();
  await initPacNyxInspector();
}

/**
 * Setup Tab Navigation between Archive Explorer & PacNyx Inspector
 */
function setupSubnav() {
  const btnPac = document.getElementById('btnSubPac');
  const btnPacNyx = document.getElementById('btnSubPacNyx');
  const viewPac = document.getElementById('subViewPac');
  const viewPacNyx = document.getElementById('subViewPacNyx');

  if (!btnPac || !btnPacNyx) return;

  btnPac.addEventListener('click', () => {
    btnPac.classList.add('active');
    btnPacNyx.classList.remove('active');
    viewPac.style.display = 'grid';
    viewPacNyx.style.display = 'none';
  });

  btnPacNyx.addEventListener('click', () => {
    btnPacNyx.classList.add('active');
    btnPac.classList.remove('active');
    viewPac.style.display = 'none';
    viewPacNyx.style.display = 'grid';
    renderCurrentPose();
  });
}

// =========================================================================
// SUBVIEW 1: PAC Archive Explorer
// =========================================================================
async function initArchiveExplorer() {
  const pacSelect = document.getElementById('pacSelect');
  const fileSearch = document.getElementById('fileSearch');

  if (!pacSelect || pacSelect.children.length > 1) return;

  try {
    const res = await fetch('/api/pacs');
    const pacs = await res.json();
    pacSelect.innerHTML = '<option value="">-- Select a .PAC Archive --</option>';
    pacs.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.name;
      opt.textContent = `${p.name} (${(p.size / 1024 / 1024).toFixed(1)} MB)`;
      pacSelect.appendChild(opt);
    });

    pacSelect.addEventListener('change', () => {
      loadPac(pacSelect.value);
    });

    fileSearch.addEventListener('input', () => {
      renderFileList(fileSearch.value);
    });

    // Default select DATA02.PAC or SE.PAC
    if (pacs.length > 0) {
      const defaultPac = pacs.some(p => p.name === 'DATA02.PAC') ? 'DATA02.PAC' : pacs[0].name;
      pacSelect.value = defaultPac;
      loadPac(defaultPac);
    }
  } catch(e) {
    console.error('Failed to load PAC list:', e);
  }
}

async function loadPac(pacName) {
  if (!pacName) return;
  currentPac = pacName;
  const fileListEl = document.getElementById('fileList');
  fileListEl.innerHTML = '<li style="padding:15px; color:#888;">Loading archive table...</li>';

  try {
    const res = await fetch(`/api/pac/files?name=${encodeURIComponent(pacName)}`);
    const data = await res.json();
    pacFiles = data.files || [];
    renderFileList('');
  } catch(e) {
    fileListEl.innerHTML = `<li style="padding:15px; color:#f55;">Error loading PAC: ${e.message}</li>`;
  }
}

function renderFileList(filterText) {
  const fileListEl = document.getElementById('fileList');
  fileListEl.innerHTML = '';

  const filter = filterText.trim().toLowerCase();
  const matched = pacFiles.filter(f => !filter || f.name.toLowerCase().includes(filter));

  if (matched.length === 0) {
    fileListEl.innerHTML = '<li style="padding:15px; color:#888;">No matching files found.</li>';
    return;
  }

  matched.slice(0, 300).forEach(f => {
    const li = document.createElement('li');
    li.className = 'file-item';
    const ext = f.name.slice(f.name.lastIndexOf('.')).toUpperCase();
    const sizeStr = f.size > 1024 * 1024 ? (f.size / 1024 / 1024).toFixed(2) + ' MB' : (f.size / 1024).toFixed(1) + ' KB';

    li.innerHTML = `
      <span>${f.name}</span>
      <div style="display:flex; gap:6px; align-items:center;">
        <span class="file-badge">${ext}</span>
        <span style="font-size:0.7rem; color:#888;">${sizeStr}</span>
      </div>
    `;

    li.addEventListener('click', () => {
      document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
      li.classList.add('active');
      previewFile(f);
    });

    fileListEl.appendChild(li);
  });
}

function previewFile(file) {
  const container = document.getElementById('previewContainer');
  const detailsEl = document.getElementById('fileDetails');
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

  const fileUrl = `/api/pac/extract?pac=${encodeURIComponent(currentPac)}&file=${encodeURIComponent(file.name)}`;

  detailsEl.innerHTML = `
    <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)
    <a href="${fileUrl}" download="${file.name}" style="color:var(--primary-gold); margin-left:12px; text-decoration:none;">💾 Download Raw File</a>
  `;

  if (ext === '.img') {
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:10px; width:100%; height:100%; justify-content:center;">
        <p style="color:#aaa; font-size:0.85rem;">Decoding 32-bit BGRA surface to bitmap...</p>
        <img class="preview-img" src="${fileUrl}&format=bmp" alt="${file.name}" style="box-shadow: 0 4px 20px rgba(0,0,0,0.6);" />
      </div>
    `;
  } else if (ext === '.wav') {
    container.innerHTML = `
      <div class="audio-preview">
        <div style="font-size:3rem;">🎵</div>
        <h3 style="color:#fff;">${file.name}</h3>
        <p style="color:#888; font-size:0.85rem;">PCM Waveform Audio (${(file.size / 1024).toFixed(1)} KB)</p>
        <audio controls autoplay src="${fileUrl}" style="margin-top:10px; width:360px;"></audio>
      </div>
    `;
  } else if (ext === '.txt') {
    container.innerHTML = '<p style="color:#aaa;">Loading text...</p>';
    fetch(fileUrl)
      .then(r => r.text())
      .then(text => {
        container.innerHTML = `<pre style="width:100%; height:100%; overflow:auto; padding:15px; color:#e0e0e0; font-size:0.85rem;">${escapeHtml(text)}</pre>`;
      });
  } else {
    container.innerHTML = `
      <div style="text-align:center; color:#aaa;">
        <div style="font-size:3rem; margin-bottom:10px;">📦</div>
        <h3>${file.name}</h3>
        <p style="margin-top:6px; font-size:0.85rem;">French-Bread Binary Asset (${ext.toUpperCase()})</p>
        <p style="margin-top:4px; font-size:0.75rem; color:#666;">Size: ${file.size} bytes | Offset: 0x${file.offset.toString(16)}</p>
        <a href="${fileUrl}" download="${file.name}" class="action-btn" style="display:inline-block; margin-top:16px; text-decoration:none;">Download File</a>
      </div>
    `;
  }
}

// =========================================================================
// SUBVIEW 2: PacNyx Sprite & Pose Inspector
// =========================================================================
async function initPacNyxInspector() {
  const charSelect = document.getElementById('pacnyxCharSelect');
  const poseSearch = document.getElementById('pacnyxPoseSearch');
  const btnPlay = document.getElementById('btnAnimPlay');
  const btnPrev = document.getElementById('btnAnimPrev');
  const btnNext = document.getElementById('btnAnimNext');
  const zoomSelect = document.getElementById('pacnyxZoom');
  const chkCrosshair = document.getElementById('showCrosshair');
  const btnExport = document.getElementById('btnExportPosePng');

  if (!charSelect) return;

  // Load manifest
  try {
    const res = await fetch('assets/characters/manifest.json');
    pacnyxManifest = await res.json();
    charSelect.innerHTML = '';

    const charList = Array.isArray(pacnyxManifest.characters)
      ? pacnyxManifest.characters
      : Object.values(pacnyxManifest.characters);

    charList.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      const count = c.poseCount || c.posesCount || 0;
      opt.textContent = `${c.name} (${count} poses)`;
      charSelect.appendChild(opt);
    });

    charSelect.addEventListener('change', () => {
      loadPacnyxCharacter(charSelect.value);
    });

    poseSearch.addEventListener('input', () => {
      filterPoses(poseSearch.value);
    });

    btnPlay.addEventListener('click', toggleAnimPlay);
    btnPrev.addEventListener('click', () => stepPose(-1));
    btnNext.addEventListener('click', () => stepPose(1));

    zoomSelect.addEventListener('change', renderCurrentPose);
    chkCrosshair.addEventListener('change', renderCurrentPose);
    btnExport.addEventListener('click', exportCurrentPosePng);

    // Initial load Swordman Male
    await loadPacnyxCharacter('SWD_M');
  } catch(e) {
    console.warn('Could not load PacNyx manifest:', e);
  }
}

async function loadPacnyxCharacter(charId) {
  currentCharaId = charId;
  const charList = Array.isArray(pacnyxManifest.characters)
    ? pacnyxManifest.characters
    : Object.values(pacnyxManifest.characters);
  const charDef = charList.find(c => c.id === charId);
  if (!charDef) return;

  // Stop animation if playing
  stopAnim();

  // Load poses JSON
  const posesUrl = charDef.posesData || `assets/characters/${charDef.posesFile}`;
  const res = await fetch(posesUrl);
  const poses = await res.json();

  // Preload texture sheets
  const sheetImgs = await Promise.all(charDef.sheets.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }));

  currentCharaData = {
    def: charDef,
    poses,
    sheets: sheetImgs
  };

  currentPoseIndex = 0;
  filterPoses('');
  selectPose(0);
}

function filterPoses(query) {
  if (!currentCharaData) return;
  const q = query.trim().toLowerCase();
  filteredPoses = currentCharaData.poses.filter(p => !q || p.name.toLowerCase().includes(q) || String(p.id).includes(q));

  const listEl = document.getElementById('pacnyxPoseList');
  const countBadge = document.getElementById('poseCountBadge');
  listEl.innerHTML = '';
  countBadge.textContent = `${filteredPoses.length} / ${currentCharaData.poses.length} Poses`;

  filteredPoses.forEach((p, idx) => {
    const li = document.createElement('li');
    li.className = 'file-item' + (idx === currentPoseIndex ? ' active' : '');
    li.dataset.idx = idx;
    li.innerHTML = `
      <span style="font-weight:600;">#${p.id}</span>
      <span style="color:#ddd; margin-left:8px; font-family:monospace;">${p.name}</span>
      <span class="file-badge" style="margin-left:auto;">${p.parts.length} parts</span>
    `;

    li.addEventListener('click', () => {
      selectPose(idx);
    });

    listEl.appendChild(li);
  });
}

function selectPose(filteredIdx) {
  if (!filteredPoses || filteredPoses.length === 0) return;
  if (filteredIdx < 0) filteredIdx = filteredPoses.length - 1;
  if (filteredIdx >= filteredPoses.length) filteredIdx = 0;

  currentPoseIndex = filteredIdx;

  // Update UI list active class
  const listEl = document.getElementById('pacnyxPoseList');
  Array.from(listEl.children).forEach((el, i) => {
    el.classList.toggle('active', i === currentPoseIndex);
  });

  const pose = filteredPoses[currentPoseIndex];
  if (!pose) return;

  const nameEl = document.getElementById('poseCurrentName');
  if (nameEl) nameEl.textContent = `Pose ${pose.id}: ${pose.name}`;

  renderCurrentPose();
  renderPartsTable(pose);
}

function stepPose(delta) {
  selectPose(currentPoseIndex + delta);
}

function toggleAnimPlay() {
  if (isAnimPlaying) {
    stopAnim();
  } else {
    startAnim();
  }
}

function startAnim() {
  isAnimPlaying = true;
  const btn = document.getElementById('btnAnimPlay');
  btn.textContent = '⏸ Pause';
  btn.classList.add('playing');
  animLastTime = performance.now();
  requestAnimationFrame(animLoop);
}

function stopAnim() {
  isAnimPlaying = false;
  const btn = document.getElementById('btnAnimPlay');
  if (btn) {
    btn.textContent = '▶ Play';
    btn.classList.remove('playing');
  }
}

function animLoop(timestamp) {
  if (!isAnimPlaying) return;
  const speed = parseInt(document.getElementById('animSpeed').value || '8', 10);
  const frameDuration = 1000 / speed;

  if (timestamp - animLastTime >= frameDuration) {
    animLastTime = timestamp;
    stepPose(1);
  }

  requestAnimationFrame(animLoop);
}

/**
 * Render the current pose to the HTML5 Canvas using authentic HAN2RBO Matrix Transform
 */
function renderCurrentPose() {
  const canvas = document.getElementById('pacnyxCanvas');
  if (!canvas || !currentCharaData) return;
  const ctx = canvas.getContext('2d');

  const pose = filteredPoses[currentPoseIndex];
  if (!pose) return;

  const zoom = parseFloat(document.getElementById('pacnyxZoom').value || '2');
  const showCrosshair = document.getElementById('showCrosshair').checked;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background subtle checker pattern
  drawChecker(ctx, canvas.width, canvas.height);

  // Character anchor center point
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.75;

  // Ground shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 40 * zoom, 12 * zoom, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw Pose BodyParts
  ctx.save();
  ctx.imageSmoothingEnabled = false;

  for (const part of pose.parts) {
    // Format: [sheetIdx, srcX, srcY, srcW, srcH, destX, destY, destW, destH, origX, origY, rot, flip, layer]
    const sheetIdx = part[0];
    const srcX = part[1];
    const srcY = part[2];
    const srcW = part[3];
    const srcH = part[4];
    const destX = part[5];
    const destY = part[6];
    const destW = part[7];
    const destH = part[8];
    const origX = part[9];
    const origY = part[10];
    const rot = part[11];
    const flip = part[12];

    const sheetImg = currentCharaData.sheets[sheetIdx];
    if (!sheetImg || !sheetImg.complete || srcW <= 0 || srcH <= 0) continue;

    ctx.save();
    // 1. Move to Canvas center anchor point
    ctx.translate(cx, cy);
    // 2. Apply viewport zoom
    ctx.scale(zoom, zoom);
    // 3. Translate to dest position + pivot origin
    ctx.translate(destX + origX, destY + origY);
    // 4. Rotate around pivot
    if (rot !== 0) {
      ctx.rotate((rot * Math.PI) / 180);
    }
    // 5. Apply Flip (1 = Horizontal, 2 = Vertical, 3 = Both)
    const scaleX = (flip & 1) ? -1 : 1;
    const scaleY = (flip & 2) ? -1 : 1;
    ctx.scale(scaleX, scaleY);
    // 6. Translate back from pivot
    ctx.translate(-origX, -origY);

    // 7. Draw sprite part
    const drawW = Math.abs(destW) || srcW;
    const drawH = Math.abs(destH) || srcH;
    ctx.drawImage(sheetImg, srcX, srcY, srcW, srcH, 0, 0, drawW, drawH);

    ctx.restore();
  }
  ctx.restore();

  // Draw Origin Crosshair
  if (showCrosshair) {
    ctx.save();
    ctx.strokeStyle = '#ff5252';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(cx - 30, cy);
    ctx.lineTo(cx + 30, cy);
    ctx.moveTo(cx, cy - 30);
    ctx.lineTo(cx, cy + 30);
    ctx.stroke();

    ctx.fillStyle = '#ff5252';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawChecker(ctx, w, h) {
  const size = 16;
  ctx.save();
  ctx.fillStyle = '#161922';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#1e2330';
  for (let y = 0; y < h; y += size) {
    for (let x = 0; x < w; x += size) {
      if (((x / size) + (y / size)) % 2 === 0) {
        ctx.fillRect(x, y, size, size);
      }
    }
  }
  ctx.restore();
}

/**
 * Render Pose BodyParts Breakdown Table
 */
function renderPartsTable(pose) {
  const table = document.getElementById('pacnyxPartsTable');
  const countBadge = document.getElementById('partsCountBadge');
  if (!table || !countBadge) return;

  const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));
  tbody.innerHTML = '';
  countBadge.textContent = `${pose.parts.length} parts`;

  pose.parts.forEach((p, idx) => {
    const [sheetIdx, srcX, srcY, srcW, srcH, destX, destY, destW, destH, origX, origY, rot, flip, layer] = p;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:#ffd54f; font-weight:bold;">${layer}</td>
      <td>Sheet ${sheetIdx}</td>
      <td style="font-family:monospace; font-size:0.8rem;">(${srcX}, ${srcY}, ${srcW}, ${srcH})</td>
      <td style="font-family:monospace; font-size:0.8rem;">(${destX}, ${destY}, ${destW}, ${destH})</td>
      <td style="font-family:monospace; font-size:0.8rem;">(${origX}, ${origY})</td>
      <td>${rot}°</td>
      <td>${flip === 1 ? 'H-Flip' : flip === 2 ? 'V-Flip' : flip === 3 ? 'Both' : 'None'}</td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Export current composited pose as transparent PNG
 */
function exportCurrentPosePng() {
  if (!currentCharaData || filteredPoses.length === 0) return;
  const pose = filteredPoses[currentPoseIndex];
  if (!pose) return;

  const off = document.createElement('canvas');
  off.width = 300;
  off.height = 300;
  const ctx = off.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const cx = off.width / 2;
  const cy = off.height * 0.8;

  for (const part of pose.parts) {
    const [sheetIdx, srcX, srcY, srcW, srcH, destX, destY, destW, destH, origX, origY, rot, flip] = part;
    const sheetImg = currentCharaData.sheets[sheetIdx];
    if (!sheetImg || !sheetImg.complete || srcW <= 0 || srcH <= 0) continue;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.translate(destX + origX, destY + origY);
    if (rot !== 0) ctx.rotate((rot * Math.PI) / 180);
    const scaleX = (flip & 1) ? -1 : 1;
    const scaleY = (flip & 2) ? -1 : 1;
    ctx.scale(scaleX, scaleY);
    ctx.translate(-origX, -origY);

    const drawW = Math.abs(destW) || srcW;
    const drawH = Math.abs(destH) || srcH;
    ctx.drawImage(sheetImg, srcX, srcY, srcW, srcH, 0, 0, drawW, drawH);
    ctx.restore();
  }

  const link = document.createElement('a');
  link.download = `${currentCharaId}_${pose.name}_#${pose.id}.png`;
  link.href = off.toDataURL('image/png');
  link.click();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

window.initStudio = initStudio;
