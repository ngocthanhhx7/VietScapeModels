import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Sunset,
  Sparkles,
  Info,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { DongSonDrumMotif } from '../common/HeritageMotifs';
import { modelsData } from '../../data/modelsData';
import { ArchitecturalHotspot } from '../../types';

interface InteractiveViewerProps {
  initialModelId?: string;
  onPreorder: (modelName: string) => void;
}

export const InteractiveViewer: React.FC<InteractiveViewerProps> = ({
  initialModelId = 'chua-mot-cot',
  onPreorder,
}) => {
  const [selectedModelId, setSelectedModelId] = useState(initialModelId);
  const [angle, setAngle] = useState<'perspective' | 'front'>('perspective');
  const [zoom, setZoom] = useState<number>(1.0);
  const [lighting, setLighting] = useState<'museum' | 'dawn' | 'dusk'>('museum');
  const [activeHotspot, setActiveHotspot] = useState<ArchitecturalHotspot | null>(null);

  const model = modelsData.find((m) => m.id === selectedModelId) || modelsData[0];

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 1.0));
  const handleReset = () => {
    setZoom(1.0);
    setAngle('perspective');
    setActiveHotspot(null);
    setLighting('museum');
  };

  // Lighting classes for canvas effect
  const lightingStyles = {
    museum: 'bg-radial-gallery',
    dawn: 'bg-gradient-to-tr from-[#FAF3E0] via-[#FFF9F0] to-[#F5E6CC]',
    dusk: 'bg-gradient-to-tr from-[#251E1A] via-[#332722] to-[#45332B] text-heritage-sand',
  };

  return (
    <section id="interactive-3d" className="py-24 px-6 relative bg-heritage-cream/40 border-y border-heritage-border/70 overflow-hidden">
      {/* Anchor helper for #interactive-viewer backward compatibility */}
      <div id="interactive-viewer" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Phòng trưng bày số hóa 3D"
          title={
            <>
              Trải Nghiệm Khảo Sát <span className="text-gold-gradient">Kiến Trúc Đa Chiều</span>
            </>
          }
          subtitle="Tương tác trực tiếp với các góc nhìn mô hình, phóng to vi chi tiết kết cấu và khám phá câu chuyện phía sau từng cấu kiện kiến trúc cổ truyền."
          dividerVariant="lotus"
        />

        {/* Model Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {modelsData.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModelId(m.id);
                setActiveHotspot(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                m.id === selectedModelId
                  ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-md ring-2 ring-heritage-gold/50'
                  : 'bg-white border border-heritage-border text-heritage-muted hover:text-heritage-dark hover:bg-white/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold" />
              <span>{m.name}</span>
              <span className="text-[10px] text-heritage-gold opacity-80">({m.scale})</span>
            </button>
          ))}
        </div>

        {/* Main Studio Interactive Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center 3D Stage (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Top Toolbar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-heritage-border shadow-xs">
              {/* Angles Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-heritage-muted hidden sm:inline mr-1">
                  Góc nhìn:
                </span>
                <div className="inline-flex rounded-lg bg-heritage-cream/60 p-1 border border-heritage-border/70">
                  <button
                    onClick={() => setAngle('perspective')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      angle === 'perspective'
                        ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-2xs'
                        : 'text-heritage-muted hover:text-heritage-dark'
                    }`}
                  >
                    Phối Cảnh 3/4
                  </button>
                  <button
                    onClick={() => setAngle('front')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      angle === 'front'
                        ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-2xs'
                        : 'text-heritage-muted hover:text-heritage-dark'
                    }`}
                  >
                    Chính Diện (Front)
                  </button>
                </div>
              </div>

              {/* Lighting Presets */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-heritage-muted hidden sm:inline mr-1">
                  Ánh sáng:
                </span>
                <div className="inline-flex rounded-lg bg-heritage-cream/60 p-1 border border-heritage-border/70">
                  <button
                    onClick={() => setLighting('museum')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      lighting === 'museum' ? 'bg-heritage-dark text-heritage-gold' : 'text-heritage-muted'
                    }`}
                    title="Bảo Tàng (Tiêu chuẩn)"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLighting('dawn')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      lighting === 'dawn' ? 'bg-heritage-dark text-amber-400' : 'text-heritage-muted'
                    }`}
                    title="Ánh Bình Minh (Ấm áp)"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLighting('dusk')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      lighting === 'dusk' ? 'bg-heritage-dark text-orange-400' : 'text-heritage-muted'
                    }`}
                    title="Hoàng Hôn Cổ Kính"
                  >
                    <Sunset className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Zoom & Reset Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1.0}
                  className="p-1.5 rounded-md text-heritage-dark hover:bg-heritage-cream/80 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-heritage-border/60"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-heritage-dark w-12 text-center font-medium">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 2.0}
                  className="p-1.5 rounded-md text-heritage-dark hover:bg-heritage-cream/80 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-heritage-border/60"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-md text-heritage-muted hover:text-heritage-dark hover:bg-heritage-cream/80 transition-colors border border-heritage-border/60 ml-1"
                  title="Đặt lại góc nhìn"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Viewport Stage */}
            <div
              className={`relative rounded-3xl overflow-hidden border border-heritage-border/80 shadow-pedestal min-h-[500px] flex items-center justify-center p-8 transition-colors duration-500 ${
                lightingStyles[lighting]
              }`}
            >
              {/* Subtle watermark in stage */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-heritage-gold font-semibold bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-heritage-gold/30">
                  {model.scale} — {model.name}
                </span>
              </div>

              {/* Background Bronze motif faint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <DongSonDrumMotif size={360} />
              </div>

              {/* Scalable Model Container with Hotspots */}
              <div
                className="relative z-10 w-full flex items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={model.views[angle]}
                  alt={`${model.name} - ${angle}`}
                  className="max-h-[420px] max-w-full object-contain drop-shadow-2xl select-none pointer-events-none"
                />

                {/* Hotspot Pins (Only when zoom is 1.0 or moderate to prevent drift) */}
                {model.hotspots &&
                  model.hotspots.map((hs) => {
                    const isSelected = activeHotspot?.id === hs.id;
                    return (
                      <button
                        key={hs.id}
                        onClick={() => setActiveHotspot(isSelected ? null : hs)}
                        style={{
                          left: `${hs.xPercent}%`,
                          top: `${hs.yPercent}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer transition-transform ${
                          isSelected ? 'scale-125' : 'hover:scale-110'
                        }`}
                        aria-label={`Hotspot: ${hs.title}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all ${
                            isSelected
                              ? 'bg-heritage-gold text-heritage-dark ring-4 ring-heritage-gold/40'
                              : 'bg-heritage-dark text-heritage-sand hover:bg-heritage-gold'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        </span>

                        {/* Hover Tooltip Title */}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-heritage-dark text-heritage-sand text-[10px] font-mono py-1 px-2 rounded-md shadow-md pointer-events-none z-40">
                          {hs.title}
                        </span>
                      </button>
                    );
                  })}
              </div>

              {/* Bottom Stage Hint */}
              <div className="absolute bottom-4 left-3 right-3 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-[11px] font-mono text-heritage-muted z-20 pointer-events-none">
                <span className="bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-heritage-border text-center sm:text-left shadow-2xs">
                  💡 Nhấn vào các điểm đánh dấu trên mô hình để xem giải mã kiến trúc
                </span>
                <span className="hidden sm:inline bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-heritage-border shadow-2xs">
                  Chế độ hiển thị: {lighting.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Right Information & Hotspot Inspector (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Hotspot Inspector Card */}
            <AnimatePresence mode="wait">
              {activeHotspot ? (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 rounded-2xl bg-white border-2 border-heritage-gold shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-gold font-semibold bg-heritage-gold/15 px-2.5 py-0.5 rounded-full">
                      Cấu kiện giải mã
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-xs font-mono text-heritage-muted hover:text-heritage-dark"
                    >
                      Đóng
                    </button>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-bold text-heritage-dark">
                      {activeHotspot.title}
                    </h4>
                    <p className="text-sm text-heritage-muted font-sans mt-2 leading-relaxed">
                      {activeHotspot.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-heritage-sand/60 border border-heritage-border/70 text-xs font-mono text-heritage-dark space-y-1">
                    <div className="flex items-center gap-1.5 text-heritage-gold font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Đặc điểm chế tác thu nhỏ:</span>
                    </div>
                    <p className="text-heritage-muted">
                      Được phóng tác chuẩn xác theo nguyên lý kết cấu mộng ngàm truyền thống, độ dung sai dưới 0.05mm.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="p-6 rounded-2xl bg-white/70 border border-heritage-border text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-heritage-cream flex items-center justify-center text-heritage-gold mx-auto">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-heritage-dark">
                    Khám phá chi tiết cấu trúc
                  </h4>
                  <p className="text-xs text-heritage-muted font-sans leading-relaxed">
                    Chọn một điểm chú thích màu vàng trên mô hình để đọc chú giải lịch sử và phương pháp phục dựng cấu kiện.
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Model Architecture Dossier */}
            <div className="p-6 rounded-2xl bg-white border border-heritage-border space-y-5 shadow-xs">
              <div>
                <span className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">
                  Hồ sơ công trình
                </span>
                <h3 className="font-serif text-2xl font-bold text-heritage-dark mt-1">
                  {model.name}
                </h3>
                <p className="text-xs font-mono text-heritage-muted">{model.vietnameseTitle}</p>
              </div>

              <div className="space-y-2 text-xs font-sans text-heritage-muted leading-relaxed">
                <strong className="block text-heritage-dark font-medium font-serif text-sm">
                  Giá trị kiến trúc & Lịch sử:
                </strong>
                <p>{model.architecturalSignificance}</p>
              </div>

              {/* Physical Spec Sheet */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-heritage-border/70 text-xs font-mono">
                <div>
                  <span className="text-heritage-muted block text-[11px]">Tỉ lệ:</span>
                  <span className="font-bold text-heritage-dark">{model.scale}</span>
                </div>
                <div>
                  <span className="text-heritage-muted block text-[11px]">Kích thước:</span>
                  <span className="font-bold text-heritage-dark">
                    {model.dimensions.heightMm}×{model.dimensions.widthMm} mm
                  </span>
                </div>
                <div>
                  <span className="text-heritage-muted block text-[11px]">Chất liệu:</span>
                  <span className="font-bold text-heritage-dark truncate block" title={model.material}>
                    Resin 8K + Gỗ
                  </span>
                </div>
                <div>
                  <span className="text-heritage-muted block text-[11px]">Số bản giới hạn:</span>
                  <span className="font-bold text-heritage-dark">{model.editionLimit} bản</span>
                </div>
              </div>

              {/* Pre-order Action */}
              <button
                onClick={() => onPreorder(model.name)}
                className="w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-colors duration-300 flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-heritage-gold" />
                <span>Đăng ký tác phẩm {model.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveViewer;
