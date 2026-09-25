import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle, Star, Building2, Award } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { LyLotusMotif, CloudScrollMotif } from '../common/HeritageMotifs';
import { testimonialsData } from '../../data/testimonialsData';

const getInitials = (name: string): string => {
  const parts = name.replace(/^(KTS\.|TS\.|ThS\.)\s*/, '').trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

export const TestimonialsSection: React.FC = () => {
  const pressPartners = [
    {
      name: 'Tạp Chí Kiến Trúc Việt Nam',
      role: 'Bảo trợ chuyên môn & Phục dựng',
      category: 'Hội Kiến trúc sư Việt Nam',
    },
    {
      name: 'Di Sản & Văn Hóa Đương Đại',
      role: 'Tạp chí giám định mỹ thuật',
      category: 'Hội đồng Khoa học Văn hóa',
    },
    {
      name: 'Vietnam Heritage Foundation',
      role: 'Đối tác nghiên cứu khảo cổ',
      category: 'Tổ chức Di sản Phi lợi nhuận',
    },
    {
      name: 'Heritage Diplomatic Gifts',
      role: 'Quà tặng ngoại giao cấp cao',
      category: 'Giao lưu văn hóa đối ngoại',
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 relative bg-heritage-sand overflow-hidden">
      {/* Decorative Traditional Watermark Motifs */}
      <div className="absolute -top-16 -right-16 text-heritage-gold/5 pointer-events-none select-none hidden lg:block">
        <LyLotusMotif size={380} />
      </div>
      <div className="absolute -bottom-10 -left-10 text-heritage-dark/5 pointer-events-none select-none hidden md:block">
        <CloudScrollMotif size={240} />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Góc nhìn chuyên gia & Người sưu tầm"
          title={
            <>
              Sự Đón Nhận Từ <span className="text-gold-gradient">Giới Chuyên Môn</span>
            </>
          }
          subtitle="Niềm tin và sự đồng hành của các kiến trúc sư, nhà nghiên cứu di sản và các nhà sưu tầm mỹ thuật danh tiếng trong và ngoài nước."
          dividerVariant="lotus"
        />

        {/* Testimonials 4-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xs border border-heritage-border/90 hover:border-heritage-gold/70 transition-all duration-300 hover:shadow-xl flex flex-col justify-between space-y-6 relative group"
            >
              {/* Subtle Decorative Watermark Quote Icon in Card Background */}
              <div className="absolute right-6 top-6 text-heritage-gold/10 group-hover:text-heritage-gold/15 transition-colors pointer-events-none select-none">
                <Quote className="w-24 h-24 stroke-[1]" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Rating Stars & Trust Pill */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-heritage-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-heritage-gold stroke-heritage-gold" />
                    ))}
                    <span className="text-xs font-mono font-bold text-heritage-gold ml-1">5.0</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-heritage-gold/90 bg-heritage-gold/10 px-2.5 py-0.5 rounded-full border border-heritage-gold/30">
                    <Award className="w-3 h-3" />
                    Bản giám định bảo tàng
                  </span>
                </div>

                {/* Quote Content */}
                <p className="font-serif text-base sm:text-lg italic text-heritage-dark leading-relaxed pt-2">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info with Monogram Avatar */}
              <div className="pt-5 border-t border-heritage-border/70 flex items-center gap-4 relative z-10">
                {/* Monogram Avatar Badge */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-heritage-dark via-[#2C241F] to-heritage-dark border-2 border-heritage-gold/50 flex items-center justify-center text-heritage-gold font-serif font-bold text-sm shadow-md shrink-0">
                  {getInitials(item.author)}
                </div>

                {/* Name, Role & Verification */}
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-serif text-base font-bold text-heritage-dark truncate">
                      {item.author}
                    </h4>
                    {item.verifiedHeritageCollector && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        Nhà sưu tầm xác thực
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-heritage-gold font-mono truncate">{item.role}</p>
                  <p className="text-xs text-heritage-muted truncate">{item.organization}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press & Diplomatic Partners Bar */}
        <div className="pt-10 border-t border-heritage-border/80">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-heritage-muted block">
              Đối tác văn hóa & Trưng bày ngoại giao
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pressPartners.map((p) => (
              <div
                key={p.name}
                className="p-5 rounded-2xl bg-white/70 border border-heritage-border/70 text-center space-y-1.5 hover:border-heritage-gold hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-heritage-cream flex items-center justify-center text-heritage-gold mx-auto mb-2 border border-heritage-gold/20">
                  <Building2 className="w-4 h-4" />
                </div>
                <strong className="block text-xs font-serif font-bold text-heritage-dark">
                  {p.name}
                </strong>
                <span className="text-[11px] font-mono text-heritage-gold block">
                  {p.role}
                </span>
                <span className="text-[10px] font-sans text-heritage-muted block">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
