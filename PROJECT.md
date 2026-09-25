# Project: VietScape Models Landing Page

## Architecture
VietScape Models is a high-end cultural heritage architectural 3D miniature collectibles landing page. The application is built with React 18, Vite 5, Tailwind CSS 3.4, Lucide React, and Framer Motion.

### Architectural Principles
- **Neo-Heritage Minimalist Aesthetic**:
  - Canvas: Silk Alabaster (`#FBF9F5` / `bg-heritage-sand`), Porcelain surfaces (`#FFFFFF`), Warm dark timber (`#1C1714` / `text-heritage-dark`).
  - Accents: Imperial Bronze/Gold (`#C59B27`, `#D4AF37`), Bát Tràng Terracotta (`#A4422E`), Patina Jade (`#2D5A4C`).
  - Typography: Serif (`Playfair Display`, `Cinzel`) for cultural headings + Sans-serif (`Be Vietnam Pro`) for UI/body text + Monospace (`JetBrains Mono`) for architectural specifications.
  - Traditional Vietnamese motifs (Đông Sơn bronze drum, Lý Dynasty stylized lotus, antique cloud scrolls, and Hồi Văn fret patterns) rendered as performant SVG vector components.
- **Museum Archival Presentation**:
  - Studio renders from `assets/models/` are framed in museum display pedestals/plinths with subtle vignette borders and pedestal lighting to blend seamlessly with the light editorial palette.
- **Component & State Architecture**:
  - Modular, reusable components cleanly divided by functional sections.
  - Interactive 3D Viewer with model selector, angle switcher (`perspective` vs `front`), zoom multiplier (1.0x - 2.0x), studio lighting presets, and architectural hotspot annotations.
  - Pre-order & Partnership Inquiry Form with full client-side validation schema (name, phone, email, model selection, message), loading animation, and confirmation modal.
  - 100% responsive across Mobile (375px+), Tablet (768px+), and Desktop (1280px+).

