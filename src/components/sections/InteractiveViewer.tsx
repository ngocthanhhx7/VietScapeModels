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
  Headphones,
  Play,
  Pause,
  QrCode,
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

  // Podcast Preview State
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [podcastLanguage, setPodcastLanguage] = useState<'vi' | 'en'>('vi');

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

  // Podcast metadata dictionary
  const podcastEpisodes: Record<string, { vi: string; en: string; duration: string }> = {
    'chua-mot-cot': {
      vi: 'Giấc mơ hoa sen của vua Lý Thái Tông và huyền thoại trụ đá hồ Linh Chiểu',
      en: 'The Thousand-Year Sacred Lotus of the Ly Dynasty & The Stone Pillar Myth',
      duration: '04:30',
    },
    'lang-bac': {
      vi: 'Quảng trường Ba Đình lịch sử — Nơi giao hòa hồn thiêng xưa và nay',
      en: 'Ba Dinh Square — Architecture of Eternal Gratitude & Heritage',
      duration: '05:00',
    },
    'van-mieu': {
      vi: 'Lầu sao Khuê tỏa rạng bầu trời tri thức Thăng Long nghìn năm',
      en: 'Constellation Pavilion — The Enduring Beacon of Vietnamese Scholarship',
      duration: '04:15',
    },
  };

  const currentPodcast = podcastEpisodes[model.id] || podcastEpisodes['chua-mot-cot'];

  return (
    <section id="interactive-3d" className="py-24 px-6 relative bg-heritage-cream/40 border-y border-heritage-border/70 overflow-hidden">
      {/* Anchor helper for #interactive-viewer backward compatibility */}
      <div id="interactive-viewer" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Phòng trải nghiệm số hóa 3D & Audio Podcast"
          title={
            <>
              Trải Nghiệm Khảo Sát <span className="text-gold-gradient">Kiến Trúc Đa Chiều</span>
            </>
          }
          subtitle="Tương tác xoay góc nhìn mô hình giấy Low-poly, giải mã từng cấu kiện lịch sử và nghe thử Podcast thuyết minh song ngữ Anh - Việt tích hợp qua mã QR."
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
                setIsPlayingPodcast(false);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
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
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      angle === 'perspective'
                        ? 'bg-heritage-dark text-heritage-sand font-semibold shadow-2xs'
                        : 'text-heritage-muted hover:text-heritage-dark'
                    }`}
                  >
                    Phối Cảnh 3/4
                  </button>
                  <button
                    onClick={() => setAngle('front')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
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
                    className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                      lighting === 'museum' ? 'bg-heritage-dark text-heritage-gold' : 'text-heritage-muted'
                    }`}
                    title="Bảo Tàng (Tiêu chuẩn)"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLighting('dawn')}
                    className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                      lighting === 'dawn' ? 'bg-heritage-dark text-amber-400' : 'text-heritage-muted'
                    }`}
                    title="Ánh Bình Minh (Ấm áp)"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLighting('dusk')}
                    className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
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
                  className="p-1.5 rounded-md text-heritage-dark hover:bg-heritage-cream/80 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-heritage-border/60 cursor-pointer"
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
                  className="p-1.5 rounded-md text-heritage-dark hover:bg-heritage-cream/80 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-heritage-border/60 cursor-pointer"
                  title="Phóng to"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-md text-heritage-muted hover:text-heritage-dark hover:bg-heritage-cream/80 transition-colors border border-heritage-border/60 ml-1 cursor-pointer"
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

                {/* Hotspot Pins */}
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
                  💡 Nhấn vào điểm vàng để xem chi tiết kiến trúc &amp; vị trí quét mã QR
                </span>
                <span className="hidden sm:inline bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-heritage-border shadow-2xs">
                  Chế độ: {lighting === 'museum' ? 'Bảo Tàng' : lighting === 'dawn' ? 'Bình Minh' : 'Hoàng Hôn'}
                </span>
              </div>
            </div>

            {/* Bilingual Podcast Audio Preview Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-heritage-gold/40 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlayingPodcast(!isPlayingPodcast)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all cursor-pointer ${
                    isPlayingPodcast
                      ? 'bg-heritage-gold text-heritage-dark scale-105'
                      : 'bg-heritage-dark text-heritage-sand hover:bg-heritage-gold'
                  }`}
                  aria-label={isPlayingPodcast ? 'Tạm dừng nghe thử podcast' : 'Phát nghe thử podcast'}
                >
                  {isPlayingPodcast ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-heritage-gold bg-heritage-gold/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Headphones className="w-3 h-3" />
                      Podcast QR Song Ngữ
                    </span>
                    <span className="text-[11px] font-mono text-heritage-muted">
                      {currentPodcast.duration}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-heritage-dark line-clamp-1">
                    {podcastLanguage === 'vi' ? currentPodcast.vi : currentPodcast.en}
                  </h4>
                </div>
              </div>

              {/* Audio Waveform Simulator & Language Switch */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {/* Simulated Audio Wave */}
                <div className="flex items-center gap-1 h-6 px-2">
                  {[40, 75, 55, 90, 60, 80, 45, 70].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlayingPodcast ? 'bg-heritage-gold animate-pulse' : 'bg-heritage-border'
                      }`}
                      style={{
                        height: isPlayingPodcast ? `${h}%` : '30%',
                        animationDelay: `${i * 120}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* EN / VI Language Toggle */}
                <div className="inline-flex rounded-lg bg-heritage-cream/60 p-1 border border-heritage-border/70 text-xs font-mono">
                  <button
                    onClick={() => setPodcastLanguage('vi')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      podcastLanguage === 'vi'
                        ? 'bg-heritage-dark text-heritage-sand font-bold'
                        : 'text-heritage-muted hover:text-heritage-dark'
                    }`}
                  >
                    VN 🇻🇳
                  </button>
                  <button
                    onClick={() => setPodcastLanguage('en')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      podcastLanguage === 'en'
                        ? 'bg-heritage-dark text-heritage-sand font-bold'
                        : 'text-heritage-muted hover:text-heritage-dark'
                    }`}
                  >
                    EN 🇬🇧
                  </button>
                </div>
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
                      className="text-xs font-mono text-heritage-muted hover:text-heritage-dark cursor-pointer"
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
                      <span>Đặc điểm thiết kế Papercraft:</span>
                    </div>
                    <p className="text-heritage-muted">
                      Bóc tách thành các mảng đa giác Low-poly chuẩn tỉ lệ, đường cấn gập định vị sắc sảo dễ dán bằng keo chuyên dụng.
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
                    Chọn một điểm chú thích màu vàng trên mô hình để đọc chú giải lịch sử và phương pháp tạo hình mảng giấy 3D.
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Model Architecture Dossier */}
            <div className="p-6 rounded-2xl bg-white border border-heritage-border space-y-5 shadow-xs">
              <div>
                <span className="text-xs font-mono text-heritage-gold uppercase tracking-wider block">
                  Hồ sơ bộ Kit DIY
                </span>
                <h3 className="font-serif text-2xl font-bold text-heritage-dark mt-1">
                  {model.name}
                </h3>
                <p className="text-xs font-mono text-heritage-muted">{model.vietnameseTitle}</p>
              </div>

              <div className="space-y-2 text-xs font-sans text-heritage-muted leading-relaxed">
                <strong className="block text-heritage-dark font-medium font-serif text-sm">
                  Ý nghĩa văn hóa &amp; Lịch sử:
                </strong>
                <p>{model.architecturalSignificance}</p>
              </div>

              {/* Physical Spec Sheet */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-heritage-border/70 text-xs font-mono">
                <div>
                  <span className="text-heritage-muted block text-[11px]">Tỉ lệ kiến trúc:</span>
                  <span className="font-bold text-heritage-dark">{model.scale}</span>
                </div>
                <div>
                  <span className="text-heritage-muted block text-[11px]">Kích thước sau ráp:</span>
                  <span className="font-bold text-heritage-dark">
                    {model.dimensions.heightMm}×{model.dimensions.widthMm} mm
                  </span>
                </div>
                <div>
                  <span className="text-heritage-muted block text-[11px]">Chất liệu giấy:</span>
                  <span className="font-bold text-heritage-dark truncate block" title={model.material}>
                    Bìa mỹ thuật &gt;180g
                  </span>
                </div>
                <div>
                  <span className="text-heritage-muted block text-[11px]">Thời gian ráp:</span>
                  <span className="font-bold text-heritage-dark">~{model.assemblyTimeMinutes || 60} phút</span>
                </div>
              </div>

              {/* Phygital QR Feature Callout */}
              <div className="p-3 rounded-xl bg-heritage-gold/10 border border-heritage-gold/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white text-heritage-dark border border-heritage-gold/30 shrink-0">
                  <QrCode className="w-5 h-5 text-heritage-gold" />
                </div>
                <div className="text-[11px] font-sans">
                  <strong className="text-heritage-dark font-semibold block">Trải Nghiệm Phygital:</strong>
                  <span className="text-heritage-muted">Mở camera điện thoại quét mã QR trên hộp để nghe trọn bài podcast.</span>
                </div>
              </div>

              {/* Pre-order Action */}
              <button
                onClick={() => onPreorder(model.name)}
                className="w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold bg-heritage-dark text-heritage-sand hover:bg-heritage-gold transition-colors duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-heritage-gold" />
                <span>Đặt mua Kit {model.name} (98.200 VNĐ)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveViewer;
