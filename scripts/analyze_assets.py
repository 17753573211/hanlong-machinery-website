from __future__ import annotations
import json, re, subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
TMP = ROOT / "tmp" / "asset-review"
PDFTMP = ROOT / "tmp" / "pdfs"
DATA = ROOT / "src" / "data"
for p in (TMP, PDFTMP, DATA): p.mkdir(parents=True, exist_ok=True)

image_ext = {".jpg", ".jpeg", ".png", ".webp"}
video_ext = {".mp4", ".mov", ".avi", ".mkv"}
items = []

def model_from_path(path: Path):
    s = str(path)
    m = re.search(r"(?:HL|瀚陇)(0\.8|1\.5|2\.6|2|3\.5|4|5)(?:立方|方)", s, re.I)
    return f"HL-{m.group(1)}" if m else None

def classify(path: Path):
    s = str(path)
    if path.suffix.lower() in video_ext: return "videos"
    if path.suffix.lower() == ".pdf": return "technical-documents"
    if "厂区照片" in s: return "factory"
    if "细节图片" in s: return "product-details"
    if any(k in s.lower() for k in ("case", "客户", "施工", "交付")): return "customer-cases"
    return "products"

for path in sorted(ASSETS.rglob("*")):
    if not path.is_file(): continue
    rel = path.relative_to(ROOT).as_posix()
    entry = {"source": rel, "filename": path.name, "extension": path.suffix.lower(), "bytes": path.stat().st_size, "category": classify(path), "model": model_from_path(path)}
    if path.suffix.lower() in image_ext:
        try:
            with Image.open(path) as im: entry.update({"width": im.width, "height": im.height, "orientation": "landscape" if im.width > im.height else "portrait" if im.height > im.width else "square"})
        except Exception as e: entry["error"] = str(e)
    elif path.suffix.lower() == ".pdf":
        try:
            reader = PdfReader(str(path)); entry["pages"] = len(reader.pages)
            text = "\n".join((p.extract_text() or "") for p in reader.pages)
            (PDFTMP / f"{path.stem}.txt").write_text(text, encoding="utf-8")
            entry["extracted_text"] = f"tmp/pdfs/{path.stem}.txt"
        except Exception as e: entry["error"] = str(e)
    elif path.suffix.lower() in video_ext:
        try:
            cmd = ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", str(path)]
            out = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore", timeout=30)
            if out.returncode == 0:
                meta = json.loads(out.stdout); fmt = meta.get("format", {}); stream = next((x for x in meta.get("streams", []) if x.get("codec_type") == "video"), {})
                entry.update({"duration_seconds": round(float(fmt.get("duration", 0)), 2), "width": stream.get("width"), "height": stream.get("height"), "codec": stream.get("codec_name")})
        except Exception as e: entry["error"] = str(e)
    items.append(entry)

(DATA / "asset-manifest.json").write_text(json.dumps({"generated_from": "assets (originals unchanged)", "count": len(items), "items": items}, ensure_ascii=False, indent=2), encoding="utf-8")

groups = {}
for x in items:
    if x["extension"] in image_ext: groups.setdefault(x["category"] + "-" + (x["model"] or "general"), []).append(x)
font = ImageFont.load_default()
for name, group in groups.items():
    for batch_no in range(0, len(group), 24):
        batch = group[batch_no:batch_no+24]; thumb_w, thumb_h = 260, 190
        sheet = Image.new("RGB", (thumb_w*4, thumb_h*6), "#e8e8e8"); draw = ImageDraw.Draw(sheet)
        for idx, item in enumerate(batch):
            source = ROOT / item["source"]
            try:
                with Image.open(source) as im:
                    im.thumbnail((thumb_w-10, thumb_h-35)); x=(idx%4)*thumb_w+(thumb_w-im.width)//2; y=(idx//4)*thumb_h+5; sheet.paste(im.convert("RGB"),(x,y))
                label = Path(item["source"]).name[:34]
                draw.text(((idx%4)*thumb_w+5,(idx//4)*thumb_h+thumb_h-25),label,fill="#111",font=font)
            except Exception: pass
        sheet.save(TMP / f"{name}-{batch_no//24+1}.jpg", quality=88)

summary = {}
for x in items: summary[x["category"]] = summary.get(x["category"], 0) + 1
print(json.dumps({"total": len(items), "categories": summary, "contact_sheets": [p.name for p in TMP.glob("*.jpg")]}, ensure_ascii=False, indent=2))
