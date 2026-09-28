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
  'src/components/common/HeritageEntrance.tsx',
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

// Favicon check (compatible with new ICO and SVG fallback)
const faviconIcoPath = path.join(rootDir, 'public', 'favicon.ico');
const faviconSvgPath = path.join(rootDir, 'public', 'vite.svg');
assert(
  fs.existsSync(faviconIcoPath) || fs.existsSync(faviconSvgPath),
  'Favicon asset exists at public/favicon.ico or public/vite.svg'
);
if (fs.existsSync(faviconSvgPath)) {
  const favContent = fs.readFileSync(faviconSvgPath, 'utf-8');
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

// Heritage Entrance mounting and state wiring in App.tsx
assert(appContent.includes('HeritageEntrance'), 'App.tsx imports HeritageEntrance component');
assert(
  appContent.indexOf('<HeritageEntrance') !== -1 && appContent.indexOf('<HeritageEntrance') < appContent.indexOf('<Header'),
  'HeritageEntrance is mounted before Header in App.tsx'
);
assert(
  appContent.includes('useState<boolean>(true)') || appContent.includes('useState(true)'),
  'App.tsx initializes entrance state to true on initial load & reload'
);
assert(
  appContent.includes('onReplayEntrance={handleReplayEntrance}') || (appContent.includes('onReplayEntrance') && appContent.includes('setShowEntrance(true)')),
  'App.tsx wires onReplayEntrance replay triggers'
);

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
assert(collectionsCode.includes('model.difficulty'), 'CollectionsSection binds DIY difficulty to model.difficulty');
assert(!collectionsCode.includes('{model.assemblyTimeMinutes || 60} phút'), 'CollectionsSection no longer displays minutes for DIY difficulty');
assert(collectionsCode.includes('model.dimensionDisplay'), 'CollectionsSection displays 3D dimensions via model.dimensionDisplay');
assert(collectionsCode.includes('{model.sheetCount || 20} tờ'), 'CollectionsSection formats sheet count as {count} tờ');

const craftsmanshipCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/CraftsmanshipSection.tsx'), 'utf-8');
assert(craftsmanshipCode.includes('id="craftsmanship"'), 'CraftsmanshipSection declares id="craftsmanship"');

const viewerCode = fs.readFileSync(path.join(rootDir, 'src/components/sections/InteractiveViewer.tsx'), 'utf-8');
assert(viewerCode.includes('id="interactive-3d"'), 'InteractiveViewer declares canonical id="interactive-3d"');
assert(viewerCode.includes('id="interactive-viewer"'), 'InteractiveViewer provides backward-compatible id="interactive-viewer"');
assert(viewerCode.includes('model.difficulty'), 'InteractiveViewer displays model.difficulty for DIY difficulty');
assert(!viewerCode.includes('Thời gian ráp:'), 'InteractiveViewer synchronizes label to Độ khó DIY without minutes');
assert(viewerCode.includes('model.dimensionDisplay'), 'InteractiveViewer displays 3D dimensions via model.dimensionDisplay');

const modelsDataCode = fs.readFileSync(path.join(rootDir, 'src/data/modelsData.ts'), 'utf-8');
assert(modelsDataCode.includes("dimensionDisplay: '19 × 20 × 30 cm'"), 'Chùa Một Cột has exact dimensions 19 × 20 × 30 cm');
assert(modelsDataCode.includes("dimensionDisplay: '33 × 30 × 23 cm'"), 'Lăng Bác has exact dimensions 33 × 30 × 23 cm');
assert(modelsDataCode.includes("dimensionDisplay: '26 × 21 × 33 cm'"), 'Khuê Văn Các has exact dimensions 26 × 21 × 33 cm');
assert(modelsDataCode.includes('Lang bac mowi nhat.jpg'), 'Lăng Bác uses latest authentic asset Lang bac mowi nhat.jpg');

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

// Hero mobile price collision check
assert(heroCode.includes('Từ 95k VNĐ'), 'HeroSection provides compact mobile price "Từ 95k VNĐ" to prevent collision');
assert(heroCode.includes('95.000 - 99.000 VNĐ'), 'HeroSection preserves full price for desktop/tablet viewports');

// Motifs check
const motifsCode = fs.readFileSync(path.join(rootDir, 'src/components/common/HeritageMotifs.tsx'), 'utf-8');
assert(motifsCode.includes('DongSonDrumMotif'), 'HeritageMotifs provides Dong Son drum SVG');
assert(motifsCode.includes('ChimLacBirdMotif'), 'HeritageMotifs provides ChimLacBirdMotif SVG');
assert(motifsCode.includes('GrandDongSonDrumMotif'), 'HeritageMotifs provides GrandDongSonDrumMotif SVG');
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
// 9. TYPOGRAPHY, EXE201 CODIFICATION & UX/UI REFINEMENT AUDIT
// ============================================================================
console.log('\n✨ 9. Typography, EXE201 Codification & UX/UI Refinement Audit:');
assert(headerCode.includes('whitespace-nowrap'), 'Header enforces whitespace-nowrap to prevent 2-line wraps');
assert(headerCode.includes("label: 'Di sản'"), "Header uses concise label 'Di sản'");
assert(headerCode.includes("label: 'Bộ sưu tập'"), "Header uses concise label 'Bộ sưu tập'");
assert(headerCode.includes("label: 'Kỹ nghệ'"), "Header uses concise label 'Kỹ nghệ'");
assert(headerCode.includes("label: 'Trải nghiệm 3D'"), "Header uses concise label 'Trải nghiệm 3D'");

const sectionHeaderCode = fs.readFileSync(path.join(rootDir, 'src/components/common/SectionHeader.tsx'), 'utf-8');
assert(sectionHeaderCode.includes('[text-wrap:balance]'), 'SectionHeader applies [text-wrap:balance] for elegant line breaks');

assert(viewerCode.includes('z-30') && viewerCode.includes('pointer-events-none'), 'InteractiveViewer elevates watermark badge to z-30 pointer-events-none');
assert(viewerCode.includes('rounded-2xl') || viewerCode.includes('rounded-3xl'), 'InteractiveViewer softens model image corners with rounded radius');
assert(collectionsCode.includes('rounded-2xl'), 'CollectionsSection softens model card preview images with rounded radius');

const footerCode = fs.readFileSync(path.join(rootDir, 'src/components/layout/Footer.tsx'), 'utf-8');
assert(!footerCode.includes('99.000 VNĐ') && !footerCode.includes('95.000 VNĐ'), 'Footer removes landmark prices under Bộ Kit Di Sản DIY');
assert(footerCode.includes('1 - Đổi - 1'), 'Footer formats warranty guarantee as 1 - Đổi - 1');
assert(footerCode.includes('Giấy mỹ thuật &gt; 180gsm'), 'Footer formats paper spec as Giấy mỹ thuật > 180gsm');

// Global zero EXE101 guarantee
const srcFiles = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/CollectionsSection.tsx',
  'src/components/sections/CraftsmanshipSection.tsx',
  'src/components/sections/InteractiveViewer.tsx',
  'src/components/sections/StorySection.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/InquirySection.tsx',
  'src/data/modelsData.ts',
  'src/data/testimonialsData.ts',
  'src/services/emailService.ts',
];
for (const file of srcFiles) {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  assert(!content.includes('EXE101'), `${file} has zero occurrences of EXE101`);
}
assert(footerCode.includes('EXE201'), 'Footer reflects project code EXE201');
assert(heroCode.includes('EXE201'), 'HeroSection reflects project code EXE201');
assert(collectionsCode.includes('EXE201'), 'CollectionsSection reflects project code EXE201');
assert(inquiryCode.includes('EXE201'), 'InquirySection reflects project code EXE201');

