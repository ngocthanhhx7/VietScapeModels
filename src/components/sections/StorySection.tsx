import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Sparkles, Feather } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { CloudScrollMotif, DongSonDrumMotif } from '../common/HeritageMotifs';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Scroll,
      title: 'Tôn Kính Khảo Cổ & Sử Liệu',
      subtitle: 'Nghiên cứu nguyên mẫu',
      description:
        'Mỗi tác phẩm của VietScape bắt đầu từ hàng tháng trời khảo cứu tư liệu khảo cổ, bản rập văn bia, ảnh chụp thời Pháp và các đồ án phục dựng của Viện Bảo tồn Di tích.',
      highlight: 'Chuẩn xác tỉ lệ cấu kiện',
    },
    {
      icon: Sparkles,
      title: 'Kỹ Nghệ Quang Hóa 8K',
      subtitle: 'Độ tinh xảo micromet',
      description:
        'Sử dụng công nghệ in quang hóa photopolymer với ma trận điểm ảnh 8K siêu phân giải, lớp cắt 25 micromet tái hiện sắc nét cả đường thớ gỗ thời Lý hay hoa văn búp sen.',
      highlight: 'Độ phân giải 0.025 mm',
    },
    {
      icon: Feather,
      title: 'Hồn Cốt Nghệ Nhân Việt',
      subtitle: 'Hoàn thiện thủ công',
      description:
        'Sau khi đúc, từng chi tiết được nghệ nhân thủ công mài tỉa, chấm men giả cổ, lau sáp ong tự nhiên trên đế gỗ tần bì để toát lên hơi thở thời gian và hồn thiêng di sản.',
      highlight: 'Sơn phủ thủ công độc bản',
    },
  ];

  return (
    <section id="story" className="py-24 px-6 relative bg-white overflow-hidden border-y border-heritage-border/60">
      {/* Background Decorative Cloud Motif */}
      <div className="absolute top-10 right-10 text-heritage-gold/10 pointer-events-none hidden md:block">
        <CloudScrollMotif size={140} />
      </div>
      <div className="absolute bottom-8 left-8 text-heritage-dark/5 pointer-events-none hidden md:block">
        <DongSonDrumMotif size={280} />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Câu chuyện thương hiệu & Sứ mệnh"
          title={
            <>
              Gìn Giữ <span className="text-gold-gradient">Hồn Thiêng Văn Hiến</span> Trong Kỷ Nguyên Số
            </>
          }
          subtitle="Chúng tôi tin rằng di sản không phải là hiện vật nằm yên sau lớp kính bảo tàng, mà là nguồn cảm hứng sống động cần được chạm tới, trân trọng và đồng hành cùng không gian sống đương đại."
          dividerVariant="lotus"
        />

        {/* Narrative Manifest Callout Banner */}
        <div className="relative rounded-2xl bg-heritage-cream/50 border border-heritage-border/80 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-40 h-40 bg-radial-spotlight rounded-bl-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-heritage-gold font-semibold block">
              — Triết lý VietScape Models —
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-heritage-dark font-medium leading-relaxed">
              &ldquo;Di sản không phải là đống tro tàn của quá khứ để hoài niệm, mà là ngọn lửa minh triết ngàn đời cần được tiếp nối và thắp sáng trong tâm khảm người Việt hôm nay.&rdquo;
            </blockquote>
            <p className="text-xs font-mono text-heritage-muted pt-2">
              Sứ mệnh đưa kiến trúc biểu tượng Việt Nam vươn tầm nghệ thuật sưu tầm quốc tế
            </p>
          </div>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-heritage-sand/40 border border-heritage-border hover:border-heritage-gold/50 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-heritage-gold border border-heritage-border/70 group-hover:bg-heritage-dark group-hover:text-heritage-gold transition-colors duration-300 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-heritage-gold/60 font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-heritage-dark mt-1">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-sm text-heritage-muted leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-heritage-border/60 flex items-center justify-between text-xs font-mono text-heritage-dark">
                  <span className="text-heritage-muted">Tiêu chuẩn:</span>
                  <span className="font-semibold text-heritage-gold">{pillar.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
