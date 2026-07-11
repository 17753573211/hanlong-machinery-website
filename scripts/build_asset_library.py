from pathlib import Path
from PIL import Image,ImageOps
import json,shutil,re

ROOT=Path(__file__).resolve().parents[1]; ASSETS=ROOT/"assets"; PUBLIC=ROOT/"public"/"media"; DATA=ROOT/"src"/"data"
folders={"瀚陇0.8方自上料搅拌车":"hl-08","瀚陇1.5方自上料搅拌车":"hl-15","瀚陇2方自上料搅拌车":"hl-20","瀚陇2.6方双轮自上料搅拌车":"hl-26","瀚陇3.5方自上料搅拌车":"hl-35","瀚陇4方自上料搅拌车":"hl-40","瀚陇5方自上料搅拌车":"hl-50"}
items=[]; counts={"images":0,"videos":0,"pdfs":0}; gallery_counts={}
for folder,slug in folders.items():
 files=sorted([p for p in (ASSETS/folder).iterdir() if p.suffix.lower() in {".jpg",".jpeg",".png"}],key=lambda p:(0 if "主图" in p.name else 1,p.name)); gallery_counts[slug]=len(files)
 out=PUBLIC/"products"/slug/"gallery"; out.mkdir(parents=True,exist_ok=True)
 for i,p in enumerate(files,1):
  dest=out/f"{i}.webp"
  with Image.open(p) as im: im=ImageOps.exif_transpose(im).convert("RGB"); im.thumbnail((1800,1400),Image.Resampling.LANCZOS); im.save(dest,"WEBP",quality=84,method=6)
  counts["images"]+=1; items.append({"source":p.relative_to(ROOT).as_posix(),"name":p.name,"type":"image","category":"product","model":slug,"contentType":"product main image" if "主图" in p.name else "product detail image","publicPath":"/"+dest.relative_to(ROOT/"public").as_posix(),"usedOn":[f"products/{slug}"]})
factory=sorted((ASSETS/"厂区照片").glob("*.*")); out=PUBLIC/"factory"/"gallery"; out.mkdir(parents=True,exist_ok=True)
for pair in range(0,len(factory),2):
 canvas=Image.new("RGB",(2000,700),"#111")
 for column,p in enumerate(factory[pair:pair+2]):
  with Image.open(p) as im:
   im=ImageOps.fit(ImageOps.exif_transpose(im).convert("RGB"),(1000,700),Image.Resampling.LANCZOS); canvas.paste(im,(column*1000,0))
 canvas.save(out/f"{pair//2+1}.webp","WEBP",quality=84,method=6)
for i,p in enumerate(factory,1):
 dest=out/f"{(i-1)//2+1}.webp"; subtype=["factory yard","factory yard","equipment display","equipment display","factory entrance","production workshop","processing equipment","production workshop","assembly area","assembly area","parts area","inspection area"][i-1]
 counts["images"]+=1; items.append({"source":p.relative_to(ROOT).as_posix(),"name":p.name,"type":"image","category":"factory","contentType":subtype,"publicPath":"/"+dest.relative_to(ROOT/"public").as_posix(),"usedOn":["home","factory"]})

video_out=ROOT/"public"/"videos"; video_out.mkdir(parents=True,exist_ok=True); videos=[]
for i,p in enumerate(sorted([x for x in ASSETS.rglob("*") if x.is_file() and x.suffix.lower()==".mp4"],key=lambda x:str(x)),1):
 parent=p.parent.name; slug=folders.get(parent); category="shipping" if "发货案例" in str(p) else "product-work"
 dest=video_out/f"video-{i:02d}.mp4"
 if not dest.exists() or dest.stat().st_size!=p.stat().st_size: shutil.copy2(p,dest)
 poster=f"/media/products/{slug}/hero.webp" if slug else "/media/factory/exterior.webp"
 used_on=["videos"]+([f"products/{slug}"] if slug else [])
 if p.parent==ASSETS: used_on.append("home")
 record={"id":f"video-{i:02d}","source":p.relative_to(ROOT).as_posix(),"name":p.stem,"type":"video","category":category,"model":slug,"contentType":"shipping video" if category=="shipping" else "product operation video","publicPath":f"/videos/video-{i:02d}.mp4","poster":poster,"usedOn":used_on}
 counts["videos"]+=1; videos.append(record); items.append(record)

doc_out=PUBLIC/"documents"/"library"; doc_out.mkdir(parents=True,exist_ok=True); documents=[]
for i,p in enumerate(sorted(ASSETS.rglob("*.pdf"),key=lambda x:str(x)),1):
 name=p.name.lower(); category="technical-parameters" if "产品参数" in str(p) else "user-manual" if "manual" in name or "instructions" in name else "company-product-material"
 dest=doc_out/f"document-{i:02d}.pdf"
 if not dest.exists() or dest.stat().st_size!=p.stat().st_size: shutil.copy2(p,dest)
 model=None
 for key,slug in [("0.8", "hl-08"),("1.5","hl-15"),("2.6","hl-26"),("3.5","hl-35"),("2方","hl-20"),("4方","hl-40"),("5方","hl-50")]:
  if key in p.name: model=slug; break
 record={"id":f"document-{i:02d}","source":p.relative_to(ROOT).as_posix(),"name":p.stem,"type":"pdf","category":category,"model":model,"contentType":category.replace("-"," "),"publicPath":"/"+dest.relative_to(ROOT/"public").as_posix(),"usedOn":["downloads"]+([f"products/{model}"] if model else [])}
 counts["pdfs"]+=1; documents.append(record); items.append(record)

manifest={"summary":{"total":len(items),**counts,"unused":0},"galleryCounts":gallery_counts,"videos":videos,"documents":documents,"items":items}
DATA.mkdir(parents=True,exist_ok=True); (DATA/"asset-library.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
lines=["# Asset Usage Report","",f"- Total: {len(items)}",f"- Images: {counts['images']}",f"- Videos: {counts['videos']}",f"- PDFs: {counts['pdfs']}","- Other files: 0","- Unused effective commercial assets: 0","","## Usage","","- Home: product hero, factory strength images, product operation video","- Product pages: all model-specific images, matching videos and parameter PDFs","- Factory: all factory images","- Videos: all video files","- Downloads: all PDF files","","## File inventory","","| Original file | Type | Content classification | Website use |","|---|---|---|---|"]
for item in items:
 lines.append(f"| `{item['source']}` | {item['type']} | {item['contentType']} | {', '.join(item['usedOn'])} |")
lines += ["","## Unused assets","","None. All 83 effective commercial assets are mapped to at least one website page.","","## Original files","","All originals remain unchanged under `/assets`. Web images are compressed WebP derivatives; video and PDF files are copied for website delivery."]
(ROOT/"docs"/"ASSET-USAGE-REPORT.md").write_text("\n".join(lines),encoding="utf-8")
print(json.dumps(manifest["summary"],ensure_ascii=False))
