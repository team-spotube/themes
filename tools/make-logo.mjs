// Writes a small round gradient PNG logo, with no dependencies (Node's zlib does the compression and CRC).
import { writeFileSync } from 'node:fs';
import { crc32, deflateSync } from 'node:zlib';

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  t.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([t, data])), 8 + data.length);
  return out;
}

/** Writes a `size` x `size` PNG: a round vertical gradient from `top` to `bottom` (#RRGGBB) with a soft highlight. */
export function makeLogo(path, top, bottom, size = 128) {
  const [t, b] = [rgb(top), rgb(bottom)];
  const c = (size - 1) / 2;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      const k = y / (size - 1);
      const base = [0, 1, 2].map((i) => Math.round(t[i] + (b[i] - t[i]) * k));
      const d = Math.hypot(x - c, y - c) / (size / 2);
      const alpha = d < 0.92 ? 255 : Math.max(0, Math.round(255 * (1 - (d - 0.92) / 0.06))); // soft round edge
      const hl = Math.max(0, 1 - Math.hypot(x - size * 0.35, y - size * 0.28) / (size * 0.35)) * 0.35;
      for (let i = 0; i < 3; i++) raw[p++] = Math.min(255, Math.round(base[i] + (255 - base[i]) * hl));
      raw[p++] = alpha;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  writeFileSync(
    path,
    Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk('IHDR', ihdr),
      chunk('IDAT', deflateSync(raw, { level: 9 })),
      chunk('IEND', Buffer.alloc(0)),
    ]),
  );
}
