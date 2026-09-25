import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Check, Eye } from 'lucide-react';
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
    'ngo-mon-hue': 'perspective',
  });

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
          badge="Bộ sưu tập di sản văn hóa"
          title={
            <>
              Tuyệt Tác Kiến Trúc <span className="text-gold-gradient">Thu Nhỏ</span>
            </>
          }
          subtitle="Từng tác phẩm là một công trình biểu tượng được số hóa và phục dựng nguyên vẹn theo chuẩn mực kiến trúc và khảo cổ học Việt Nam."
          dividerVariant="lotus"
        />

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center w-full">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl sm:rounded-full border border-heritage-border shadow-2xs flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 max-w-full">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all ${
                filter === 'all'
                  ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-xs'
                  : 'text-heritage-muted hover:text-heritage-dark'
              }`}
            >
              Tất cả tác phẩm ({modelsData.length})
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all ${
                filter === 'available'
                  ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-xs'
                  : 'text-heritage-muted hover:text-heritage-dark'
              }`}
            >
              Hiện có sẵn (2)
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-mono transition-all ${
                filter === 'upcoming'
                  ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-xs'
                  : 'text-heritage-muted hover:text-heritage-dark'
              }`}
            >
              Sắp ra mắt (2)
            </button>
          </div>
        </div>

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
                        Có sẵn giới hạn ({model.editionLimit} bản)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Đang chế tác bản mẫu
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
                        className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                          currentAngle === 'perspective'
                            ? 'bg-heritage-dark text-heritage-sand font-medium'
                            : 'text-heritage-muted hover:text-heritage-dark'
                        }`}
                      >
                        Phối cảnh
                      </button>
                      <button
                        onClick={() => toggleAngle(model.id, 'front')}
                        className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                          currentAngle === 'front'
                            ? 'bg-heritage-dark text-heritage-sand font-medium'
                            : 'text-heritage-muted hover:text-heritage-dark'
                        }`}
                      >
                        Chính diện
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectModelForViewer(model.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-heritage-gold hover:text-heritage-gold-dark transition-colors font-medium bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-heritage-border hover:border-heritage-gold shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem 3D tương tác</span>
                    </button>
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
                          <span className="text-[11px] font-mono text-heritage-muted block">Ước tính giá</span>
                          <span className="font-serif text-lg font-bold text-heritage-dark">
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
                      <span className="text-heritage-muted block text-[11px]">Thời kỳ:</span>
                      <span className="font-semibold text-heritage-dark">{model.era}</span>
                    </div>
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Kích thước:</span>
                      <span className="font-semibold text-heritage-dark">
                        {model.dimensions.heightMm}×{model.dimensions.widthMm} mm
                      </span>
                    </div>
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Trọng lượng:</span>
                      <span className="font-semibold text-heritage-dark">{model.dimensions.weightGrams} g</span>
                    </div>
                    <div>
                      <span className="text-heritage-muted block text-[11px]">Chất liệu:</span>
                      <span className="font-semibold text-heritage-dark truncate block" title={model.material}>
                        Resin 8K
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
                      className="flex-1 py-3 px-5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-heritage-gold group-hover:text-heritage-sand" />
                      <span>{model.status === 'available' ? 'Đăng ký sở hữu' : 'Đăng ký chờ sớm'}</span>
                    </button>

                    <button
                      onClick={() => onSelectModelForViewer(model.id)}
                      className="p-3 rounded-xl border border-heritage-border hover:border-heritage-gold text-heritage-dark hover:bg-heritage-cream/40 transition-colors"
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
      </div>
    </section>
  );
};

export default CollectionsSection;
