/**
 * Ragnarok Battle Offline - Live PAC Explorer & Asset Studio
 */

let currentPac = '';
let pacFiles = [];

async function initStudio() {
  const pacSelect = document.getElementById('pacSelect');
  const fileSearch = document.getElementById('fileSearch');
  const fileListEl = document.getElementById('fileList');

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

    // Default select CG.PAC or SE.PAC
    if (pacs.length > 0) {
      pacSelect.value = 'SE.PAC';
      loadPac('SE.PAC');
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

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

window.initStudio = initStudio;
