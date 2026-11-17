#!/usr/bin/env python3
"""Packs theme folders into installable zips and writes dist/index.json.

usage: pack.py [theme-id ...]     (no ids = every folder in themes/)

Each folder needs theme.json (id, name, version, author) at its root. Only file types Spotube accepts are packed
(theme.json, .ttf/.otf, .png, LICENSE/.txt/.md); anything else aborts so a bad package never ships.
"""
import json, os, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THEMES = os.path.join(ROOT, 'themes')
DIST = os.path.join(ROOT, 'dist')
ALLOWED = {'.json', '.ttf', '.otf', '.png', '.txt', '.md'}
NO_EXT_OK = {'LICENSE', 'LICENCE', 'NOTICE', 'README'}


def pack(folder, out):
    meta = json.load(open(os.path.join(folder, 'theme.json'), encoding='utf-8'))
    missing = [k for k in ('id', 'name', 'version', 'author') if not meta.get(k)]
    if missing:
        sys.exit(f'{folder}: theme.json is missing {", ".join(missing)}')
    if meta['id'] != os.path.basename(folder):
        sys.exit(f'{folder}: id "{meta["id"]}" must match the folder name')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(folder):
            for f in sorted(files):
                path = os.path.join(root, f)
                rel = os.path.relpath(path, folder).replace(os.sep, '/')
                if rel.startswith('.') or '/.' in rel:
                    continue
                ext = os.path.splitext(f)[1].lower()
                if ext not in ALLOWED and not (ext == '' and f in NO_EXT_OK):
                    sys.exit(f'{rel}: file type not allowed in a theme package')
                z.write(path, rel)
    return meta


def main():
    ids = sys.argv[1:] or sorted(d for d in os.listdir(THEMES) if os.path.isfile(os.path.join(THEMES, d, 'theme.json')))
    os.makedirs(DIST, exist_ok=True)
    index = []
    for tid in ids:
        out = os.path.join(DIST, f'{tid}.zip')
        meta = pack(os.path.join(THEMES, tid), out)
        index.append({k: meta.get(k) for k in ('id', 'name', 'version', 'author', 'description', 'license', 'repository', 'homepage')}
                     | {'file': f'{tid}.zip', 'sizeKb': round(os.path.getsize(out) / 1024)})
        print(f'{tid}.zip  {index[-1]["sizeKb"]} KB')
    with open(os.path.join(DIST, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2, ensure_ascii=False)
        f.write('\n')


if __name__ == '__main__':
    main()
