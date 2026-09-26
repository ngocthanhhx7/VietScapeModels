import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Headphones } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { CloudScrollMotif, DongSonDrumMotif } from '../common/HeritageMotifs';

export const StorySection: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'Tinh Thần DIY & Liệu Pháp Healing',
      subtitle: 'Cắt dán thủ công chánh niệm',
      description:
        'Tạm rời xa màn hình điện thoại và sự bủa vây của mạng xã hội. 60-90 phút tập trung cắt, gấp, dán từng mảng giấy mang lại sự thư thái, kích hoạt tư duy hình học không gian và cảm giác chữa lành (healing) sâu sắc.',
      highlight: 'Giảm stress & Rèn luyện tập trung',
    },
    {
      icon: Sparkles,
      title: 'Thiết Kế Low-poly Tối Giản Chuẩn Tỉ Lệ',
      subtitle: 'Ngôn ngữ thị giác thời thượng',
      description:
        'Thay vì lối phục dựng rườm rà dễ cong gãy, VietScape tinh lọc cấu trúc cổ điển thành hệ khối đa giác Low-poly hiện đại. Từng góc đao Chùa Một Cột, hàng cột Lăng Bác đều giữ trọn vẹn tỷ lệ vàng kiến trúc nguyên bản.',
      highlight: 'Phong cách Minimalist Decor',
    },
    {
      icon: Headphones,
      title: 'Trải Nghiệm Phygital & Podcast Song Ngữ',
      subtitle: 'Chạm mô hình — Lắng nghe di sản',
      description:
        'Sự kết hợp đột phá giữa sản phẩm vật lý (Physical) và trải nghiệm số (Digital). Quét mã QR in trên bao bì để mở ngay podcast âm thanh sống động (Anh - Việt) dưới 5 phút, được biên soạn từ nguồn sử liệu chuẩn xác.',
      highlight: 'Audio Guide Song Ngữ < 5 phút',
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
          badge="Câu chuyện khởi nghiệp & Sứ mệnh di sản"
          title={
            <>
              Hồi Sinh Di Sản Bằng <span className="text-gold-gradient">Đôi Tay Người Trẻ</span> &amp; Công Nghệ Số
            </>
          }
          subtitle="Khởi nguồn từ thực trạng quà lưu niệm Việt Nam còn nghèo nàn, cồng kềnh và thiếu chiều sâu văn hóa, nhóm sinh viên FPT University đã phát triển giải pháp kit giấy 3D kết hợp podcast song ngữ để lịch sử chạm tới trái tim thế hệ trẻ."
          dividerVariant="lotus"
        />

        {/* Narrative Manifest Callout Banner */}
        <div className="relative rounded-2xl bg-heritage-cream/50 border border-heritage-border/80 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-40 h-40 bg-radial-spotlight rounded-bl-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-heritage-gold font-semibold block">
              — Tuyên ngôn Dự án VietScape Models (Đồ án EXE101) —
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-heritage-dark font-medium leading-relaxed">
              &ldquo;Di sản không chỉ nằm im sau lớp kính viện bảo tàng. Di sản sống động nhất khi được chính bạn tự tay nâng niu, cắt dán từng nếp gấp và lắng nghe câu chuyện nghìn năm cất tiếng.&rdquo;
            </blockquote>
            <p className="text-xs font-mono text-heritage-muted pt-2">
              Sứ mệnh biến từng góc bàn học tập, làm việc thành không gian kết nối văn hóa cội nguồn
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
