import React from 'react';
import chimLacImg from '../../assets/motifs/chim-lac.png';

interface MotifProps {
  className?: string;
  size?: number | string;
  color?: string;
}

/**
 * Trống đồng Đông Sơn — Tâm sao đa cánh và các vòng hoa văn đồng tâm thiêng liêng
 */
export const DongSonDrumMotif: React.FC<MotifProps> = ({
  className = '',
  size = 64,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric sacred circles */}
    <circle cx="60" cy="60" r="56" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
    <circle cx="60" cy="60" r="50" stroke={color} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
    <circle cx="60" cy="60" r="44" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
    <circle cx="60" cy="60" r="32" stroke={color} strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.6" />
    <circle cx="60" cy="60" r="20" stroke={color} strokeWidth="1.2" strokeOpacity="0.7" />

    {/* Center 14-pointed solar star */}
    <path
      d="M60 42 L63 56 L77 50 L67 60 L78 69 L64 67 L68 81 L60 70 L52 81 L56 67 L42 69 L53 60 L43 50 L57 56 Z"
      fill={color}
      fillOpacity="0.8"
    />
    <circle cx="60" cy="60" r="3" fill={color} />

    {/* Symbolic Lac bird flight paths */}
    <path
      d="M60 12 C72 12 85 18 94 27 M108 60 C108 72 102 85 93 94 M60 108 C48 108 35 102 26 93 M12 60 C12 48 18 35 27 26"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.75"
    />
    {/* Geometric dot accents */}
    <circle cx="60" cy="8" r="1.5" fill={color} />
    <circle cx="112" cy="60" r="1.5" fill={color} />
    <circle cx="60" cy="112" r="1.5" fill={color} />
    <circle cx="8" cy="60" r="1.5" fill={color} />
  </svg>
);

/**
 * Hoa sen thời Lý — Cánh sen uốn lượn mềm mại, thanh tao và biểu trưng cho sự thoát tục
 */
export const LyLotusMotif: React.FC<MotifProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Center petal */}
    <path
      d="M50 15 C56 30 64 50 64 65 C64 74 58 80 50 80 C42 80 36 74 36 65 C36 50 44 30 50 15 Z"
      stroke={color}
      strokeWidth="2"
      fill={color}
      fillOpacity="0.12"
    />
    {/* Left inner petal */}
    <path
      d="M50 35 C42 42 26 54 26 68 C26 76 34 81 44 80 C45 74 46 65 50 55"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Right inner petal */}
    <path
      d="M50 35 C58 42 74 54 74 68 C74 76 66 81 56 80 C55 74 54 65 50 55"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Left outer flare */}
    <path
      d="M38 52 C26 58 14 68 15 78 C16 83 24 85 34 83"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Right outer flare */}
    <path
      d="M62 52 C74 58 86 68 85 78 C84 83 76 85 66 83"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Pedestal base coil */}
    <path
      d="M32 86 C40 88 50 89 60 88 C68 87 70 86 68 86"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="50" cy="48" r="2.5" fill={color} />
  </svg>
);

/**
 * Vân mây cổ — Dải mây cuộn triều Lý - Trần uyển chuyển mềm mại
 */
export const CloudScrollMotif: React.FC<MotifProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 40 C14 26 28 20 40 25 C48 14 66 12 76 22 C84 15 98 17 106 28 C114 36 112 46 102 48 C90 50 84 42 86 36 C88 30 96 32 94 38"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18 42 C24 48 38 48 46 42 C54 36 62 44 70 44 C80 44 88 40 94 36"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 3"
      strokeOpacity="0.7"
    />
    <path
      d="M38 28 C34 22 24 22 20 28 C16 34 22 42 32 40"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Họa tiết Hồi văn — Dải viền kỷ hà truyền thống liên tục, tượng trưng cho phúc lộc vô tận
 */
export const HoiVanFretMotif: React.FC<MotifProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={typeof size === 'number' ? size / 2 : size}
    viewBox="0 0 80 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M0 36 H24 V8 H10 V24 H18 V16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path
      d="M40 36 H64 V8 H50 V24 H58 V16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path
      d="M24 36 H40 M64 36 H80"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
    />
  </svg>
);

/**
 * Đường chia phân cách di sản — Kết hợp chỉ vàng thanh mảnh và hoa sen triều Lý
 */
export const HeritageDivider: React.FC<{
  className?: string;
  variant?: 'lotus' | 'drum' | 'minimal';
}> = ({ className = '', variant = 'lotus' }) => (
  <div className={`flex items-center justify-center gap-4 py-6 ${className}`}>
    <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-heritage-gold/40 to-heritage-gold" />
    <div className="text-heritage-gold flex items-center justify-center">
      {variant === 'lotus' && <LyLotusMotif size={28} />}
      {variant === 'drum' && <DongSonDrumMotif size={28} />}
      {variant === 'minimal' && (
        <span className="w-2 h-2 rotate-45 border border-heritage-gold bg-heritage-gold/20" />
      )}
    </div>
    <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent via-heritage-gold/40 to-heritage-gold" />
  </div>
);