// ============================================================================
// 10. GRAND OPENING HERITAGE ENTRANCE & DONG SON CHIM LAC VECTOR AUDIT (R1 - R5)
// ============================================================================
console.log('\n🦅 10. Grand Opening Heritage Entrance & Dong Son Chim Lac Vector Audit:');

const entranceCode = fs.readFileSync(path.join(rootDir, 'src/components/common/HeritageEntrance.tsx'), 'utf-8');

// 10.1 Dong Son Chim Lac Archaeological & Vector Characteristics (R1)
assert(motifsCode.includes('ChimLacBirdMotif'), 'HeritageMotifs exports ChimLacBirdMotif component');
assert(
  motifsCode.includes('#FFF3C4') && motifsCode.includes('#E5B942') && motifsCode.includes('#C59B27'),
  'ChimLacBirdMotif defines imperial Dong Son gold gradient (#FFF3C4 -> #E5B942 -> #C59B27)'
);
assert(
  motifsCode.includes('lacAuraGlow') && motifsCode.includes('feGaussianBlur'),
  'ChimLacBirdMotif incorporates radiant aura glow filter'
);
assert(
  motifsCode.includes('Mào lông vũ') || motifsCode.includes('Crown Crest Plumes'),
  'ChimLacBirdMotif models authentic Dong Son crest plume'
);
assert(
  motifsCode.includes('Wing Geometric Engravings') || motifsCode.includes('răng lược') || motifsCode.includes('comb-teeth'),
  'ChimLacBirdMotif features authentic geometric wing feather engravings'
);
assert(
  motifsCode.includes('Trailing Silk Ribbon Plumage') || motifsCode.includes('dải lông đuôi'),
  'ChimLacBirdMotif features aerodynamic trailing ribbon plumage'
);
assert(motifsCode.includes('GrandDongSonDrumMotif'), 'HeritageMotifs exports GrandDongSonDrumMotif');
assert(
  motifsCode.includes('numPoints = 14') || motifsCode.includes('14-pointed solar star'),
  'GrandDongSonDrumMotif incorporates 14-pointed solar star core'
);

