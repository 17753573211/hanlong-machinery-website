from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
targets = [ROOT / "public/images/hero-mixer.png", *list((ROOT / "public/media/products").glob("*/hero.*")), *list((ROOT / "public/media/factory").glob("*.jpg"))]
for source in targets:
    if source.suffix.lower() == ".webp" or not source.exists():
        continue
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((2200, 1600), Image.Resampling.LANCZOS)
        image.save(source.with_suffix(".webp"), "WEBP", quality=82, method=6)
        print(f"{source.relative_to(ROOT)} -> {source.with_suffix('.webp').relative_to(ROOT)}")
