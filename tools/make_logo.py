#!/usr/bin/env python3
"""Writes a small round gradient PNG logo (pure stdlib).

usage: make_logo.py <out.png> <#top> <#bottom> [size]
"""
import struct, sys, zlib


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def make_logo(out, top, bottom, size=128):
    top, bottom = hex_rgb(top), hex_rgb(bottom)
    raw = bytearray()
    cx = cy = (size - 1) / 2
    for y in range(size):
        raw.append(0)
        for x in range(size):
            t = y / (size - 1)
            r, g, b = (round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / (size / 2)
            a = 255 if d < 0.92 else max(0, round(255 * (1 - (d - 0.92) / 0.06)))  # soft round edge
            hl = max(0.0, 1 - ((x - size * 0.35) ** 2 + (y - size * 0.28) ** 2) ** 0.5 / (size * 0.35)) * 0.35
            raw += bytes((min(255, round(r + (255 - r) * hl)), min(255, round(g + (255 - g) * hl)),
                          min(255, round(b + (255 - b) * hl)), a))

    def chunk(t, d):
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)

    png = (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)) +
           chunk(b'IDAT', zlib.compress(bytes(raw), 9)) + chunk(b'IEND', b''))
    with open(out, 'wb') as f:
        f.write(png)


if __name__ == '__main__':
    make_logo(sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 128)
