import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Layers, Cpu, Paintbrush, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { DongSonDrumMotif } from '../common/HeritageMotifs';

export const CraftsmanshipSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Khảo Cứu Tư Liệu & Đo Đạc',
      vietnameseTitle: 'Khảo cổ & Khảo sát thực địa',
      description:
        'Hàng tháng trời tra cứu bản vẽ cổ thời Pháp thuộc, bản rập văn bia Lý - Trần và các hồ sơ bảo tồn di tích cấp quốc gia để phục dựng nguyên vẹn tỉ lệ kiến trúc nguyên thủy.',
      icon: Microscope,
      technicalSpec: 'Dung sai khảo cứu < 0.1%',
    },
    {
      number: '02',
      title: 'Dựng Hình Số Hóa 3D',
      vietnameseTitle: 'Mô phỏng kiến trúc vi thể',
      description:
        'Tái hiện từng mộng gỗ, vì kèo cánh sen, góc đao cong bằng phần mềm đồ họa tham số 3D chuyên sâu, đảm bảo cấu trúc chịu lực và ăn khớp tuyệt đối giữa các cấu kiện.',
      icon: Cpu,
      technicalSpec: 'Hơn 2.500.000 đa giác / mô hình',
    },
    {
      number: '03',
      title: 'In Quang Hóa DLP 8K',
      vietnameseTitle: 'Đúc polymer siêu phân giải',
      description:
        'Sử dụng công nghệ in quang hóa ma trận 8K với lớp cắt siêu mịn chỉ 0.025mm, cho phép hiển thị các đường chỉ ngói và hoa văn cuộn mây mà mắt thường khó lòng phân biệt lớp in.',
      icon: Layers,
      technicalSpec: 'Độ dày lớp cắt 25 micron',
    },
    {
      number: '04',
      title: 'Chế Tác Thủ Công Độc Bản',
      vietnameseTitle: 'Hồn cốt nghệ nhân Việt',
      description:
        'Nghệ nhân mài giũa ba cấp độ nhám, quét bột đồng oxit patine giả cổ, sơn sa thạch khoáng tự nhiên và phủ sáp ong hữu cơ bảo vệ gỗ tần bì nguyên khối trường tồn với thời gian.',
      icon: Paintbrush,
      technicalSpec: '12 giờ hoàn thiện thủ công / tác phẩm',
    },
  ];

  const materials = [
    {
      name: 'High-Precision 8K Photopolymer',
      role: 'Kết cấu kiến trúc chính',
      detail: 'Resin cao cấp nhập khẩu có phụ gia chống co ngót và kháng tia UV, không bị ố vàng theo năm tháng.',
    },
    {
      name: 'Gỗ Tần Bì & Mun Hoa Nguyên Khối',
      role: 'Đế trưng bày & Chân bệ',
      detail: 'Gỗ tự nhiên sấy tiêu chuẩn 8% độ ẩm, phay CNC rãnh Trống đồng Đông Sơn và lau dầu sáp ong tự nhiên.',
    },
    {
      name: 'Bột Khoáng Sa Thạch & Sơn Gốc Nước',
      role: 'Bề mặt mô phỏng đá hoa cương',
      detail: 'Khoáng chất tự nhiên tạo hiệu ứng bề mặt nhám mờ như đá nguyên khối tại Ba Đình hay tường gạch Bát Tràng.',
    },
    {
      name: 'Đồng Thau Cổ & Patine Oxit',
      role: 'Chi tiết mái đao & Biển tên',
      detail: 'Đồng nguyên chất dập nổi mạ giả cổ, khắc laser tên tác phẩm và số thứ tự sưu tầm độc bản.',
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
          badge="Kỹ nghệ chế tác bảo tàng"
          title={
            <>
              Quy Trình Chế Tác <span className="text-gold-gradient">Kỳ Công & Chuẩn Xác</span>
            </>
          }
          subtitle="Sự kết hợp hoàn hảo giữa công nghệ quang hóa thế hệ mới và bàn tay tài hoa của nghệ nhân điêu khắc truyền thống Việt Nam."
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
                Vật liệu thượng hạng
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-dark mt-1">
                Tuyển Chọn Chất Liệu Bền Vững Với Thời Gian
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-heritage-muted">
              <ShieldCheck className="w-4 h-4 text-heritage-gold" />
              <span>Bảo hành chống ố vàng & giòn nứt 10 năm</span>
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

          {/* Certificate of Authenticity Highlight */}
          <div className="p-6 rounded-2xl bg-white border border-heritage-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-heritage-gold/15 flex items-center justify-center text-heritage-gold shrink-0 border border-heritage-gold/30">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-lg font-bold text-heritage-dark">
                  Chứng Thư Giám Định Nghệ Thuật Đi Kèm
                </h4>
                <p className="text-xs text-heritage-muted font-sans">
                  Mỗi mô hình xuất xưởng mang một số thứ tự duy nhất (Serial Number), có chữ ký xác nhận của chủ nhiệm đồ án phục dựng và bảo hành trọn đời.
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-heritage-sand font-mono text-xs text-heritage-dark border border-heritage-border shrink-0">
              SERIAL: <strong className="text-heritage-gold">VS-HERITAGE-XXXX</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
