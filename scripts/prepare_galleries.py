from pathlib import Path
from PIL import Image, ImageOps

ROOT=Path(__file__).resolve().parents[1]; ASSETS=ROOT/"assets"
folders={"hl-08":"瀚陇0.8方自上料搅拌车","hl-15":"瀚陇1.5方自上料搅拌车","hl-20":"瀚陇2方自上料搅拌车","hl-26":"瀚陇2.6方双轮自上料搅拌车","hl-35":"瀚陇3.5方自上料搅拌车","hl-40":"瀚陇4方自上料搅拌车","hl-50":"瀚陇5方自上料搅拌车"}
for slug,folder in folders.items():
    source=ASSETS/folder
    files=sorted([p for p in source.iterdir() if p.suffix.lower() in {".jpg",".jpeg",".png"}],key=lambda p:(0 if "主图" in p.name else 1,p.name))[:6]
    while len(files)<6: files.append(files[len(files)%max(1,len(files))])
    out=ROOT/"public"/"media"/"products"/slug/"gallery"; out.mkdir(parents=True,exist_ok=True)
    for i,path in enumerate(files,1):
        with Image.open(path) as im:
            im=ImageOps.exif_transpose(im).convert("RGB"); im.thumbnail((1800,1400),Image.Resampling.LANCZOS); im.save(out/f"{i}.webp","WEBP",quality=84,method=6)

factory=["DJI_20260109135000_0317_D.JPG","DJI_20260109140545_0337_D.JPG","DJI_20260109141244_0355_D.JPG","DJI_20260109141325_0360_D.JPG","DJI_20260109141504_0365_D.JPG","DJI_20260109141506_0366_D.JPG"]
out=ROOT/"public"/"media"/"factory"/"gallery"; out.mkdir(parents=True,exist_ok=True)
for i,name in enumerate(factory,1):
    with Image.open(ASSETS/"厂区照片"/name) as im:
        im=ImageOps.exif_transpose(im).convert("RGB"); im.thumbnail((2000,1400),Image.Resampling.LANCZOS); im.save(out/f"{i}.webp","WEBP",quality=84,method=6)
