import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- VIETSCAPE MODELS FOUNDATION AUDIT ---');

let failureCount = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failureCount++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Check Model Assets in both public/models and src/assets/models
const requiredImages = [
  'chua-mot-cot-front.png',
  'chua-mot-cot-perspective.png',
  'lang-bac-front.png',
  'lang-bac-perspective.png',
];

for (const img of requiredImages) {
  const publicPath = path.join(rootDir, 'public', 'models', img);
  const srcAssetPath = path.join(rootDir, 'src', 'assets', 'models', img);

  const publicExists = fs.existsSync(publicPath);
  const srcExists = fs.existsSync(srcAssetPath);

  assert(publicExists, `public/models/${img} exists`);
  assert(srcExists, `src/assets/models/${img} exists`);

  if (publicExists) {
    const publicSize = fs.statSync(publicPath).size;
    assert(publicSize > 10000, `public/models/${img} is non-empty (${publicSize} bytes)`);
  }

  if (srcExists) {
    const srcSize = fs.statSync(srcAssetPath).size;
    assert(srcSize > 10000, `src/assets/models/${img} is non-empty (${srcSize} bytes)`);
  }
}

// 2. Check Root Config Files
const requiredConfigs = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'tailwind.config.js',
  'postcss.config.js',
  'index.html',
  'src/index.css',
  'src/types/index.ts',
  'src/data/modelsData.ts',
  'src/data/testimonialsData.ts',
  'src/components/common/HeritageMotifs.tsx',
  'src/components/common/SectionHeader.tsx',
  'src/components/common/MuseumPedestal.tsx',
];

for (const file of requiredConfigs) {
  const filePath = path.join(rootDir, file);
  assert(fs.existsSync(filePath), `Config/source file exists: ${file}`);
}

// 3. Verify Dist Output
const distIndex = path.join(rootDir, 'dist', 'index.html');
assert(fs.existsSync(distIndex), 'dist/index.html generated from build');

for (const img of requiredImages) {
  const distImg = path.join(rootDir, 'dist', 'models', img);
  assert(fs.existsSync(distImg), `dist/models/${img} deployed to production bundle`);
}

console.log(`\nAudit finished with ${failureCount} errors.`);
if (failureCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL FOUNDATION AUDIT CHECKS PASSED PERFECTLY!\n');
}
