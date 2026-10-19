#!/usr/bin/env python3
"""يقص صور أعضاء الفريق (assets/Team Member) على الوجه بنسبة 3:4 ويحفظ الأصل في _originals/.
الاستخدام: pip install opencv-python-headless pillow && python tools/crop_faces.py"""
import cv2, pathlib, shutil
from PIL import Image, ImageOps
D = pathlib.Path(__file__).resolve().parent.parent / "assets" / "Team Member"; O = D / "_originals"; O.mkdir(exist_ok=True)
cas = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
for f in sorted(p for p in D.iterdir() if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}):
    if (O / f.name).exists(): continue
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB"); W, H = im.size
    g = cv2.cvtColor(cv2.imread(str(f)), cv2.COLOR_BGR2GRAY) if im.size == Image.open(f).size else None
    faces = []
    if g is not None:
        for sf, nb, ms in ((1.1, 6, 60), (1.05, 4, 40), (1.03, 3, 28)):
            faces = cas.detectMultiScale(g, sf, nb, minSize=(ms, ms))
            if len(faces): break
    if len(faces):
        x, y, w, h = max(faces, key=lambda r: r[2]); cx, cy = x + w / 2, y + h / 2 + h * .35; cw = min(w * 2.6, W); ch = cw * 4 / 3
        if ch > H: ch = H; cw = ch * 3 / 4
        l = max(0, min(W - cw, cx - cw / 2)); t = max(0, min(H - ch, cy - ch * .45))
        box = (int(l), int(t), int(l + cw), int(t + ch)); how = "face"
    else:
        cw = min(W, H * 3 / 4); box = (int((W - cw) / 2), 0, int((W + cw) / 2), int(cw * 4 / 3)); how = "top-center"
    shutil.copy2(f, O / f.name)
    out = im.crop(box).resize((600, 800), Image.LANCZOS); f2 = f.with_suffix(".jpg"); out.save(f2, quality=84, optimize=True)
    if f2 != f: f.unlink()
    print(f.name, how)
