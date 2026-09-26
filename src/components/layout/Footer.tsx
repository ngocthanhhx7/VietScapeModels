import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2, Phone, Mail, MessageCircle } from 'lucide-react';
import { DongSonDrumMotif, HoiVanFretMotif, LyLotusMotif } from '../common/HeritageMotifs';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#171311] text-heritage-sand overflow-hidden border-t-2 border-heritage-gold/30">
      {/* Decorative Hoi Van Fret Pattern Top Banner */}
      <div className="w-full bg-[#1F1916] py-2 px-4 border-b border-heritage-gold/20 flex items-center justify-between overflow-hidden opacity-75">
        <div className="flex items-center gap-8 text-heritage-gold/60 animate-pulse-glow">
          <HoiVanFretMotif size={28} />
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.3em] text-heritage-gold/70">
            VietScape 3D Papercraft &amp; Audio Heritage — EXE101 FPT University
          </span>
          <HoiVanFretMotif size={28} />
        </div>
        <div className="flex items-center gap-2 text-heritage-gold/80 font-mono text-xs">
          <LyLotusMotif size={20} />
          <span className="text-[11px] tracking-wider">Hồn Thiêng Đất Việt</span>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-heritage-gold/15 flex items-center justify-center text-heritage-gold border border-heritage-gold/40">
                <DongSonDrumMotif size={32} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wider text-white">VIETSCAPE</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-heritage-gold block">
                  3D Papercraft &amp; Audio Guide
                </span>
              </div>
            </div>

            <p className="text-sm text-heritage-sand/70 leading-relaxed font-sans">
              VietScape Models là dự án khởi nghiệp sáng tạo EXE101 (Nhóm 3 — Lớp GD1912, Đại học FPT), tiên phong tái hiện kiến trúc di sản Việt Nam qua bộ kit mô hình giấy 3D cắt dán DIY Low-poly tối giản, tích hợp mã QR lắng nghe podcast lịch sử song ngữ Anh - Việt sống động.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-heritage-gold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Giấy mỹ thuật &gt;180gsm</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-heritage-sand/80">
                <Award className="w-3.5 h-3.5 text-heritage-gold" />
                <span>Bảo hành bù mảnh 1-đổi-1</span>
              </div>
            </div>
          </div>

          {/* Heritage Collections Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-heritage-gold" />
              Bộ Kit Di Sản DIY
            </h4>
            <ul className="space-y-2.5 text-sm text-heritage-sand/70 font-sans">
              <li>
                <button
                  onClick={() => scrollToSection('#collections')}
                  className="hover:text-heritage-gold transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Chùa Một Cột (Liên Hoa Đài)</span>
                  <span className="text-xs font-mono text-heritage-gold/80 font-bold">98.2K</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#collections')}
                  className="hover:text-heritage-gold transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Lăng Chủ tịch Hồ Chí Minh</span>
                  <span className="text-xs font-mono text-heritage-gold/80 font-bold">98.2K</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#collections')}
                  className="hover:text-heritage-gold transition-colors flex items-center justify-between w-full text-left"
                >
                  <span>Khuê Văn Các (Văn Miếu)</span>
                  <span className="text-xs font-mono text-heritage-gold/80 font-bold">98.2K</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#interactive-3d')}
                  className="hover:text-heritage-gold transition-colors text-xs font-mono text-heritage-gold flex items-center gap-1.5 pt-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Mở Trình Trải Nghiệm 3D &amp; Podcast
                </button>
              </li>
            </ul>
          </div>

          {/* Showrooms & Consultation (Col 8-9) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-heritage-gold" />
              Kết nối dự án
            </h4>
            <div className="space-y-3 text-xs text-heritage-sand/70 font-sans">
              <div>
                <strong className="block text-white font-medium">Văn phòng EXE101:</strong>
                <p>Phòng DE424, Gamma, ĐH FPT Hà Nội</p>
              </div>
              <div>
                <strong className="block text-white font-medium">Hotline &amp; Zalo:</strong>
                <a href="tel:0852699188" className="text-heritage-gold font-mono hover:underline flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" /> 0852 699 188
                </a>
              </div>
              <div>
                <strong className="block text-white font-medium">Fanpage / Chat:</strong>
                <a
                  href="https://m.me/minquan27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heritage-sand/90 hover:text-heritage-gold transition-colors flex items-center gap-1 mt-0.5"
                >
                  <MessageCircle className="w-3 h-3 text-heritage-gold" /> Messenger: minquan27
                </a>
              </div>
              <div>
                <strong className="block text-white font-medium">Email hỗ trợ:</strong>
                <a href="mailto:vietscapemodels@gmail.com" className="text-heritage-sand/90 hover:text-heritage-gold transition-colors flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-heritage-gold" /> vietscapemodels@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-heritage-gold" />
              Bản tin Khởi nghiệp
            </h4>
            <p className="text-xs text-heritage-sand/70 leading-relaxed font-sans">
              Đăng ký để nhận sớm thông tin về mẫu kit kiến trúc mới, tập podcast lịch sử tiếp theo và các ưu đãi workshop học sinh, sinh viên.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  required
                  className="w-full pl-4 pr-11 py-2.5 rounded-lg bg-white/5 border border-heritage-border/30 text-white placeholder-heritage-sand/40 text-xs focus:outline-hidden focus:border-heritage-gold transition-colors font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-md bg-heritage-gold text-heritage-dark hover:bg-heritage-gold-light transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Đăng ký nhận bản tin"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {newsletterSubmitted && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cảm ơn bạn đã đăng ký nhận tin!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-heritage-sand/60">
          <p className="text-center sm:text-left">© 2026 VietScape Models — Đồ án Khởi nghiệp Sáng tạo EXE101 (Nhóm 3 — GD1912, Đại học FPT).</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <a href="#contact" className="hover:text-heritage-gold transition-colors">
              Chính sách bảo hành 1-đổi-1
            </a>
            <a href="https://zalo.me/0852699188" target="_blank" rel="noopener noreferrer" className="hover:text-heritage-gold transition-colors">
              Hỗ trợ Zalo: 0852 699 188
            </a>
            <a href="https://www.facebook.com/minquan27" target="_blank" rel="noopener noreferrer" className="hover:text-heritage-gold transition-colors">
              Facebook Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
