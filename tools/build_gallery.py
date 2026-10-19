#!/usr/bin/env python3
"""يبني gallery.json من فولدرات assets/events/<id>/ ويصغّر الصور الكبيرة (الأصل 3-10MB من الموبايل).
الاستخدام:  python tools/build_gallery.py      (محتاج: pip install pillow)
كل فولدر داخل assets/events/ = فعالية. اسم الفولدر لازم يطابق id الفعالية في config.js.\nصورة باسم cover (أي امتداد) = غلاف الكارت من بره، والباقي = صور المعرض."""
import json, pathlib
from PIL import Image, ImageOps
ROOT = pathlib.Path(__file__).resolve().parent.parent
EV = ROOT / "assets" / "events"; EXT = {".jpg", ".jpeg", ".png", ".webp"}; MAXSIDE = 1600
out = {}
for d in sorted(p for p in EV.glob("*") if p.is_dir()):
    files, cover = [], None
    for f in sorted((p for p in d.iterdir() if p.suffix.lower() in EXT), key=lambda p: p.name.lower()):
        if f.stat().st_size > 450_000 or max(Image.open(f).size) > MAXSIDE:
            im = ImageOps.exif_transpose(Image.open(f)).convert("RGB"); im.thumbnail((MAXSIDE, MAXSIDE))
            f2 = f.with_suffix(".jpg"); im.save(f2, quality=82, optimize=True)
            if f2 != f: f.unlink()
            f = f2
        if f.stem.lower() == "cover": cover = f.name
        else: files.append(f.name)
    out[d.name] = {"cover": cover, "photos": sorted(set(files), key=str.lower)}
TEAM = ROOT / "assets" / "Team Member"
if TEAM.is_dir():
    tf = []
    for f in sorted((p for p in TEAM.iterdir() if p.suffix.lower() in EXT), key=lambda p: p.name):
        if f.stat().st_size > 350_000 or max(Image.open(f).size) > 1100:
            im = ImageOps.exif_transpose(Image.open(f)).convert("RGB"); im.thumbnail((1100, 1100))
            f2 = f.with_suffix(".jpg"); im.save(f2, quality=82, optimize=True)
            if f2 != f: f.unlink()
            f = f2
        tf.append(f.name)
    out["team"] = {"folder": "assets/Team Member", "files": sorted(set(tf))}
(ROOT / "gallery.json").write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print({k: ((v['cover'], len(v['photos'])) if 'photos' in v else len(v['files'])) for k, v in out.items()})
