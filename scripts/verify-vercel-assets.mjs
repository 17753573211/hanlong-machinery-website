import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicRoot = join(root, "public");
const sourceRoots = ["app", "components", "lib", "src"];
const sourceExtensions = /\.(?:css|json|ts|tsx)$/i;
const assetExtensions = /\.(?:avif|gif|jpe?g|mp4|pdf|png|svg|webm|webp)$/i;
const references = new Set();

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

for (const sourceRoot of sourceRoots) {
  for (const file of await walk(join(root, sourceRoot))) {
    if (!sourceExtensions.test(file)) continue;
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(/(?:["']|url\(["']?)(\/[^"')\s?#]+\.(?:avif|gif|jpe?g|mp4|pdf|png|svg|webm|webp))/gi)) {
      references.add(match[1]);
    }
  }
}

const deploymentFiles = [
  ...await walk(join(publicRoot, "media")),
  ...await walk(join(publicRoot, "videos")),
];

const missing = [];
for (const reference of references) {
  if (!assetExtensions.test(reference)) continue;
  try {
    const file = join(publicRoot, reference.slice(1));
    if (!(await stat(file)).isFile()) missing.push(reference);
  } catch {
    missing.push(reference);
  }
}

if (missing.length) {
  console.error(`Missing public assets:\n${missing.sort().join("\n")}`);
  process.exit(1);
}

if (deploymentFiles.length < 100) {
  console.error(`Expected the complete media library, found only ${deploymentFiles.length} files.`);
  process.exit(1);
}

const bytes = (await Promise.all(deploymentFiles.map(async file => (await stat(file)).size))).reduce((a, b) => a + b, 0);
console.log(`Verified ${references.size} referenced assets and ${deploymentFiles.length} deployment media files (${(bytes / 1024 / 1024).toFixed(2)} MB).`);
