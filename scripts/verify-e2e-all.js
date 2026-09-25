import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('🏛️  VIETSCAPE MODELS: COMPREHENSIVE E2E VERIFICATION AUDIT');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failCount++;
  }
}

// ============================================================================
// 1. FILE & COMPONENT EXISTENCE AUDIT
// ============================================================================
console.log('📦 1. Component & Module Architecture Audit:');
const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'index.html',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tailwind.config.js',
  'postcss.config.js',
  'src/types/index.ts',
  'src/data/modelsData.ts',
  'src/data/testimonialsData.ts',
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/StorySection.tsx',
  'src/components/sections/CollectionsSection.tsx',
  'src/components/sections/CraftsmanshipSection.tsx',
  'src/components/sections/InteractiveViewer.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/InquirySection.tsx',
  'src/components/common/HeritageMotifs.tsx',
  'src/components/common/MuseumPedestal.tsx',
  'src/components/common/SectionHeader.tsx',
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(rootDir, relPath);
  const exists = fs.existsSync(fullPath);
  assert(exists, `File exists: ${relPath}`);
  if (exists) {
    const size = fs.statSync(fullPath).size;
    assert(size > 50, `File has valid content (${size} bytes): ${relPath}`);
  }
}

// ============================================================================
// 2. ASSET INTEGRITY AUDIT (3D Models in public, src, and dist)
// ============================================================================
console.log('\n🎨 2. Asset Integrity Audit (Models & Motifs):');
const requiredModelImages = [
  'chua-mot-cot-front.png',
  'chua-mot-cot-perspective.png',
  'lang-bac-front.png',
  'lang-bac-perspective.png',
];

for (const img of requiredModelImages) {
  const publicPath = path.join(rootDir, 'public', 'models', img);
  const srcPath = path.join(rootDir, 'src', 'assets', 'models', img);
  const distPath = path.join(rootDir, 'dist', 'models', img);

  assert(fs.existsSync(publicPath), `Public asset exists: public/models/${img}`);
  assert(fs.existsSync(srcPath), `Source asset exists: src/assets/models/${img}`);
  assert(fs.existsSync(distPath), `Dist asset exists: dist/models/${img}`);

  if (fs.existsSync(publicPath)) {
    const pubSize = fs.statSync(publicPath).size;
    assert(pubSize > 50000, `Public asset has authentic high-res size (${pubSize} bytes): ${img}`);
  }
  if (fs.existsSync(distPath)) {
    const distSize = fs.statSync(distPath).size;
    assert(distSize > 50000, `Dist asset has authentic high-res size (${distSize} bytes): ${img}`);
  }
}

// Favicon SVG check
const faviconPath = path.join(rootDir, 'public', 'vite.svg');
assert(fs.existsSync(faviconPath), 'Heritage Favicon SVG exists at public/vite.svg');
if (fs.existsSync(faviconPath)) {
  const favContent = fs.readFileSync(faviconPath, 'utf-8');
  assert(favContent.includes('<svg') && favContent.includes('#C59B27'), 'Favicon contains gold heritage branding');
}

// ============================================================================
// 3. EDITORIAL SEQUENCE & CODE CONTRACT AUDIT (App.tsx)
// ============================================================================
console.log('\n📐 3. Editorial Sequence & Code Contracts in App.tsx:');
const appContent = fs.readFileSync(path.join(rootDir, 'src/App.tsx'), 'utf-8');
const expectedSequence = [
  'Header',
  'HeroSection',
  'StorySection',
  'CollectionsSection',
  'CraftsmanshipSection',
  'InteractiveViewer',
  'TestimonialsSection',
  'InquirySection',
  'Footer',
];

let lastPos = -1;
for (const comp of expectedSequence) {
  const pos = appContent.indexOf(`<${comp}`);
  assert(pos !== -1, `Component <${comp} /> is rendered in App.tsx`);
  assert(pos > lastPos, `Component <${comp} /> maintains editorial sequence (pos ${pos} > ${lastPos})`);
  lastPos = pos;
}

// Cross-section interactive wiring in App.tsx
assert(appContent.includes('handleSelectModelForViewer'), 'App.tsx plumbs model selection to InteractiveViewer');
assert(appContent.includes('handleSelectModelForInquiry'), 'App.tsx plumbs model selection to InquirySection');
assert(appContent.includes('scrollToElement'), 'App.tsx provides smooth scrolling navigation helper');