/**
 * Biểu tượng Chim Lạc Đông Sơn mạ vàng (Vector SVG chuẩn khảo cổ Trống đồng Ngọc Lũ / Hoàng Hạ)
 * Đặc trưng: Mỏ dài thẳng vút nhọn khắc rãnh, mào lông vũ uốn lượn đôi tầng, cánh giương cao hoa văn răng lược (comb-teeth),
 * dải lông đuôi 3 chùm mềm mại lướt trong gió, dải gradient vàng đồng Đông Sơn (#FFF3C4 -> #F3D372 -> #E5B942 -> #C59B27 -> #8A6710).
 */
export const ChimLacBirdMotif: React.FC<{
  className?: string;
  width?: number | string;
  height?: number | string;
}> = ({ className = '', width = '100%', height = 'auto' }) => (
  <div
    className={`relative inline-flex items-center justify-center ${className}`}
    style={{ width, height }}
    aria-label="Biểu tượng Chim Lạc Trống đồng Đông Sơn"
  >
    {/* Archaeological SVG Specification & Dong Son Characteristic Metadata */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 select-none"
      viewBox="0 0 320 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Imperial Dong Son Gold Gradient */}
        <linearGradient id="chimLacImperialGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="25%" stopColor="#F3D372" />
          <stop offset="55%" stopColor="#E5B942" />
          <stop offset="80%" stopColor="#C59B27" />
          <stop offset="100%" stopColor="#8A6710" />
        </linearGradient>
        {/* Alias for backward compatibility */}
        <linearGradient id="chimLacGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="25%" stopColor="#F3D372" />
          <stop offset="55%" stopColor="#E5B942" />
          <stop offset="80%" stopColor="#C59B27" />
          <stop offset="100%" stopColor="#8A6710" />
        </linearGradient>

        {/* Radiant Solar Aura Glow Filter */}
        <filter id="lacAuraGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.2" result="glow" />
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0.95
              0 1 0 0 0.82
              0 0 1 0 0.35
              0 0 0 1.3 0"
            result="coloredGlow"
          />
          <feMerge>
            <feMergeNode in="coloredGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#lacAuraGlow)">
        {/* 1. Sinuous Extended Crown Crest Plumes (Mào lông vũ thần thoại vuốt dài về sau) */}
        <path d="M 82 72 C 92 50 114 34 154 26 C 138 38 118 52 104 68 Z" fill="url(#chimLacImperialGold)" />
        {/* 2. Wing Geometric Engravings (Vạch khắc hoa văn kỷ hà & lông vũ răng lược chạm nổi - comb-teeth) */}
        <path d="M 124 82 C 138 58 158 36 184 18" stroke="#6E4F06" strokeWidth="1.5" />
        {/* 3. Trailing Silk Ribbon Plumage (Đuôi dài xòe dải lông mềm mại lướt trong gió) */}
        <path d="M 194 92 C 224 84 258 76 304 68 C 280 82 248 94 204 98 Z" fill="url(#chimLacImperialGold)" />
      </g>
    </svg>

    {/* Authentic Masterwork Chim Lac Vector Asset (Tải lên trực tiếp từ cổ vật Trống đồng) */}
    <img
      src={chimLacImg}
      alt="Biểu tượng Chim Lạc Trống đồng Đông Sơn"
      className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(245,189,46,0.65)] select-none pointer-events-none"
      loading="eager"
    />
  </div>
);

/**
 * Trống đồng Đông Sơn Đại Bản (Grand Dong Son Drum) — 14 tia sáng, các vòng kỷ hà và đàn chim lạc
 */
export const GrandDongSonDrumMotif: React.FC<{
  className?: string;
  size?: number | string;
}> = ({ className = '', size = 400 }) => {
  const cx = 200;
  const cy = 200;
  const numPoints = 14;
  const outerR = 64;
  const innerR = 26;

  let starPath = '';
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    starPath += (i === 0 ? `M${x} ${y}` : ` L${x} ${y}`);
  }
  starPath += ' Z';

  const teethCount = 36;
  let teethPath = '';
  for (let i = 0; i < teethCount * 2; i++) {
    const angle = (i * Math.PI) / teethCount;
    const r = i % 2 === 0 ? 88 : 98;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    teethPath += (i === 0 ? `M${x} ${y}` : ` L${x} ${y}`);
  }
  teethPath += ' Z';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r="192" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="188" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
      <circle cx={cx} cy={cy} r="176" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="162" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="132" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="106" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="84" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="70" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />

      {/* 14-pointed solar star center */}
      <path d={starPath} fill="currentColor" fillOpacity="0.85" />
      <circle cx={cx} cy={cy} r="5" fill="currentColor" />

      {/* Sawtooth chevron band */}
      <path d={teethPath} stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" fill="currentColor" fillOpacity="0.15" />

      {/* Orbiting flying birds */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} ${cx} ${cy}) translate(${cx + 128}, ${cy - 10}) scale(0.22)`}>
          <path
            d="M0 25 C15 20 30 10 50 0 C40 15 35 30 45 40 C30 35 20 40 10 50 C12 40 10 30 0 25 Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          <path d="M50 0 L90 5 C75 18 60 22 45 25" stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.9" />
          <path d="M-20 35 C-5 35 5 30 15 25" stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.7" />
        </g>
      ))}
    </svg>
  );
};

