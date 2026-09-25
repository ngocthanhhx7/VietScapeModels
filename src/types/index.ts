export interface ArchitecturalHotspot {
  id: string;
  title: string;
  description: string;
  xPercent: number;
  yPercent: number;
}

export interface MaterialComponent {
  component: string;
  material: string;
  craftTechnique: string;
}

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
  hotspots: ArchitecturalHotspot[];
  status: 'available' | 'preorder' | 'upcoming';
  priceEstimateVnd?: string;
  features?: string[];
  materialsBreakdown?: MaterialComponent[];
}

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
  inquiryType?: string;
  message?: string;
}

export interface ViewerState {
  activeModelId: string;
  activeAngle: 'perspective' | 'front';
  zoomLevel: number; // 1.0 to 2.0
  lightingMode: 'museum' | 'dawn' | 'dusk';
  activeHotspotId: string | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatarUrl?: string;
  verifiedHeritageCollector?: boolean;
}

export interface CraftsmanshipStep {
  stepNumber: string;
  title: string;
  vietnameseTitle: string;
  description: string;
  highlights: string[];
  iconName: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
