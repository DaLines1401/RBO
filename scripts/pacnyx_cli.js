/**
 * PacNyx Sprite & PAC Extraction CLI (Node.js Port of PacNyx / PacNyx+)
 * 
 * Accurately extracts RBO .PAC archives and parses .DAT (HAN2RBO) character files,
 * including 16 ARGB color palettes, 512x512 texture sheets, 1000 Poses,
 * 40 BodyParts per pose, DestRects, SrcRects, Origins, Rotations, and Z-layers.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// --- Lossless PNG Encoder ---
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA color type

  function chunk(type, data) {
    const b = Buffer.alloc(12 + data.length);
    b.writeUInt32BE(data.length, 0);
    b.write(type, 4, 4, 'ascii');
    data.copy(b, 8);
    b.writeUInt32BE(crc32(b.subarray(4, 8 + data.length)), 8 + data.length);
    return b;
  }

  const scanlines = Buffer.alloc(height * (1 + width * 4));
  let src = 0, dst = 0, row = width * 4;
  for (let y = 0; y < height; y++) {
    scanlines[dst++] = 0; // Filter: None
    rgbaBuffer.copy(scanlines, dst, src, src + row);
    dst += row;
    src += row;
  }

  const idatData = zlib.deflateSync(scanlines, { level: 9 });
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idatData),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// --- PAC Archive Parser ---
class PACArchive {
  static open(pacPath) {
    if (!fs.existsSync(pacPath)) throw new Error(`PAC not found: ${pacPath}`);
    const fd = fs.openSync(pacPath, 'r');
    const header = Buffer.alloc(8);
    fs.readSync(fd, header, 0, 8, 0);

    const version = header.readUInt32LE(0);
    if (version < 1 || version > 10) {
      fs.closeSync(fd);
      throw new Error(`Invalid PAC version: ${version} in ${pacPath}`);
    }

    const fileCount = (header.readUInt32LE(4) ^ 0xe3df59ac) >>> 0;
    const tableBuf = Buffer.alloc(fileCount * 68);
    fs.readSync(fd, tableBuf, 0, tableBuf.length, 8);

    const files = [];
    for (let i = 0; i < fileCount; i++) {
      const entry = tableBuf.slice(i * 68, (i + 1) * 68);
      const nameBuf = Buffer.alloc(59);
      for (let k = 0; k < 59; k++) {
        nameBuf[k] = entry[k] ^ (((i * k * 3) + 0x3d) & 0xff);
      }
      const zeroIdx = nameBuf.indexOf(0);
      const name = nameBuf.slice(0, zeroIdx === -1 ? 59 : zeroIdx).toString('ascii');
      const offset = entry.readUInt32LE(0x3c);
      const size = (entry.readUInt32LE(0x40) ^ 0xe3df59ac) >>> 0;
      files.push({ name, offset, size, index: i });
    }

    return new PACArchive(fd, pacPath, files);
  }

  constructor(fd, pacPath, files) {
    this.fd = fd;
    this.pacPath = pacPath;
    this.files = files;
  }

  readFile(fileName) {
    const entry = this.files.find(f => f.name.toUpperCase() === fileName.toUpperCase());
    if (!entry) return null;
    const buf = Buffer.alloc(entry.size);
    fs.readSync(this.fd, buf, 0, entry.size, entry.offset);
    return buf;
  }

  close() {
    if (this.fd) {
      fs.closeSync(this.fd);
      this.fd = null;
    }
  }
}

// --- DAT (HAN2RBO) Parser ---
class DATParser {
  static parse(datBuf) {
    // 1. Signature check: "HAN2RBO "
    const sig = datBuf.slice(0, 8).toString('ascii');
    if (sig !== 'HAN2RBO ') {
      throw new Error(`Invalid DAT signature: ${sig}`);
    }

    const divisionsOffset = datBuf.readInt32LE(0x20);
    const divisionsSize = datBuf.readInt32LE(0x24);
    const charStructOffset = datBuf.readInt32LE(0x28);
    const charStructSize = datBuf.readInt32LE(0x2c);
    const cutStart = datBuf.readInt32LE(0x30); // BMP Cutter3 offset
    const cutSize = datBuf.readInt32LE(0x34);
    const pixelStart = datBuf.readInt32LE(0x34);
    const pixelEnd = datBuf.readInt32LE(0x38);

    // 2. Extract Palettes
    // 16 palettes, each 256 colors ARGB (4 bytes per color)
    const palettes = [];
    const palStart = cutStart + 20;
    for (let p = 0; p < 16; p++) {
      const pal = [];
      const base = palStart + p * 1024;
      for (let c = 0; c < 256; c++) {
        const off = base + c * 4;
        const b = datBuf[off];
        const g = datBuf[off + 1];
        const r = datBuf[off + 2];
        const a = (c === 0 || (r === 0 && g === 255 && b === 0)) ? 0 : 255;
        pal.push({ r, g, b, a });
      }
      palettes.push(pal);
    }

    // 3. Extract 512x512 Texture Sheets
    const sheetSize = 512 * 512;
    const numSheets = Math.min(18, Math.max(1, Math.floor((pixelEnd - pixelStart) / sheetSize)));
    const sheetsRGBA = [];

    const activePal = palettes[0] || [];
    for (let s = 0; s < numSheets; s++) {
      const sStart = pixelStart + s * sheetSize;
      const rgba = Buffer.alloc(512 * 512 * 4);
      let dst = 0;
      for (let i = 0; i < sheetSize; i++) {
        const idx = datBuf[sStart + i];
        const col = activePal[idx] || { r: 0, g: 0, b: 0, a: 0 };
        rgba[dst++] = col.r;
        rgba[dst++] = col.g;
        rgba[dst++] = col.b;
        rgba[dst++] = col.a;
      }
      sheetsRGBA.push({ index: s, rgba, width: 512, height: 512 });
    }

    // 4. Parse Poses & BodyParts
    const maxPoses = 1000;
    const maxBodyParts = 40;
    const poses = [];
    const textDecoder = new TextDecoder('shift-jis');

    if (charStructSize > 0 && charStructOffset > 0) {
      let ptr = charStructOffset + 24;
      const poseOffsets = [];
      for (let i = 0; i < maxPoses; i++) {
        poseOffsets.push(datBuf.readInt32LE(ptr));
        ptr += 4;
      }

      const poseNames = [];
      for (let i = 0; i < maxPoses; i++) {
        const rawName = datBuf.slice(ptr, ptr + 32);
        const zeroIdx = rawName.indexOf(0);
        const nameBytes = rawName.slice(0, zeroIdx === -1 ? 32 : zeroIdx);
        let name = '';
        try { name = textDecoder.decode(nameBytes); } catch(e) { name = `POSE_${i}`; }
        poseNames.push(name.trim());
        ptr += 32;
      }

      // Read each pose
      for (let i = 0; i < maxPoses; i++) {
        if (poseOffsets[i] === 0) continue;
        const poseName = poseNames[i] || `POSE_${i}`;
        const parts = [];

        for (let b = 0; b < maxBodyParts; b++) {
          const xTranslation = datBuf.readInt32LE(ptr);
          const yTranslation = datBuf.readInt32LE(ptr + 4);
          const xScalePop = datBuf.readInt32LE(ptr + 8);
          const yScalePop = datBuf.readInt32LE(ptr + 12);
          const flip = datBuf.readInt32LE(ptr + 16);
          const xScale = datBuf.readInt32LE(ptr + 20);
          const yScale = datBuf.readInt32LE(ptr + 24);
          const rotation = (datBuf.readInt32LE(ptr + 28) / 10000) * 360;
          const alpha = datBuf.readInt32LE(ptr + 32);
          const hueABGR = datBuf.readInt32LE(ptr + 36);
          const imageIndex = datBuf.readInt32LE(ptr + 40);
          const imageXPosHalf = datBuf.readInt32LE(ptr + 44);
          const imageYPosHalf = datBuf.readInt32LE(ptr + 48);
          const imageWidthHalf = datBuf.readInt32LE(ptr + 52);
          const imageHeightHalf = datBuf.readInt32LE(ptr + 56);
          const layer = datBuf.readInt32LE(ptr + 60);
          const xOrigin = datBuf.readInt32LE(ptr + 64);
          const yOrigin = datBuf.readInt32LE(ptr + 68);

          ptr += 92; // 92 bytes per BodyPart

          // Valid body part check (non-zero width & height)
          if (imageWidthHalf > 0 && imageHeightHalf > 0 && imageIndex >= 0) {
            parts.push({
              imageIndex,
              srcRect: {
                x: Math.round(imageXPosHalf * 2),
                y: Math.round(imageYPosHalf * 2),
                w: Math.round(imageWidthHalf * 2),
                h: Math.round(imageHeightHalf * 2)
              },
              destRect: {
                x: xTranslation,
                y: yTranslation,
                w: xScalePop,
                h: yScalePop
              },
              origin: { x: xOrigin, y: yOrigin },
              rotation,
              flip,
              layer
            });
          }
        }

        // Sort by layer Z-index ascending
        parts.sort((a, b) => a.layer - b.layer);

        if (parts.length > 0) {
          poses.push({
            id: i,
            name: poseName,
            parts
          });
        }
      }
    }

    return {
      numSheets,
      sheetsRGBA,
      palettes,
      poses
    };
  }
}

// --- CLI Runner ---
async function run() {
  const args = process.argv.slice(2);
  const pacPath = args[0] || 'DATA/DATA02.PAC';
  const outDir = args[1] || 'web/assets/characters';

  console.log('====================================================');
  console.log('   PacNyx Sprite Extraction Pipeline (Node.js)     ');
  console.log('====================================================');
  console.log(`PAC Archive: ${pacPath}`);
  console.log(`Output Directory: ${outDir}`);

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pac = PACArchive.open(pacPath);
  console.log(`PAC Opened successfully. Total internal files: ${pac.files.length}`);

  // Playable Roster List
  const characters = [
    { id: 'SWD_M', dat: 'SWORDMAN_M.DAT', name: 'Swordman (ชาย)', class: 'SWORDMAN', gender: 'M', hp: 1350, sp: 220 },
    { id: 'SWD_F', dat: 'SWORDMAN_F.DAT', name: 'Swordman (หญิง)', class: 'SWORDMAN', gender: 'F', hp: 1250, sp: 240 },
    { id: 'ACO_M', dat: 'ACOLYTE_M.DAT', name: 'Acolyte (ชาย)', class: 'ACOLYTE', gender: 'M', hp: 1150, sp: 340 },
    { id: 'ACO_F', dat: 'ACOLYTE_F.DAT', name: 'Acolyte (หญิง)', class: 'ACOLYTE', gender: 'F', hp: 1100, sp: 380 },
    { id: 'ARC_M', dat: 'ARCHER_M.DAT', name: 'Archer (ชาย)', class: 'ARCHER', gender: 'M', hp: 1100, sp: 280 },
    { id: 'ARC_F', dat: 'ARCHER_F.DAT', name: 'Archer (หญิง)', class: 'ARCHER', gender: 'F', hp: 1050, sp: 300 },
    { id: 'MAG_M', dat: 'MAGICIAN_M.DAT', name: 'Magician (ชาย)', class: 'MAGICIAN', gender: 'M', hp: 950, sp: 450 },
    { id: 'MAG_F', dat: 'MAGICIAN_F.DAT', name: 'Magician (หญิง)', class: 'MAGICIAN', gender: 'F', hp: 900, sp: 480 },
    { id: 'THF_M', dat: 'THIEF_M.DAT', name: 'Thief (ชาย)', class: 'THIEF', gender: 'M', hp: 1180, sp: 230 },
    { id: 'THF_F', dat: 'THIEF_F.DAT', name: 'Thief (หญิง)', class: 'THIEF', gender: 'F', hp: 1120, sp: 250 },
    { id: 'MRC_M', dat: 'MERCHANT_M.DAT', name: 'Merchant (ชาย)', class: 'MERCHANT', gender: 'M', hp: 1300, sp: 260 },
    { id: 'MRC_F', dat: 'MERCHANT_F.DAT', name: 'Merchant (หญิง)', class: 'MERCHANT', gender: 'F', hp: 1240, sp: 270 },
    { id: 'NOV_M', dat: 'NOVICE_M.DAT', name: 'Novice (ชาย)', class: 'NOVICE', gender: 'M', hp: 1000, sp: 200 },
    { id: 'NOV_F', dat: 'NOVICE_F.DAT', name: 'Novice (หญิง)', class: 'NOVICE', gender: 'F', hp: 950, sp: 210 }
  ];

  const manifest = { characters: {} };

  for (const char of characters) {
    console.log(`\nProcessing ${char.id} (${char.dat})...`);
    const datBuf = pac.readFile(char.dat);
    if (!datBuf) {
      console.warn(`  ⚠️ ${char.dat} not found in PAC archive! Skipping.`);
      continue;
    }

    const parsed = DATParser.parse(datBuf);
    console.log(`  ✔ Parsed HAN2RBO DAT: ${parsed.numSheets} sheets, ${parsed.poses.length} poses`);

    // Save key texture sheets (Sheets 0, 1, 2)
    const sheetsExported = [];
    const numToExport = Math.min(3, parsed.numSheets);
    for (let s = 0; s < numToExport; s++) {
      const sheetName = `${char.id.toLowerCase()}_sheet_${s}.png`;
      const sheetPath = path.join(outDir, sheetName);
      const pngBuf = encodePNG(512, 512, parsed.sheetsRGBA[s].rgba);
      fs.writeFileSync(sheetPath, pngBuf);
      sheetsExported.push(`assets/characters/${sheetName}`);
      console.log(`    ✔ Saved ${sheetName} (${(pngBuf.length / 1024).toFixed(1)} KB)`);
    }

    // Save Poses JSON metadata for Web Studio Inspector & Engine (Ultra-compact format)
    const compactPoses = parsed.poses.map(p => ({
      id: p.id,
      name: p.name,
      parts: p.parts.map(pt => [
        pt.imageIndex,
        pt.srcRect.x, pt.srcRect.y, pt.srcRect.w, pt.srcRect.h,
        pt.destRect.x, pt.destRect.y, pt.destRect.w, pt.destRect.h,
        pt.origin.x, pt.origin.y,
        Math.round(pt.rotation),
        pt.flip,
        pt.layer
      ])
    }));
    const posesJsonName = `${char.id.toLowerCase()}_poses.json`;
    const posesJsonPath = path.join(outDir, posesJsonName);
    fs.writeFileSync(posesJsonPath, JSON.stringify(compactPoses), 'utf8');
    console.log(`    ✔ Saved ${posesJsonName} (${compactPoses.length} poses, ${(fs.statSync(posesJsonPath).size / 1024).toFixed(1)} KB)`);

    // Add to manifest
    manifest.characters[char.id] = {
      id: char.id,
      class: char.class,
      gender: char.gender,
      name: char.name,
      baseHp: char.hp,
      baseSp: char.sp,
      sheets: sheetsExported,
      posesData: `assets/characters/${posesJsonName}`,
      poseCount: parsed.poses.length
    };
  }

  // Save updated master manifest.json
  const manifestPath = path.join(outDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n✔ Master manifest saved to: ${manifestPath}`);

  pac.close();
  console.log('\n🎉 ALL PACNYX ASSET EXTRACTIONS COMPLETED SUCCESSFULLY! 🎉');
}

if (require.main === module) {
  run().catch(err => {
    console.error('Extraction failed:', err);
    process.exit(1);
  });
}

module.exports = { PACArchive, DATParser, encodePNG };
