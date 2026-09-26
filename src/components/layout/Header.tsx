import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { DongSonDrumMotif } from '../common/HeritageMotifs';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Di sản & Sứ mệnh', href: '#story' },
    { label: 'Bộ sưu tập Kit', href: '#collections' },
    { label: 'Kỹ nghệ Papercraft', href: '#craftsmanship' },
    { label: 'Trải nghiệm 3D & Audio', href: '#interactive-3d' },
    { label: 'Đánh giá cộng đồng', href: '#testimonials' },
    { label: 'Đặt hàng & Hợp tác', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-heritage-sand/90 backdrop-blur-md shadow-xs border-b border-heritage-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3.5 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-full bg-heritage-dark flex items-center justify-center text-heritage-gold shadow-sm group-hover:scale-105 transition-transform duration-300">
            <DongSonDrumMotif size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-[0.12em] font-bold text-heritage-dark leading-none group-hover:text-heritage-gold transition-colors">
              VIETSCAPE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-heritage-gold font-medium mt-1">
              3D Papercraft &amp; Audio Heritage
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xs font-sans font-medium text-heritage-muted hover:text-heritage-dark transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-heritage-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Hotline */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex flex-col text-right font-mono text-[11px] leading-tight">
            <span className="text-heritage-muted">Hotline / Zalo dự án</span>
            <a href="tel:0852699188" className="text-heritage-dark font-semibold hover:text-heritage-gold transition-colors">
              0852 699 188
            </a>
          </div>

          <button
            onClick={() => handleNavClick('#contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand overflow-hidden shadow-sm hover:shadow-md transition-all hover:bg-heritage-gold duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold group-hover:text-heritage-sand transition-colors" />
            <span>Đặt Mua Kit DIY (98.2K)</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-heritage-dark hover:bg-heritage-cream/60 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-heritage-sand/98 backdrop-blur-xl border-b border-heritage-border px-6 py-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 text-base font-serif text-heritage-dark hover:text-heritage-gold border-b border-heritage-border/50 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-heritage-gold" />
              </button>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <a
                href="tel:0852699188"
                className="text-center py-2 text-xs font-mono text-heritage-gold border border-heritage-gold/30 rounded-full"
              >
                Hotline: 0852 699 188
              </a>
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full py-3 rounded-full text-center text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand flex items-center justify-center gap-2 hover:bg-heritage-gold transition-colors"
              >
                <Sparkles className="w-4 h-4 text-heritage-gold" />
                <span>Đặt Mua Kit DIY (98.2K)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
