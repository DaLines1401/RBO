/**
 * Ragnarok Battle Offline (RBO) - PacNyx Sprite & Pose Extraction Tool
 * Reverse-Engineered from PacNyx / PacNyx+ official C# source code
 * Extracts authentic 32-bit ARGB character texture sheets and poses from DATA02.PAC
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// --- Pure Node.js Lossless PNG Encoder ---
function encodePNG(width, height, rgbaBuffer) {
  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const body = Buffer.concat([typeBuf, data]);

    let crc = 0xffffffff;
    for (let i = 0; i < body.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ body[i]) & 0xff];
    }
    crc = (crc ^ 0xffffffff) >>> 0;
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[i] = c >>> 0;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth: 8
  ihdr[9] = 6;  // color type: RGBA (6)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const rowSize = width * 4;
  const scanlines = Buffer.alloc(height * (rowSize + 1));
  let src = 0, dst = 0;
  for (let y = 0; y < height; y++) {
    scanlines[dst++] = 0; // Filter: None
    rgbaBuffer.copy(scanlines, dst, src, src + rowSize);
    dst += rowSize;
    src += rowSize;
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
    const file = this.files.find(f => f.name.toUpperCase() === fileName.toUpperCase());
    if (!file) return null;
    const buf = Buffer.alloc(file.size);
    fs.readSync(this.fd, buf, 0, file.size, file.offset);
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

    const charStructOffset = datBuf.readInt32LE(0x28);
    const charStructSize = datBuf.readInt32LE(0x2c);

    if (charStructSize <= 0 || charStructOffset <= 0) {
      throw new Error('Empty or invalid character struct in DAT');
    }

    const maxPoses = 1000;
    const maxBodyParts = 40;
    const poses = [];
    const textDecoder = new TextDecoder('shift-jis');

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

    // 4-byte CharImageDataOffset (as in PacNyx DAT.cs line 128)
    const charImageDataOffset = datBuf.readInt32LE(ptr);
    ptr += 4;

    // 2. Read each pose
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

        ptr += 92; // 72 bytes fields + 20 bytes Unknown[0..4]

        // Valid body part check
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

    // 3. Extract True 32-bit ARGB Texture Sheets (CharImageDatas)
    ptr += 28; // Unknown20
    let numImages = 0;
    for (let i = 0; i < 50; i++) {
      if (datBuf.readInt32LE(ptr) !== 0) numImages++;
      ptr += 4;
    }

    const charImageFilenames = [];
    for (let i = 0; i < 50; i++) {
      const raw = datBuf.slice(ptr, ptr + 64);
      const zeroIdx = raw.indexOf(0);
      charImageFilenames.push(raw.slice(0, zeroIdx === -1 ? 64 : zeroIdx).toString('ascii').trim());
      ptr += 64;
    }

    const charImageResolutions = [];
    for (let i = 0; i < 50; i++) {
      charImageResolutions.push(datBuf.readInt32LE(ptr));
      ptr += 4;
    }

    ptr += 8196; // Unknown padding before image datas

    const sheetsRGBA = [];
    for (let s = 0; s < numImages; s++) {
      const res = charImageResolutions[s];
      const byteLen = res * res * 4;
      const rawBytes = datBuf.slice(ptr, ptr + byteLen);
      ptr += byteLen;

      // Little-endian 32-bit ARGB in DAT is stored as BGRA bytes
      const rgba = Buffer.alloc(byteLen);
      for (let p = 0; p < res * res; p++) {
        const off = p * 4;
        rgba[off] = rawBytes[off + 2];     // R
        rgba[off + 1] = rawBytes[off + 1]; // G
        rgba[off + 2] = rawBytes[off];     // B
        rgba[off + 3] = rawBytes[off + 3]; // A
      }

      sheetsRGBA.push({
        index: s,
        name: charImageFilenames[s] || `sheet_${s}.bmp`,
        width: res,
        height: res,
        rgba
      });
    }

    return {
      numSheets: sheetsRGBA.length,
      sheetsRGBA,
      poses
    };
  }
}

// --- Main Extraction Orchestration ---
function runExtraction() {
  const pacPath = path.resolve('DATA/DATA02.PAC');
  const outDir = path.resolve('web/assets/characters');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Opening ${pacPath}...`);
  const pac = PACArchive.open(pacPath);
  console.log(`PAC loaded successfully: ${pac.files.length} internal files found.`);

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

    // Save all texture sheets
    const sheetsExported = [];
    const numToExport = parsed.sheetsRGBA.length;
    for (let s = 0; s < numToExport; s++) {
      const sheet = parsed.sheetsRGBA[s];
      const sheetName = `${char.id.toLowerCase()}_sheet_${s}.png`;
      const sheetPath = path.join(outDir, sheetName);
      const pngBuf = encodePNG(sheet.width, sheet.height, sheet.rgba);
      fs.writeFileSync(sheetPath, pngBuf);
      sheetsExported.push(`assets/characters/${sheetName}`);
      console.log(`    ✔ Saved ${sheetName} (${sheet.width}x${sheet.height}, ${(pngBuf.length / 1024).toFixed(1)} KB)`);
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
      poseCount: compactPoses.length
    };
  }

  // Save manifest.json
  const manifestPath = path.join(outDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n🎉 All 14 characters processed! Manifest written to ${manifestPath}`);

  pac.close();
}

if (require.main === module) {
  runExtraction();
}

module.exports = { PACArchive, DATParser, encodePNG };
