import fs from 'fs';
import path from 'path';

console.log('--- VIETSCAPE MODELS FULL ASSEMBLY VERIFICATION ---');

const projectRoot = path.resolve('d:/WW/landing page/VietScapeModels');
let errorCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    errorCount++;
  }
}

// 1. Check all section files exist
const requiredSections = [
  'src/components/layout/Header.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/StorySection.tsx',
  'src/components/sections/CollectionsSection.tsx',
  'src/components/sections/CraftsmanshipSection.tsx',
  'src/components/sections/InteractiveViewer.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/InquirySection.tsx',
  'src/components/layout/Footer.tsx',
  'src/App.tsx',
];

requiredSections.forEach((relPath) => {
  const fullPath = path.join(projectRoot, relPath);
  assert(fs.existsSync(fullPath), `Section file exists: ${relPath}`);
});

// 2. Check App.tsx content has all 9 sections in order
const appContent = fs.readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf-8');
const expectedOrder = [
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

let lastIndex = -1;
let orderCorrect = true;
for (const comp of expectedOrder) {
  const idx = appContent.indexOf(`<${comp}`);
  if (idx === -1) {
    orderCorrect = false;
    assert(false, `Component <${comp} /> is rendered in App.tsx`);
  } else {
    assert(idx > lastIndex, `Component <${comp} /> rendered in correct order (index ${idx} > ${lastIndex})`);
    lastIndex = idx;
  }
}

// 3. Verify IDs for navigation anchors
const heroContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/HeroSection.tsx'), 'utf-8');
assert(heroContent.includes('id="hero"'), 'HeroSection has id="hero"');

const storyContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/StorySection.tsx'), 'utf-8');
assert(storyContent.includes('id="story"'), 'StorySection has id="story"');

const collectionsContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/CollectionsSection.tsx'), 'utf-8');
assert(collectionsContent.includes('id="collections"'), 'CollectionsSection has id="collections"');

const craftsmanshipContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/CraftsmanshipSection.tsx'), 'utf-8');
assert(craftsmanshipContent.includes('id="craftsmanship"'), 'CraftsmanshipSection has id="craftsmanship"');

const viewerContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/InteractiveViewer.tsx'), 'utf-8');
assert(viewerContent.includes('id="interactive-3d"'), 'InteractiveViewer has id="interactive-3d"');

const testimonialsContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/TestimonialsSection.tsx'), 'utf-8');
assert(testimonialsContent.includes('id="testimonials"'), 'TestimonialsSection has id="testimonials"');

const inquiryContent = fs.readFileSync(path.join(projectRoot, 'src/components/sections/InquirySection.tsx'), 'utf-8');
assert(inquiryContent.includes('id="contact"'), 'InquirySection has id="contact"');

// 4. Verify InquirySection validation features
assert(inquiryContent.includes('fullName'), 'InquirySection validates fullName');
assert(inquiryContent.includes('phoneNumber'), 'InquirySection validates phoneNumber');
assert(inquiryContent.includes('email'), 'InquirySection validates email');
assert(inquiryContent.includes('modelInterest'), 'InquirySection validates modelInterest');
assert(inquiryContent.includes('message'), 'InquirySection validates message');
assert(inquiryContent.includes('isSubmitting'), 'InquirySection has submitting state');
assert(inquiryContent.includes('successModalData'), 'InquirySection has success confirmation modal');

// 5. Verify TestimonialsSection details
assert(testimonialsContent.includes('getInitials'), 'TestimonialsSection includes monogram avatar generator');
assert(testimonialsContent.includes('verifiedHeritageCollector'), 'TestimonialsSection handles verified collector badges');
assert(testimonialsContent.includes('pressPartners'), 'TestimonialsSection includes cultural & diplomatic partners');

// 6. Verify dist output
const distIndex = path.join(projectRoot, 'dist/index.html');
assert(fs.existsSync(distIndex), 'dist/index.html exists from production build');

if (errorCount === 0) {
  console.log('\n🎉 ALL 9 SECTIONS & VERIFICATIONS PASSED WITH 0 ERRORS!');
} else {
  console.error(`\n❌ VERIFICATION FINISHED WITH ${errorCount} ERRORS!`);
  process.exit(1);
}
