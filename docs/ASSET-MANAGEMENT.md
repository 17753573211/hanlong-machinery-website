# Website Asset Management

## Source policy

`/assets` is the immutable source library. Files in this folder are never renamed, moved, overwritten or deleted by the website workflow.

## Logical categories

- Product photography: capacity-specific folders under `/assets/瀚陇…自上料搅拌车`
- Product details: `/assets/细节图片`
- Factory and production: `/assets/厂区照片`
- Videos: MP4 files in the root and model folders
- Technical documents: PDF files in the root and HL-0.8 folder
- Customer cases: no independently verifiable customer-jobsite folder was found

## Published media

Curated, website-facing copies live under `/public/media`:

```text
public/media/
├── products/hl-08 ... hl-50/
├── factory/
├── videos/
└── documents/
```

These files are copies. The source files remain unchanged. Large raw videos and large PDFs stay cataloged in `src/data/asset-manifest.json` until web compression or explicit publication is approved.

## Data files

- `src/data/asset-manifest.json`: full machine-readable inventory
- `src/data/products.ts`: website product list and parameter tables
- `src/data/site-content.ts`: factory content and SEO keyword groups
- `scripts/analyze_assets.py`: repeatable inventory and contact-sheet generator

## Publishing rules

1. Select a source asset from the manifest.
2. Create a web copy; do not edit the source.
3. Use lowercase ASCII filenames.
4. Optimize photos to WebP/AVIF before final production publishing.
5. Keep videos poster-first and click-to-load.
6. Mark unverified specifications as `review` until a model-specific configuration sheet confirms them.