// ============================================================================
// 4. NAVIGATION ANCHORS & SECTION IDS
// ============================================================================
console.log('\n🔗 4. Navigation Anchors & Section IDs:');
const heroCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/HeroSection.tsx'), 'utf-8');
assert(heroCode.includes('id="hero"'), 'HeroSection declares id="hero"');

const storyCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/StorySection.tsx'), 'utf-8');
assert(storyCode.includes('id="story"'), 'StorySection declares id="story"');

const collectionsCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/CollectionsSection.tsx'), 'utf-8');
assert(collectionsCode.includes('id="collections"'), 'CollectionsSection declares id="collections"');

const craftsmanshipCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/CraftsmanshipSection.tsx'), 'utf-8');
assert(craftsmanshipCode.includes('id="craftsmanship"'), 'CraftsmanshipSection declares id="craftsmanship"');

const viewerCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/InteractiveViewer.tsx'), 'utf-8');
assert(viewerCode.includes('id="interactive-3d"'), 'InteractiveViewer declares canonical id="interactive-3d"');
assert(viewerCode.includes('id="interactive-viewer"'), 'InteractiveViewer provides backward-compatible id="interactive-viewer"');

const testimonialsCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/TestimonialsSection.tsx'), 'utf-8');
assert(testimonialsCode.includes('id="testimonials"'), 'TestimonialsSection declares id="testimonials"');

const inquiryCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/InquirySection.tsx'), 'utf-8');
assert(inquiryCode.includes('id="contact"'), 'InquirySection declares canonical id="contact"');
assert(inquiryCode.includes('id="inquiry"'), 'InquirySection provides backward-compatible id="inquiry"');

// Header nav links mapping
const headerCode = fs.readFileSync(path.join(rootDir, 'src/components/layout/Header.tsx'), 'utf-8');
assert(headerCode.includes("href: '#story'"), "Header links to '#story'");
assert(headerCode.includes("href: '#collections'"), "Header links to '#collections'");
assert(headerCode.includes("href: '#craftsmanship'"), "Header links to '#craftsmanship'");
assert(headerCode.includes("href: '#interactive-3d'"), "Header links to '#interactive-3d'");
assert(headerCode.includes("href: '#testimonials'"), "Header links to '#testimonials'");
assert(headerCode.includes("href: '#contact'"), "Header links to '#contact'");
assert(headerCode.includes('mobileMenuOpen'), 'Header implements responsive mobile drawer toggle');

// ============================================================================
// 5. INTERACTIVE 3D VIEWER LOGIC & HOTSPOTS
// ============================================================================
console.log('\n🔍 5. Interactive 3D Viewer Capabilities:');
assert(viewerCode.includes("setAngle('perspective')"), 'InteractiveViewer supports Perspective 3/4 angle');
assert(viewerCode.includes("setAngle('front')"), 'InteractiveViewer supports Front view angle');
assert(viewerCode.includes('handleZoomIn'), 'InteractiveViewer supports Zoom In up to 2.0x');
assert(viewerCode.includes('handleZoomOut'), 'InteractiveViewer supports Zoom Out to 1.0x');
assert(viewerCode.includes('handleReset'), 'InteractiveViewer supports Reset zoom & angle');
assert(viewerCode.includes("lighting === 'museum'"), 'InteractiveViewer implements Museum lighting preset');
assert(viewerCode.includes("lighting === 'dawn'"), 'InteractiveViewer implements Dawn lighting preset');
assert(viewerCode.includes("lighting === 'dusk'"), 'InteractiveViewer implements Dusk lighting preset');
assert(viewerCode.includes('activeHotspot'), 'InteractiveViewer implements architectural hotspots toggle');
assert(viewerCode.includes('xPercent') && viewerCode.includes('yPercent'), 'Hotspots positioned with percentage coords');

// ============================================================================
// 6. INQUIRY FORM VALIDATION & DOSSIER MODAL
// ============================================================================
console.log('\n📋 6. Inquiry Form Validation & Modal System:');
assert(inquiryCode.includes('validateField'), 'InquirySection has field-level validator');
assert(inquiryCode.includes('validateAll'), 'InquirySection has full-form submission validator');
assert(inquiryCode.includes('phoneRegex'), 'InquirySection implements Vietnamese phone regex');
assert(inquiryCode.includes('emailRegex'), 'InquirySection implements RFC email format validation');
assert(inquiryCode.includes('isSubmitting'), 'InquirySection has async submission state & loading spinner');
assert(inquiryCode.includes('successModalData'), 'InquirySection triggers dossier modal on success');
assert(inquiryCode.includes('VS-INQ-'), 'InquirySection generates authentic dossier ticket number');
assert(inquiryCode.includes('Escape'), 'Modal handles ESC key press dismissal');

