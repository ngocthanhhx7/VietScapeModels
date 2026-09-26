import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Layers, Scissors, Headphones, ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { DongSonDrumMotif } from '../common/HeritageMotifs';

export const CraftsmanshipSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Khảo Sát Thực Địa & Thiết Kế Low-poly',
      vietnameseTitle: 'Thiết kế đồ họa hình khối',
      description:
        'Nghiên cứu kỹ lưỡng tỷ lệ thực địa của di tích, sử dụng phần mềm đồ họa chuyển hóa các chi tiết phức tạp thành hệ thống đa giác Low-poly sắc nét, trẻ trung mà vẫn giữ chuẩn thần thái kiến trúc.',
      icon: Microscope,
      technicalSpec: 'Tỉ lệ khảo sát thực địa 100%',
    },
    {
      number: '02',
      title: 'Bóc Tách 3D & Lập Trình Đường Cấn Gấp',
      vietnameseTitle: 'Bóc tách mảng phẳng vi sai',
      description:
        'Lập trình thuật toán trải phẳng mô hình 3D thành các mảnh 2D tối ưu trang in. Dập sẵn đường cấn trợ lực (creasing lines) giúp bạn gập nếp sắc nét 100% mà không bị sờn rách mép giấy.',
      icon: Layers,
      technicalSpec: 'Dung sai khớp nối < 0.1 mm',
    },
    {
      number: '03',
      title: 'Tuyển Chọn Giấy Mỹ Thuật & In Kháng Ẩm',
      vietnameseTitle: 'Vật liệu xanh FSC & Bền màu',
      description:
        'Sử dụng giấy bìa mỹ thuật cao cấp định lượng 180-250gsm đạt chuẩn FSC thân thiện môi trường. Phủ lớp bảo vệ vi hạt kháng ẩm và tia UV, chống phai màu trong khí hậu nhiệt đới ẩm Việt Nam.',
      icon: Scissors,
      technicalSpec: 'Bìa mỹ thuật 180 - 250 gsm',
    },
    {
      number: '04',
      title: 'Tích Hợp QR Podcast & Đóng Gói Flat-pack',
      vietnameseTitle: 'Trải nghiệm số Phygital độc quyền',
      description:
        'Khắc mã QR laser liên kết chuỗi podcast lịch sử song ngữ Anh - Việt. Bộ kit được đóng gói mỏng dẹt như cuốn sổ tay mỹ thuật, đóng hộp carton lạnh bảo vệ an toàn trên mọi chuyến bay.',
      icon: Headphones,
      technicalSpec: 'Podcast song ngữ EN-VI < 5 phút',
    },
  ];

  const materials = [
    {
      name: 'Giấy Mỹ Thuật Bìa Dày (180 - 250gsm)',
      role: 'Kết cấu đa giác 3D chính',
      detail: 'Độ đanh dẻo lý tưởng, bắt keo cực nhạy, chịu lực gấp đa chiều và đạt chứng chỉ rừng bền vững FSC.',
    },
    {
      name: 'Mực In Khoáng Gốc Nước Kháng UV',
      role: 'Sắc độ di sản chuẩn mực',
      detail: 'Màu sắc thuần khiết mô phỏng ngói hoàng lưu ly, gạch chu sa và sa thạch Ba Đình, an toàn tuyệt đối khi tiếp xúc.',
    },
    {
      name: 'Keo Dán Thủ Công Đầu Kim',
      role: 'Hệ thống liên kết bền vững',
      detail: 'Dạng keo mô hình khô nhanh 15 giây, không mùi, không làm cong vênh giấy, tạo khối liên kết vững chãi.',
    },
    {
      name: 'Bao Bì Carton Lạnh Flat-Pack',
      role: 'Đóng gói mỏng gọn chống va đập',
      detail: 'Độ dày dưới 10mm, trọng lượng siêu nhẹ 150g, cực kỳ thuận tiện mang trong ba lô hoặc hành lý máy bay.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 px-6 relative bg-white overflow-hidden border-b border-heritage-border/70">
      {/* Decorative Motifs */}
      <div className="absolute top-12 left-6 text-heritage-dark/5 pointer-events-none hidden lg:block">
        <DongSonDrumMotif size={320} />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Quy trình chế tác giấy & Đóng gói Flat-pack"
          title={
            <>
              Kỹ Nghệ Papercraft &amp; <span className="text-gold-gradient">Hệ Sinh Thái Phygital</span>
            </>
          }
          subtitle="Khám phá hành trình chuyển hóa công trình di sản ngàn năm thành bộ kit giấy dập nếp chuẩn xác từng milimet, dễ dàng tự ráp và bền vững cùng thời gian."
          dividerVariant="lotus"
        />

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative p-6 rounded-2xl bg-heritage-sand/40 border border-heritage-border hover:border-heritage-gold/60 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-extrabold text-heritage-gold/80 group-hover:text-heritage-gold transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-heritage-dark group-hover:bg-heritage-dark group-hover:text-heritage-gold transition-colors shadow-2xs border border-heritage-border/60">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-heritage-gold font-semibold block">
                      {step.vietnameseTitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-heritage-dark mt-1">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-heritage-muted leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-heritage-border/70 text-[11px] font-mono text-heritage-dark flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-heritage-gold shrink-0" />
                  <span className="font-semibold text-heritage-gold-dark">{step.technicalSpec}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Materials & Heritage Guarantee Banner */}
        <div className="rounded-3xl bg-heritage-cream/60 border border-heritage-border p-8 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-heritage-border/70 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-heritage-gold font-semibold block">
                Vật liệu an toàn &amp; Thân thiện
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-dark mt-1">
                Bộ Kit Giấy Bền Vững Cùng Không Gian Sống
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-heritage-muted">
              <ShieldCheck className="w-4 h-4 text-heritage-gold" />
              <span>Chống ẩm mốc và phai màu trong khí hậu Việt Nam</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((mat) => (
              <div
                key={mat.name}
                className="p-5 rounded-2xl bg-white border border-heritage-border/70 space-y-2 shadow-2xs"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-gold block font-semibold">
                  {mat.role}
                </span>
                <h4 className="font-serif text-base font-bold text-heritage-dark">{mat.name}</h4>
                <p className="text-xs text-heritage-muted font-sans leading-relaxed">{mat.detail}</p>
              </div>
            ))}
          </div>

          {/* Guarantee Box: Replacement Part Warranty */}
          <div className="p-6 rounded-2xl bg-white border border-heritage-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-heritage-gold/15 flex items-center justify-center text-heritage-gold shrink-0 border border-heritage-gold/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-lg font-bold text-heritage-dark">
                  Chính Sách &quot;Yên Tâm Trổ Tài — Đổi Bù Mảnh Hỏng 1-Đổi-1&quot;
                </h4>
                <p className="text-xs text-heritage-muted font-sans">
                  Nếu trong quá trình cắt dán bạn vô tình làm rách nếp gấp hoặc mất chi tiết, VietScape sẽ gửi bù tấm chi tiết thay thế hoàn toàn miễn phí!
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-heritage-sand font-mono text-xs text-heritage-dark border border-heritage-border shrink-0">
              CAM KẾT: <strong className="text-heritage-gold">BẢO HÀNH DIY 100%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