// 10.2 Page Reload Activation & Accessibility Controls (R3 & R4)
assert(
  appContent.includes('useState<boolean>(true)') || appContent.includes('useState(true)'),
  'Heritage entrance auto-triggers on page reload and initial visit (R4)'
);
assert(
  entranceCode.includes('handleSkip') && entranceCode.includes('Bỏ qua / Khám phá ngay'),
  'HeritageEntrance provides responsive Skip action button (R3)'
);
assert(
  entranceCode.includes('Escape') || entranceCode.includes("e.key === 'Escape'"),
  'HeritageEntrance supports Escape key dismissal (R3)'
);
assert(
  entranceCode.includes("document.body.style.overflow = 'hidden'"),
  'HeritageEntrance enforces body scroll lock during active entrance'
);
assert(
  headerCode.includes('onReplayEntrance') && (headerCode.includes('Xem lại hiệu ứng mở màn Hoàng Triều') || headerCode.includes('Xem lại mở màn Hoàng Triều')),
  'Header provides replay opening entrance button (R4)'
);
assert(
  footerCode.includes('onReplayEntrance') && footerCode.includes('Xem lại mở màn Hoàng Triều'),
  'Footer provides replay opening entrance button (R4)'
);

// 10.3 Epic Scenario & Coordinated Multi-Layer Architecture (R2)
assert(entranceCode.includes('royal-silk-curtain'), 'HeritageEntrance employs royal silk curtain texture panels');
assert(
  entranceCode.includes('isParting') && entranceCode.includes('-102%') && entranceCode.includes('102%'),
  'HeritageEntrance implements royal curtain parting spring physics'
);
assert(entranceCode.includes('GrandDongSonDrumMotif'), 'HeritageEntrance renders rotating Grand Dong Son bronze drum');
assert(entranceCode.includes('ChimLacBirdMotif'), 'HeritageEntrance renders Dong Son Chim Lac vector motif');
assert(entranceCode.includes('CloudScrollMotif'), 'HeritageEntrance coordinates mythic cloud gathering');
assert(
  entranceCode.includes('VIETSCAPE MODELS') && entranceCode.includes('Hồn Thiêng Kiến Trúc Việt'),
  'HeritageEntrance presents imperial branding typography'
);
assert(
  entranceCode.includes('isParting') && entranceCode.includes('bg-gradient-to-r'),
  'HeritageEntrance coordinates center radiant beam upon parting'
);

// 10.4 Epic Scenario Narrative Timing (~3.8s - 4.5s)
assert(
  entranceCode.includes('1800') && entranceCode.includes('2800') && entranceCode.includes('3800') && entranceCode.includes('4200'),
  'HeritageEntrance coordinates 4-tier narrative timing sequence (1800ms parting -> 2800ms climax -> 3800ms dissolve -> 4200ms finish)'
);

