const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crcVal = crc32(chunk.subarray(4, 8 + len));
    chunk.writeUInt32BE(crcVal, 8 + len);
    return chunk;
  }

  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const scanlines = Buffer.alloc(height * (1 + width * 4));
  let srcOffset = 0;
  let dstOffset = 0;
  const rowBytes = width * 4;
  for (let y = 0; y < height; y++) {
    scanlines[dstOffset++] = 0;
    rgbaBuffer.copy(scanlines, dstOffset, srcOffset, srcOffset + rowBytes);
    dstOffset += rowBytes;
    srcOffset += rowBytes;
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function convertBmpToPng(bmpPath, pngPath) {
  const buf = fs.readFileSync(bmpPath);
  if (buf.toString('ascii', 0, 2) !== 'BM') return false;
  const pixelOffset = buf.readUInt32LE(10);
  const width = buf.readInt32LE(18);
  const height = buf.readInt32LE(22);
  const bpp = buf.readUInt16LE(28);

  const absHeight = Math.abs(height);
  const isTopDown = height < 0;

  const rgba = Buffer.alloc(width * absHeight * 4);
  const rowBytes = width * 4;

  if (bpp === 32) {
    for (let y = 0; y < absHeight; y++) {
      const srcY = isTopDown ? y : (absHeight - 1 - y);
      const srcRow = pixelOffset + srcY * rowBytes;
      const dstRow = y * rowBytes;
      for (let x = 0; x < width; x++) {
        const si = srcRow + x * 4;
        const di = dstRow + x * 4;
        const b = buf[si];
        const g = buf[si + 1];
        const r = buf[si + 2];
        let a = buf[si + 3];
        // Green screen color key if alpha is 255 but color is pure bright green
        if (r === 0 && g === 255 && b === 0) a = 0;
        rgba[di] = r;
        rgba[di + 1] = g;
        rgba[di + 2] = b;
        rgba[di + 3] = a;
      }
    }
  } else if (bpp === 24) {
    const srcRowBytes = Math.ceil((width * 3) / 4) * 4;
    for (let y = 0; y < absHeight; y++) {
      const srcY = isTopDown ? y : (absHeight - 1 - y);
      const srcRow = pixelOffset + srcY * srcRowBytes;
      const dstRow = y * rowBytes;
      for (let x = 0; x < width; x++) {
        const si = srcRow + x * 3;
        const di = dstRow + x * 4;
        const b = buf[si];
        const g = buf[si + 1];
        const r = buf[si + 2];
        const isGreen = (r === 0 && g === 255 && b === 0);
        rgba[di] = r;
        rgba[di + 1] = g;
        rgba[di + 2] = b;
        rgba[di + 3] = isGreen ? 0 : 255;
      }
    }
  }

  const png = encodePNG(width, absHeight, rgba);
  fs.writeFileSync(pngPath, png);
  return { origSize: buf.length, newSize: png.length };
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      processDirectory(full);
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.bmp')) {
      const pngPath = full.substring(0, full.length - 4) + '.png';
      try {
        const res = convertBmpToPng(full, pngPath);
        if (res) {
          const ratio = ((1 - res.newSize / res.origSize) * 100).toFixed(1);
          console.log(`Converted: ${ent.name} -> ${(res.newSize/1024).toFixed(1)} KB (Saved ${ratio}%)`);
        }
      } catch (err) {
        console.error(`Failed ${full}:`, err.message);
      }
    }
  }
}

console.log('Optimizing web/assets BMP -> Lossless PNG...');
processDirectory(path.join(__dirname, '..', 'web', 'assets'));
console.log('Asset optimization complete!');
