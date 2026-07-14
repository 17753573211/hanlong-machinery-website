# Vercel Preview deployment

This branch is isolated from the ChatGPT Sites production deployment.

## Vercel project settings

- Framework Preset: `Next.js`
- Root Directory: repository root
- Build Command: `npm run build`
- Output Directory: leave empty (Vercel uses `.next` automatically)
- Install Command: `npm ci`
- Node.js: `22.x`

## Environment variables

Add these values to the **Preview** environment:

```text
SITE_URL=https://hanlongs.com
WHATSAPP_NUMBER=12512299070
```

`SITE_URL` intentionally remains the production canonical URL so search
engines do not treat the temporary Vercel URL as a competing canonical site.

## Media

Optimized website images, videos and downloadable PDFs are versioned from
`public/media` and `public/videos`. Original source materials in `assets` stay
local and are not required by the deployment build.

Every `npm run build` starts with a resource integrity check. The build stops
instead of publishing a broken Preview if a referenced image, video or PDF is
missing from `public/`.

Do not attach `hanlongs.com` or change Cloudflare DNS during Preview testing.
