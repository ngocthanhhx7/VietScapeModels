import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Check, Eye, Headphones, Wrench, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { modelsData } from '../../data/modelsData';

interface CollectionsSectionProps {
  onSelectModelForViewer: (modelId: string) => void;
  onSelectModelForInquiry: (modelName: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  onSelectModelForViewer,
  onSelectModelForInquiry,
}) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'upcoming'>('all');
  const [activeAngles, setActiveAngles] = useState<Record<string, 'perspective' | 'front'>>({
    'chua-mot-cot': 'perspective',
    'lang-bac': 'perspective',
    'van-mieu': 'perspective',
  });

  const availableCount = modelsData.filter((m) => m.status === 'available').length;
  const upcomingCount = modelsData.filter((m) => m.status === 'upcoming').length;

  const filteredModels = modelsData.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'available') return m.status === 'available';
    if (filter === 'upcoming') return m.status === 'upcoming';
    return true;
  });

  const toggleAngle = (modelId: string, angle: 'perspective' | 'front') => {
    setActiveAngles((prev) => ({
      ...prev,
      [modelId]: angle,
    }));
  };

  return (
    <section id="collections" className="py-24 px-6 relative bg-heritage-sand overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Bộ sưu tập Kit Giấy 3D DIY — EXE101"
          title={
            <>
              Kỳ Quan Kiến Trúc <span className="text-gold-gradient">Cắt Dán Tinh Tế</span>
            </>
          }
          subtitle="Mỗi bộ kit giấy phẳng flat-pack được thiết kế chuẩn xác từng đường gấp, kèm mã QR dẫn thẳng đến podcast lịch sử song ngữ Anh - Việt sống động dưới 5 phút."
          dividerVariant="lotus"
        />

        {/* Filter Navigation Tabs */}
        {upcomingCount > 0 && (
          <div className="flex items-center justify-center w-full">
            <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl sm:rounded-full border border-heritage-border shadow-2xs flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 max-w-full">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-xs'
                    : 'text-heritage-muted hover:text-heritage-dark'
                }`}
              >
                Tất cả bộ Kit ({modelsData.length})
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  filter === 'available'
                    ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-xs'
                    : 'text-heritage-muted hover:text-heritage-dark'
                }`}
              >
                Hiện có sẵn ({availableCount})
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  filter === 'upcoming'
                    ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-xs'
                    : 'text-heritage-muted hover:text-heritage-dark'
                }`}
              >
                Dự án mở rộng ({upcomingCount})
              </button>
            </div>
          </div>
        )}

        {/* Models Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredModels.map((model) => {
            const currentAngle = activeAngles[model.id] || 'perspective';
            const currentImg = model.views[currentAngle];

            return (
              <motion.div
                key={model.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group rounded-3xl bg-white border border-heritage-border/90 hover:border-heritage-gold/60 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Showcase Plinth Area */}
                <div className="relative p-5 sm:p-8 bg-radial-gallery border-b border-heritage-border/60">
                  {/* Status & Scale Badges */}
                  <div className="flex items-center justify-between relative z-20">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-heritage-dark text-heritage-sand shadow-2xs">
                      Tỉ lệ {model.scale}
                    </span>

                    {model.status === 'available' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Kit DIY Sẵn Sàng (98.200 VNĐ)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Giai đoạn 2 (Dự kiến)
                      </span>
                    )}
                  </div>

                  {/* Render Image Display */}
                  <div className="relative my-6 h-[300px] flex items-center justify-center">
                    <img
                      src={currentImg}
                      alt={`${model.name} render`}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Angle Switcher Controls & Quick 3D button */}
                  <div className="flex flex-wrap items-center justify-between gap-2 relative z-20 pt-2">
                    <div className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-heritage-border shadow-2xs">
                      <button
                        onClick={() => toggleAngle(model.id, 'perspective')}
                        className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                          currentAngle === 'perspective'
                            ? 'bg-heritage-dark text-heritage-sand font-medium'
                            : 'text-heritage-muted hover:text-heritage-dark'
                        }`}
                      >
                        Phối cảnh
                      </button>
                      <button
                        onClick={() => toggleAngle(model.id, 'front')}
                        className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                          currentAngle === 'front'
                            ? 'bg-heritage-dark text-heritage-sand font-medium'
                            : 'text-heritage-muted hover:text-heritage-dark'
                        }`}
                      >
                        Chính diện
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        <Headphones className="w-3 h-3 text-emerald-600" />
                        <span>QR Podcast</span>
                      </span>

                      <button
                        onClick={() => onSelectModelForViewer(model.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-heritage-gold hover:text-heritage-gold-dark transition-colors font-medium bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-heritage-border hover:border-heritage-gold shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem 3D tương tác</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Model Details & Specifications */}
                <div className="p-5 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-heritage-dark">
                          {model.name}
                        </h3>
                        <p className="text-xs text-heritage-gold font-mono uppercase tracking-wider">
                          {model.vietnameseTitle}
                        </p>
                      </div>

                      {model.priceEstimateVnd && (
                        <div className="text-right">
                          <span className="text-[11px] font-mono text-heritage-muted block">Giá bộ Kit</span>
                          <span className="font-serif text-xl font-bold text-heritage-dark whitespace-nowrap">
                            {model.priceEstimateVnd}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-heritage-muted font-sans leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  {/* Architectural Specifications Table Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-heritage-border/70 text-xs font-mono">
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Quy cách:</span>
                      <span className="font-semibold text-heritage-dark">{model.sheetCount || 4} tờ bìa</span>
                    </div>
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Kích thước:</span>
                      <span className="font-semibold text-heritage-dark">
                        {model.dimensions.heightMm}×{model.dimensions.widthMm} mm
                      </span>
                    </div>
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Độ khó DIY:</span>
                      <span className="font-semibold text-heritage-dark">{model.assemblyTimeMinutes || 60} phút</span>
                    </div>
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Chất liệu:</span>
                      <span className="font-semibold text-heritage-dark truncate block" title={model.material}>
                        Bìa mỹ thuật &gt;180g
                      </span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  {model.features && (
                    <ul className="space-y-1.5 text-xs text-heritage-muted font-sans">
                      {model.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-heritage-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onSelectModelForInquiry(model.name)}
                      className="flex-1 py-3 px-5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-heritage-gold group-hover:text-heritage-sand" />
                      <span>{model.status === 'available' ? 'Đặt mua Kit (98.200 VNĐ)' : 'Đăng ký nhận tin'}</span>
                    </button>

                    <button
                      onClick={() => onSelectModelForViewer(model.id)}
                      className="p-3 rounded-xl border border-heritage-border hover:border-heritage-gold text-heritage-dark hover:bg-heritage-cream/40 transition-colors cursor-pointer"
                      title="Mở trong trình tương tác 3D"
                    >
                      <Compass className="w-4 h-4 text-heritage-gold" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dedicated Cross-Sell Showcase: Combo Dụng Cụ DIY Chuyên Dụng */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-white to-heritage-cream/40 border-2 border-heritage-gold/50 p-6 sm:p-10 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-spotlight rounded-bl-full pointer-events-none opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/15 text-heritage-dark text-xs font-mono font-semibold border border-heritage-gold/30">
                <Wrench className="w-3.5 h-3.5 text-heritage-gold" />
                <span>Ưu Đãi Bán Kèm Khi Mua Kit Mô Hình</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-dark">
                Combo Bộ Dụng Cụ DIY Chuyên Dụng <span className="text-gold-gradient">(+39.000 VNĐ)</span>
              </h3>

              <p className="text-sm text-heritage-muted font-sans leading-relaxed max-w-2xl">
                Để trải nghiệm lắp ráp trở nên mượt mà và chuẩn xác nhất, VietScape trang bị bộ 3 dụng cụ thủ công chuyên biệt, khắc phục hoàn toàn nỗi lo cong vênh hoặc rách nếp gấp:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-heritage-border/70 space-y-1 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-heritage-gold/10 text-heritage-gold flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-xs font-bold text-heritage-dark">Keo Dán Đầu Kim</h4>
                  <p className="text-[11px] text-heritage-muted">Khô trong 15 giây, đầu kim siêu nhỏ không lem bẩn và không nhăn giấy.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-heritage-border/70 space-y-1 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-heritage-gold/10 text-heritage-gold flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-xs font-bold text-heritage-dark">Nhíp Thép Đầu Cong</h4>
                  <p className="text-[11px] text-heritage-muted">Định vị chính xác các khe nẹp dưới 5mm, giúp ngón tay thao tác dễ dàng.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-heritage-border/70 space-y-1 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-heritage-gold/10 text-heritage-gold flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-xs font-bold text-heritage-dark">Dao Trổ Nghệ Thuật</h4>
                  <p className="text-[11px] text-heritage-muted">Lưỡi vát 30 độ sắc bén trổ dứt khoát các đường gờ giấy tinh vi.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right space-y-4 lg:border-l lg:border-heritage-border/60 lg:pl-8">
              <div className="space-y-1">
                <span className="text-xs font-mono text-heritage-muted block">Giá mua kèm Kit:</span>
                <div className="flex items-baseline justify-center lg:justify-end gap-2">
                  <span className="font-serif text-3xl font-bold text-emerald-800 whitespace-nowrap">
                    +39.000 VNĐ
                  </span>
                  <span className="text-xs font-mono line-through text-heritage-muted whitespace-nowrap">
                    65.000 VNĐ
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  Tiết kiệm 40% khi mua kèm
                </span>
              </div>

              <button
                onClick={() => onSelectModelForInquiry('Combo Kit + Bộ dụng cụ DIY (+39.000 VNĐ)')}
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Thêm Combo Vào Đơn Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollectionsSection;
