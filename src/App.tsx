import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import StorySection from './components/sections/StorySection';
import CollectionsSection from './components/sections/CollectionsSection';
import CraftsmanshipSection from './components/sections/CraftsmanshipSection';
import InteractiveViewer from './components/sections/InteractiveViewer';
import TestimonialsSection from './components/sections/TestimonialsSection';
import InquirySection from './components/sections/InquirySection';
import FloatingContactDock from './components/common/FloatingContactDock';
import HeritageEntrance, { hasSeenHeritageEntrance } from './components/common/HeritageEntrance';

export const App: React.FC = () => {
  const [showEntrance, setShowEntrance] = useState<boolean>(() => !hasSeenHeritageEntrance());
  const [selectedViewerModelId, setSelectedViewerModelId] = useState<string>('chua-mot-cot');
  const [inquiryModelInterest, setInquiryModelInterest] = useState<string>('Kit Chùa Một Cột — Thăng Long Hà Nội (98.200 VNĐ)');

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModelForViewer = (modelId: string) => {
    setSelectedViewerModelId(modelId);
    scrollToElement('interactive-3d');
  };

  const handleSelectModelForInquiry = (modelName: string) => {
    setInquiryModelInterest(modelName);
    scrollToElement('contact');
  };

  return (
    <div className="min-h-screen bg-heritage-sand text-heritage-dark selection:bg-heritage-gold/20 flex flex-col font-sans scroll-smooth">
      {/* Grand Opening Heritage Entrance (Curtain & Chim Lac Reveal) */}
      <HeritageEntrance
        isOpen={showEntrance}
        onComplete={() => setShowEntrance(false)}
        onSkip={() => setShowEntrance(false)}
      />

      {/* 1. Header / Navigation */}
      <Header onReplayEntrance={() => setShowEntrance(true)} />

      {/* Main 8 Content Sections */}
      <main className="flex-1 w-full">
        {/* 2. Hero Section Spotlight (id="hero") */}
        <HeroSection
          onExploreCollections={() => scrollToElement('collections')}
          onOpenViewer={() => scrollToElement('interactive-3d')}
        />

        {/* 3. Heritage Story & Brand Mission (id="story") */}
        <StorySection />

        {/* 4. Curated Collections Showcase (id="collections") */}
        <CollectionsSection
          onSelectModelForViewer={handleSelectModelForViewer}
          onSelectModelForInquiry={handleSelectModelForInquiry}
        />

        {/* 5. Craftsmanship & Material Specs (id="craftsmanship") */}
        <CraftsmanshipSection />

        {/* 6. Interactive 3D / Perspective Gallery (id="interactive-3d") */}
        <InteractiveViewer
          key={selectedViewerModelId}
          initialModelId={selectedViewerModelId}
          onPreorder={handleSelectModelForInquiry}
        />

        {/* 7. Curator & Collector Testimonials (id="testimonials") */}
        <TestimonialsSection />

        {/* 8. Pre-order & Partnership Inquiry Form (id="contact") */}
        <InquirySection initialModelInterest={inquiryModelInterest} />
      </main>

      {/* 9. Footer & Cultural Accents */}
      <Footer onReplayEntrance={() => setShowEntrance(true)} />

      {/* Realtime Multi-channel Floating Contact Dock (Official Info) */}
      <FloatingContactDock
        hotline="0852699188"
        hotlineDisplay="0852 699 188"
        zaloUrl="https://zalo.me/0852699188"
        messengerUrl="https://m.me/minquan27"
        facebookUrl="https://www.facebook.com/minquan27"
      />
    </div>
  );
};

export default App;