## Code Layout
```
d:/WW/landing page/VietScapeModels/
├── public/
│   └── models/
│       ├── chua-mot-cot-front.png
│       ├── chua-mot-cot-perspective.png
│       ├── lang-bac-front.png
│       └── lang-bac-perspective.png
├── src/
│   ├── assets/
│   │   └── models/ (Vite compile-time imported assets)
│   ├── components/
│   │   ├── common/
│   │   │   ├── HeritageMotifs.tsx (Đông Sơn, Hoa Sen, Vân Mây, Hồi Văn)
│   │   │   ├── MuseumPedestal.tsx (Pedestal / plinth framing for 3D renders)
│   │   │   └── SectionHeader.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx (Logo, navigation links, CTA button, mobile drawer)
│   │   │   └── Footer.tsx (Brand story, legal IP, newsletter, social links)
│   │   └── sections/
│   │       ├── HeroSection.tsx (Spotlight piece, brand statement, dual CTA)
│   │       ├── StorySection.tsx (Heritage mission, cultural preservation)
│   │       ├── CollectionsSection.tsx (Curated models, specs, quick view switcher)
│   │       ├── CraftsmanshipSection.tsx (Historical research, 8K resin, hand-finishing)
│   │       ├── InteractiveViewer.tsx (Angle switcher, zoom, lighting, hotspots)
│   │       ├── TestimonialsSection.tsx (Curators, architects, collectors)
│   │       └── InquirySection.tsx (Pre-order & partnership form + success modal)
│   ├── data/
│   │   ├── modelsData.ts (Model specs, dimensions, ratios, descriptions, hotspots)
│   │   └── testimonialsData.ts
│   ├── types/
│   │   └── index.ts (Data contracts, form interfaces, model types)
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css (Tailwind base, custom fonts, scrollbar styling)
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Project Scaffolding & Build Pipeline | React 18, Vite, TSConfig, Tailwind, PostCSS, Lucide, Framer Motion | M1 | R3, Acceptance Criteria |
| 2 | Asset Placement & Verification | Copy `assets/models/` to `public/models/` and `src/assets/models/`, verify 0 broken images | M1 | R3, Acceptance Criteria |
| 3 | Neo-Heritage Design System | Color tokens, Vietnamese Google fonts, typographic scale, motif SVGs | M1 | R1 |
| 4 | Header & Navigation Bar | Logo, desktop links, CTA "Đặt trước tác phẩm", mobile slide-out drawer | M2 | R2.1 |
| 5 | Hero Section Spotlight | Headline "Tái hiện hồn thiêng kiến trúc Việt qua từng đường nét 3D", showcase, dual CTA | M2 | R2.2 |
| 6 | Heritage Story & Mission | Cultural narrative, preservation mission, generational bridge, editorial layout | M2 | R2.3 |
| 7 | Curated Collections Showcase | Chùa Một Cột, Lăng Bác, upcoming works (Văn Miếu, Cố đô Huế), specs, quick angle toggle | M3 | R2.4 |
| 8 | Interactive 3D / Perspective Gallery | Multi-angle view switcher (front/perspective), zoom 1.0x-2.0x, lighting presets, hotspots | M3 | R2.6 |
| 9 | Craftsmanship & Material Specs | 4-stage process (archival research, 3D sculpting, 8K resin curing, hand-finishing) | M4 | R2.5 |
| 10 | Curator & Collector Testimonials | Quotes from architect, cultural researcher, and collector | M4 | R2.7 |
| 11 | Pre-order & Partnership Inquiry Form | Form fields (Họ tên, SĐT, Email, Tác phẩm, Lời nhắn) with validation + success modal | M4 | R2.8 |
| 12 | Footer & Heritage Accents | Brand copyright, social links, cultural badges, newsletter signup | M4 | R2.9 |
| 13 | Smooth Scrolling & Micro-interactions | Framer Motion scroll animations, card hover states, interactive tabs | M5 | R3, UI Polish |
| 14 | Responsive Layout Verification | 100% responsive testing on Mobile (375px+), Tablet (768px+), Desktop (1280px+) | M5 | R3, Acceptance Criteria |
| 15 | Build & Integrity Verification | `npm run build` with 0 errors, 0 broken links, full E2E audit | M5 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation & Project Setup | Dependencies installation, config setup, asset pipeline, design system tokens | Survey | PLANNED |
| M2 | Brand Entry: Header, Hero & Story | Sections 1, 2, 3: Header/Nav, Hero Spotlight, Heritage Story & Mission | M1 | PLANNED |
| M3 | Showcase & Interactive 3D Viewer | Sections 4 & 6: Collections Showcase, specs, Interactive 3D/Perspective Viewer | M1, M2 | PLANNED |
| M4 | Artisanship, Trust & Conversion | Sections 5, 7, 8, 9: Craftsmanship, Testimonials, Inquiry Form + Modal, Footer | M1, M2 | PLANNED |
| M5 | Comprehensive Verification & Build | Full integration, build verification (`npm run build`), responsive checks, polish | M1, M2, M3, M4 | PLANNED |

## Interface Contracts

### 1. Model Data Contract (`src/types/index.ts`)
```typescript
export interface ModelSpecification {
  id: string;
  name: string;
  vietnameseTitle: string;
  historicalPeriod: string;
  era: string;
  scale: string;
  dimensions: {
    heightMm: number;
    widthMm: number;
    depthMm: number;
    weightGrams: number;
  };
  material: string;
  finish: string;
  editionLimit: number;
  description: string;
  architecturalSignificance: string;
  views: {
    front: string;
    perspective: string;
  };
  hotspots: {
    id: string;
    title: string;
    description: string;
    xPercent: number;
    yPercent: number;
  }[];
  status: 'available' | 'preorder' | 'upcoming';
  priceEstimateVnd?: string;
}
```

### 2. Inquiry Form Contract (`src/types/index.ts`)
```typescript
export interface InquiryFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  modelInterest: string;
  inquiryType: 'preorder' | 'custom_commission' | 'corporate_gift' | 'partnership';
  message: string;
}

export interface InquiryFormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  modelInterest?: string;
  message?: string;
}
```

### 3. Interactive Viewer State
```typescript
export interface ViewerState {
  activeModelId: string;
  activeAngle: 'perspective' | 'front';
  zoomLevel: number; // 1.0 to 2.0
  lightingMode: 'museum' | 'dawn' | 'dusk';
  activeHotspotId: string | null;
}
```