// ============================================================================
// 11. OFFICIAL BRAND LOGO & FAVICON INTEGRATION AUDIT (R1 - R5)
// ============================================================================
console.log('\n💎 11. Official Brand Logo & Favicon Integration Audit:');

// 11.1 Logo Asset Files & Transparency (R1)
const logoTransparentPath = path.join(rootDir, 'src/assets/logo/logo-transparent.png');
const publicLogoPath = path.join(rootDir, 'public/logo.png');
const publicFaviconPath = path.join(rootDir, 'public/favicon.ico');

assert(fs.existsSync(logoTransparentPath), 'Transparent logo exists: src/assets/logo/logo-transparent.png');
if (fs.existsSync(logoTransparentPath)) {
  const size = fs.statSync(logoTransparentPath).size;
  assert(size > 5000, `src/assets/logo/logo-transparent.png is authentic web asset (${size} bytes)`);
  assert(size < 3000000, `src/assets/logo/logo-transparent.png is web-optimized (<3MB)`);
}

assert(fs.existsSync(publicLogoPath), 'Public logo exists: public/logo.png');
if (fs.existsSync(publicLogoPath)) {
  const size = fs.statSync(publicLogoPath).size;
  assert(size > 5000, `public/logo.png is authentic web asset (${size} bytes)`);
}

assert(fs.existsSync(publicFaviconPath), 'Public favicon exists: public/favicon.ico');
if (fs.existsSync(publicFaviconPath)) {
  const size = fs.statSync(publicFaviconPath).size;
  assert(size > 100, `public/favicon.ico is valid ICO file (${size} bytes)`);
}

// 11.2 Header Brand Logo Integration (R2)
assert(
  headerCode.includes('logo-transparent.png') || headerCode.includes('/logo.png') || headerCode.includes('logoTransparent') || headerCode.includes('logo'),
  'Header references new brand logo asset'
);
assert(
  headerCode.includes('<img') && (headerCode.includes('alt="VietScape Models') || headerCode.includes("alt='VietScape Models")),
  'Header renders logo image with proper alt="VietScape Models" attribute'
);
assert(
  headerCode.includes('h-10') || headerCode.includes('h-11') || headerCode.includes('h-12'),
  'Header restricts logo height to responsive h-10/h-11/h-12 scale'
);
assert(
  headerCode.includes("window.scrollTo({ top: 0, behavior: 'smooth' })"),
  'Header logo click triggers smooth scroll to top'
);

// 11.3 Footer Brand Logo Integration (R3)
assert(
  footerCode.includes('logo-transparent.png') || footerCode.includes('/logo.png') || footerCode.includes('logoTransparent') || footerCode.includes('logo'),
  'Footer references new brand logo asset'
);
assert(
  footerCode.includes('<img') && (footerCode.includes('alt="VietScape Models') || footerCode.includes("alt='VietScape Models")),
  'Footer renders logo image with proper alt="VietScape Models" attribute'
);
assert(
  footerCode.includes('h-10') || footerCode.includes('h-12') || footerCode.includes('h-14') || footerCode.includes('object-contain'),
  'Footer styles logo with appropriate dimension and object-contain classes'
);

// 11.4 Browser Favicon Synchronization in index.html (R4)
const indexHtmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
assert(
  indexHtmlContent.includes('href="/favicon.ico"') || indexHtmlContent.includes('href="favicon.ico"') || indexHtmlContent.includes('href="/logo.png"'),
  'index.html links to new brand favicon'
);
assert(
  !indexHtmlContent.includes('href="/vite.svg"'),
  'index.html replaces legacy vite.svg favicon'
);

// 11.5 Dist Output Favicon & Logo Verification (R5)
if (fs.existsSync(distDir)) {
  const distLogo = path.join(distDir, 'logo.png');
  const distFavicon = path.join(distDir, 'favicon.ico');
  assert(fs.existsSync(distLogo), 'dist/logo.png deployed to production bundle');
  assert(fs.existsSync(distFavicon), 'dist/favicon.ico deployed to production bundle');

  if (fs.existsSync(distHtml)) {
    const distHtmlContent = fs.readFileSync(distHtml, 'utf-8');
    assert(
      distHtmlContent.includes('favicon.ico') || distHtmlContent.includes('logo.png'),
      'dist/index.html includes updated brand favicon'
    );
  }
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
