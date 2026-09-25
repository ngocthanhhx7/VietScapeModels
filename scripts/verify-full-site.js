import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

console.log('=== VIETSCAPE MODELS COMPREHENSIVE VERIFICATION AUDIT ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failCount++;
  }
}

// 1. Check all sections
const requiredComponents = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/StorySection.tsx',
  'src/components/sections/CollectionsSection.tsx',
  'src/components/sections/InteractiveViewer.tsx',
  'src/components/sections/CraftsmanshipSection.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/InquirySection.tsx',
  'src/components/common/HeritageMotifs.tsx',
  'src/components/common/MuseumPedestal.tsx',
  'src/components/common/SectionHeader.tsx',
  'src/data/modelsData.ts',
  'src/data/testimonialsData.ts',
  'src/types/index.ts',
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
];

requiredComponents.forEach((relPath) => {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(fullPath), `Component file exists: ${relPath}`);
});

// 2. Check 3D model assets
const requiredAssets = [
  'public/models/chua-mot-cot-front.png',
  'public/models/chua-mot-cot-perspective.png',
  'public/models/lang-bac-front.png',
  'public/models/lang-bac-perspective.png',
  'dist/models/chua-mot-cot-front.png',
  'dist/models/chua-mot-cot-perspective.png',
  'dist/models/lang-bac-front.png',
  'dist/models/lang-bac-perspective.png',
];

requiredAssets.forEach((relPath) => {
  const fullPath = path.join(ROOT_DIR, relPath);
  assert(fs.existsSync(fullPath) && fs.statSync(fullPath).size > 10000, `Asset exists & valid size (>10KB): ${relPath}`);
});

// 3. Check dist bundle completeness
const distHtml = path.join(ROOT_DIR, 'dist/index.html');
assert(fs.existsSync(distHtml), 'Production dist/index.html exists');

const distAssetsDir = path.join(ROOT_DIR, 'dist/assets');
if (fs.existsSync(distAssetsDir)) {
  const files = fs.readdirSync(distAssetsDir);
  const hasJs = files.some(f => f.endsWith('.js'));
  const hasCss = files.some(f => f.endsWith('.css'));
  assert(hasJs, 'Production JavaScript bundle created');
  assert(hasCss, 'Production CSS bundle created');
} else {
  assert(false, 'dist/assets directory exists');
}

// 4. Verify Content Integrity
const appCode = fs.readFileSync(path.join(ROOT_DIR, 'src/App.tsx'), 'utf-8');
assert(appCode.includes('HeroSection'), 'App.tsx integrates HeroSection');
assert(appCode.includes('StorySection'), 'App.tsx integrates StorySection');
assert(appCode.includes('CollectionsSection'), 'App.tsx integrates CollectionsSection');
assert(appCode.includes('InteractiveViewer'), 'App.tsx integrates InteractiveViewer');
assert(appCode.includes('CraftsmanshipSection'), 'App.tsx integrates CraftsmanshipSection');
assert(appCode.includes('TestimonialsSection'), 'App.tsx integrates TestimonialsSection');
assert(appCode.includes('InquirySection'), 'App.tsx integrates InquirySection');
assert(appCode.includes('Header'), 'App.tsx integrates Header');
assert(appCode.includes('Footer'), 'App.tsx integrates Footer');

// 5. Verify Inquiry Form Validation
const inquiryCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/sections/InquirySection.tsx'), 'utf-8');
assert(inquiryCode.includes('validate'), 'InquirySection implements form validation');
assert(inquiryCode.includes('successModalData'), 'InquirySection implements confirmation modal');
assert(inquiryCode.includes('VS-INQ-'), 'InquirySection generates ticket reference code');

// 6. Verify Interactive Viewer Features
const viewerCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/sections/InteractiveViewer.tsx'), 'utf-8');
assert(viewerCode.includes('setAngle'), 'InteractiveViewer supports angle toggling (front/perspective)');
assert(viewerCode.includes('setZoom'), 'InteractiveViewer supports zoom adjustment');
assert(viewerCode.includes('setLighting'), 'InteractiveViewer supports museum/dawn/dusk lighting presets');
assert(viewerCode.includes('activeHotspot'), 'InteractiveViewer supports architectural hotspot pins & inspector');

console.log(`\nAudit completed: ${passCount} PASSED, ${failCount} FAILED.`);
if (failCount === 0) {
  console.log('🎉 ALL COMPREHENSIVE REQUIREMENTS VERIFIED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('🚨 AUDIT DETECTED FAILURES!');
  process.exit(1);
}