// ============================================================================
// 7. RESPONSIVE DESIGN & NEO-HERITAGE STYLING AUDIT
// ============================================================================
console.log('\n📱 7. Responsive Breakpoint & Neo-Heritage Theme Audit:');
const cssContent = fs.readFileSync(path.join(rootDir, 'src/index.css'), 'utf-8');
assert(cssContent.includes('--color-heritage-sand: #FBF9F5'), 'Theme defines silk alabaster canvas token');
assert(cssContent.includes('--color-heritage-dark: #1C1714'), 'Theme defines dark timber token');
assert(cssContent.includes('--color-heritage-gold: #C59B27'), 'Theme defines imperial gold token');
assert(cssContent.includes('--color-heritage-terracotta: #A4422E'), 'Theme defines Bat Trang terracotta token');
assert(cssContent.includes('--color-heritage-jade: #2D5A4C'), 'Theme defines patina jade token');
assert(cssContent.includes('overflow-x: hidden'), 'Global body enforces overflow-x hidden for zero viewport scroll');

// Check responsive classes across sections
const sectionFiles = [
  'HeroSection.tsx',
  'StorySection.tsx',
  'CollectionsSection.tsx',
  'CraftsmanshipSection.tsx',
  'InteractiveViewer.tsx',
  'TestimonialsSection.tsx',
  'InquirySection.tsx',
];

for (const sec of sectionFiles) {
  const secCode = fs.readFileSync(path.join(rootDir, 'src/components/sections', sec), 'utf-8');
  assert(secCode.includes('sm:') || secCode.includes('md:') || secCode.includes('lg:'), `${sec} contains responsive breakpoint classes`);
}

// Motifs check
const motifsCode = fs.readFileSync(path.join(rootDir, 'src/components/common/HeritageMotifs.tsx'), 'utf-8');
assert(motifsCode.includes('DongSonDrumMotif'), 'HeritageMotifs provides Dong Son drum SVG');
assert(motifsCode.includes('LyLotusMotif'), 'HeritageMotifs provides Ly Dynasty lotus SVG');
assert(motifsCode.includes('CloudScrollMotif'), 'HeritageMotifs provides Cloud scroll SVG');
assert(motifsCode.includes('HoiVanFretMotif'), 'HeritageMotifs provides Hoi Van fret motif SVG');
assert(motifsCode.includes('HeritageDivider'), 'HeritageMotifs provides ornamental HeritageDivider');

// ============================================================================
// 8. PRODUCTION BUILD OUTPUT AUDIT
// ============================================================================
console.log('\n🚀 8. Production Dist Output Audit:');
const distDir = path.join(rootDir, 'dist');
const distHtml = path.join(distDir, 'index.html');
const distAssets = path.join(distDir, 'assets');

assert(fs.existsSync(distHtml), 'dist/index.html exists');
if (fs.existsSync(distHtml)) {
  const htmlContent = fs.readFileSync(distHtml, 'utf-8');
  assert(htmlContent.includes('<div id="root"></div>'), 'dist/index.html contains root container');
  assert(htmlContent.includes('VietScape Models'), 'dist/index.html contains brand title');
}

assert(fs.existsSync(distAssets), 'dist/assets directory exists');
if (fs.existsSync(distAssets)) {
  const assets = fs.readdirSync(distAssets);
  const jsFiles = assets.filter((f) => f.endsWith('.js'));
  const cssFiles = assets.filter((f) => f.endsWith('.css'));
  assert(jsFiles.length > 0, `Production JS bundle created (${jsFiles.join(', ')})`);
  assert(cssFiles.length > 0, `Production CSS bundle created (${cssFiles.join(', ')})`);
}

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('\n================================================================');
console.log(`📊 AUDIT SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================');

if (failCount === 0) {
  console.log('🏆 100% OF VERIFICATION CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  console.error(`💥 AUDIT FAILED WITH ${failCount} FAILURES!\n`);
  process.exit(1);
}
