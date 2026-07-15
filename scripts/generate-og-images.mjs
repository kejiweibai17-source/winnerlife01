// One-off script: generate optimized 1200x630 OG/social preview images
// from existing source images WITHOUT touching the originals (design-safe).
// Run: node scripts/generate-og-images.mjs
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/og");

const SOURCES = {
  home: "public/images/index/運河.png",
  concept: "public/images/concept/001.png",
  amenities: "public/images/amenities/001.png",
  location: "public/images/location/location-01.png",
  transportation: "public/images/index/wall/交通連結.png",
  architecture: "public/images/architecture/sk-building-02.jpg",
  summary: "public/images/summary/物件概要01.png",
  interior: "public/images/index/wall/共用空間.png",
  equipment: "public/images/index/wall/設備與家電.png",
  story: "public/images/story/news1-1280x850.png",
  "equipment-toilet": "public/images/equipment/toilet/toilet-07.jpeg",
  "equipment-bathroom": "public/images/equipment/bathroom/nasluck-02.jpg",
  "equipment-kitchen": "public/images/equipment/kitchen/riviere-12.jpg",
  "equipment-security": "public/images/equipment/security/alsok-main-08.jpg",
  landing: "public/images/landing-page/質感生活圈.png",
};

const WIDTH = 1200;
const HEIGHT = 630;

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [key, relSrc] of Object.entries(SOURCES)) {
    const srcPath = path.join(ROOT, relSrc);
    const outPath = path.join(OUT_DIR, `${key}.jpg`);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[skip] missing source: ${relSrc}`);
      continue;
    }
    await sharp(srcPath)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outPath);

    const stat = fs.statSync(outPath);
    console.log(`[ok] ${key}.jpg  ${(stat.size / 1024).toFixed(0)}KB`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
