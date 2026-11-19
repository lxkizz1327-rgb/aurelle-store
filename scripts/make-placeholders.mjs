// Creates a nice placeholder .jpg for every image path mentioned in src/data/*.ts
// that does not exist yet in /public. When you upload your own photo with the SAME
// file name, this script leaves it alone. Runs automatically before every build.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const publicDir = path.join(root, "public");

const SIZES = {
  hero: [1920, 1080],
  banners: [1920, 900],
  products: [900, 1125],
  categories: [900, 1125],
  blog: [1200, 800],
  about: [1200, 1500],
  instagram: [800, 800],
};

const PALETTES = [
  ["#ebe2d6", "#cdbba7", "#8a6f58"],
  ["#e1e5dd", "#b7c2b4", "#5f705c"],
  ["#efdcd4", "#d3aea2", "#9b5b4a"],
  ["#dde1e8", "#aab6c8", "#506582"],
  ["#f0e8d2", "#d9c48f", "#8f7a35"],
  ["#e6dde8", "#bba7c2", "#6d4f78"],
];

function hash(text) {
  let h = 7;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

function svgFor(w, h, [a, b, c], seed) {
  const cx = Math.round(w * (0.28 + (seed % 5) * 0.1));
  const cy = Math.round(h * 0.38);
  const r = Math.round(Math.min(w, h) * 0.28);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" fill-opacity="0.18"/>
<circle cx="${Math.round(w - cx * 0.6)}" cy="${Math.round(h * 0.72)}" r="${Math.round(r * 0.6)}" fill="${c}" fill-opacity="0.12"/>
<rect x="${Math.round(w * 0.18)}" y="${Math.round(h * 0.62)}" width="${Math.round(w * 0.64)}" height="${Math.max(2, Math.round(h * 0.01))}" fill="${c}" fill-opacity="0.35"/>
</svg>`;
}

function collectPaths() {
  const found = new Set();
  if (!fs.existsSync(dataDir)) return found;
  const re = /["'`](\/images\/[A-Za-z0-9_\-\/.]+\.(?:jpg|jpeg))["'`]/g;
  for (const file of fs.readdirSync(dataDir)) {
    if (!file.endsWith(".ts")) continue;
    const text = fs.readFileSync(path.join(dataDir, file), "utf8");
    let m;
    while ((m = re.exec(text))) found.add(m[1]);
  }
  return found;
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch (err) {
    console.warn("[placeholders] sharp is not available, skipping:", err.message);
    return;
  }
  let created = 0;
  for (const imgPath of collectPaths()) {
    const target = path.join(publicDir, imgPath);
    if (fs.existsSync(target)) continue;
    const folder = imgPath.split("/")[2];
    const [w, h] = SIZES[folder] || [1200, 800];
    const seed = hash(imgPath);
    const svg = svgFor(w, h, PALETTES[seed % PALETTES.length], seed);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(target);
    created += 1;
  }
  console.log(`[placeholders] created ${created} placeholder image(s)`);
}

main().catch((err) => {
  console.warn("[placeholders] skipped:", err.message);
});
