import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, Scissors, Headphones, Package } from 'lucide-react';
import { DongSonDrumMotif, LyLotusMotif } from '../common/HeritageMotifs';
import { MuseumPedestal } from '../common/MuseumPedestal';

interface HeroSectionProps {
  onExploreCollections: () => void;
  onOpenViewer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollections,
  onOpenViewer,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-radial-spotlight">
      {/* Decorative Traditional Vietnamese Motif Background Elements */}
      <div className="absolute top-12 left-[-6%] opacity-5 pointer-events-none select-none text-heritage-dark hidden sm:block">
        <DongSonDrumMotif size={420} />
      </div>
      <div className="absolute bottom-6 right-[-4%] opacity-5 pointer-events-none select-none text-heritage-gold hidden sm:block">
        <DongSonDrumMotif size={360} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Message & Editorial Headline (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] bg-heritage-gold/10 text-heritage-dark border border-heritage-gold/30 backdrop-blur-xs">
              <LyLotusMotif size={18} className="text-heritage-gold" />
              <span>Bộ Kit Mô Hình Giấy 3D DIY — Đồ Án Khởi Nghiệp EXE101</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-heritage-dark leading-[1.14]">
              Tự Tay Ráp Di Sản — Chạm Vào <span className="text-gold-gradient">Hồn Thiêng</span> Kiến Trúc Việt
            </h1>

            {/* Subheading Narrative */}
            <p className="text-heritage-muted text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              Biến những mảnh giấy bìa phẳng thành kỳ quan kiến trúc 3D với phong cách Low-poly tối giản. Trải nghiệm tự tay cắt dán (DIY) giải tỏa căng thẳng sau giờ học và làm việc, kết hợp quét mã QR lắng nghe podcast lịch sử song ngữ Anh - Việt sống động dưới 5 phút.
            </p>

            {/* Dual CTAs & Social Proof */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCollections}
                className="group px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold bg-heritage-dark text-white hover:bg-heritage-gold transition-all duration-300 flex items-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Sở hữu Kit chỉ từ 98.2K</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={onOpenViewer}
                className="group px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold bg-white border border-heritage-border hover:border-heritage-gold text-heritage-dark hover:bg-heritage-cream/50 transition-all duration-300 flex items-center gap-2.5 shadow-xs cursor-pointer"
              >
                <Compass className="w-4 h-4 text-heritage-gold group-hover:rotate-45 transition-transform duration-500" />
                <span>Trải nghiệm xoay 3D &amp; Podcast QR</span>
              </button>
            </div>

            {/* Guarantees / Quality Highlights */}
            <div className="pt-6 border-t border-heritage-border/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-heritage-muted">
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-heritage-gold shrink-0" />
                <span>Tự ráp DIY dễ dàng — Dập nếp chuẩn mm</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-heritage-gold shrink-0" />
                <span>QR Podcast song ngữ Anh - Việt</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-heritage-gold shrink-0" />
                <span>Bao bì Flat-pack mỏng nhẹ dễ mang đi</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Spotlight 3D Pedestal (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Spotlight Glow Behind */}
            <div className="absolute inset-0 bg-radial-spotlight rounded-3xl -z-10 filter blur-xl scale-110" />

            {/* Floating Heritage Badge */}
            <div className="absolute -top-4 -right-2 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-heritage-gold/30 shadow-md flex items-center gap-2 text-xs font-mono text-heritage-dark animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Giá trải nghiệm: 98.200 ₫/kit</span>
            </div>

            {/* Museum Pedestal Card */}
            <div className="relative group cursor-pointer" onClick={onOpenViewer}>
              <MuseumPedestal
                imageSrc={`${import.meta.env.BASE_URL}models/chua-mot-cot-perspective.png`}
                imageAlt="Chùa Một Cột - Mô hình Giấy 3D DIY Low-poly"
                minHeight="min-h-[440px]"
                badgeText="Chùa Một Cột — Kit Giấy 3D DIY (1049)"
              />

              {/* Bottom Interactive Prompt */}
              <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-heritage-border text-xs font-mono text-heritage-dark shadow-xs group-hover:border-heritage-gold transition-colors">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-heritage-gold animate-spin-slow" />
                  <span>Chạm để khám phá 3D &amp; Nghe Podcast</span>
                </div>
                <span className="text-heritage-gold font-semibold">Tỉ lệ 1:75</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Heritage Stats Strip Bar */}
        <div className="mt-16 pt-8 border-t border-heritage-border/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-heritage-dark">98.200 ₫</span>
            <p className="text-xs font-mono uppercase tracking-wider text-heritage-muted">Mức giá sinh viên</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-heritage-gold">180+ gsm</span>
            <p className="text-xs font-mono uppercase tracking-wider text-heritage-muted">Giấy mỹ thuật dày dặn</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-heritage-dark">&lt; 5 Phút</span>
            <p className="text-xs font-mono uppercase tracking-wider text-heritage-muted">Podcast QR song ngữ</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-heritage-gold">100% DIY</span>
            <p className="text-xs font-mono uppercase tracking-wider text-heritage-muted">Healing &amp; Xả stress</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
