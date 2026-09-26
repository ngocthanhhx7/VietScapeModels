import React from 'react';

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
 * Biểu tượng Chim Lạc Đông Sơn mạ vàng (Vector SVG nghệ thuật cao)
 */
export const ChimLacBirdMotif: React.FC<{
  className?: string;
  width?: number | string;
  height?: number | string;
}> = ({ className = '', width = '100%', height = 'auto' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="chimLacGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF3C4" />
        <stop offset="30%" stopColor="#E5B942" />
        <stop offset="70%" stopColor="#C59B27" />
        <stop offset="100%" stopColor="#8A6710" />
      </linearGradient>
      <filter id="lacAuraGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g filter="url(#lacAuraGlow)">
      {/* Main Body & Head & Beak */}
      <path
        d="M12 68 L52 62 C50 56 55 48 64 47 C72 46 80 50 86 56 C96 58 112 60 126 68 C140 76 158 80 180 82 C196 83 216 79 232 72 C214 86 186 92 164 90 C144 88 128 82 116 76 C106 78 94 78 82 74 C74 72 66 73 58 72 L12 68 Z"
        fill="url(#chimLacGoldGrad)"
      />

      {/* Crown Crest Plume (Mào Chim Lạc uốn cong thanh thoát) */}
      <path
        d="M64 47 C68 32 80 18 102 12 C90 22 84 34 82 46 C76 44 70 45 64 47 Z"
        fill="url(#chimLacGoldGrad)"
        fillOpacity="0.95"
      />
      <path
        d="M74 38 C88 28 106 20 122 18 C108 26 96 36 90 48"
        stroke="#FFF3C4"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Majestic Wing (Cánh sải uy nghiêm với họa tiết lông vũ Đông Sơn) */}
      <path
        d="M84 56 C92 36 108 14 134 4 C142 1 148 4 144 12 C138 22 130 32 128 36 C136 30 152 18 162 16 C166 15 168 18 164 24 C156 34 146 46 142 50 C152 44 168 34 178 33 C182 33 183 37 178 42 C168 52 152 64 140 70 C130 73 118 70 108 66 Z"
        fill="url(#chimLacGoldGrad)"
      />

      {/* Wing Feather Engravings (Khắc vạch lông vũ kỷ hà) */}
      <path
        d="M104 46 L124 18 M114 52 L142 28 M124 58 L156 40"
        stroke="#6E4F06"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />

      {/* Secondary Far Wing Tip (Cánh phụ phía xa) */}
      <path
        d="M72 48 C78 30 92 16 108 8 C112 6 114 9 110 14 C104 22 96 34 94 40 Z"
        fill="url(#chimLacGoldGrad)"
        fillOpacity="0.75"
      />

      {/* Eye of Chim Lạc (Mắt nhật nguyệt) */}
      <circle cx="58" cy="58" r="2.5" fill="#1C1714" />
      <circle cx="58.5" cy="57.5" r="0.8" fill="#FFF3C4" />

      {/* Trailing Ribbon Plumage (Dải lông đuôi ba chùm uốn lượn) */}
      <path
        d="M176 82 C194 80 216 75 234 66 C220 78 198 86 178 87 Z"
        fill="url(#chimLacGoldGrad)"
        fillOpacity="0.9"
      />
      <path
        d="M166 88 C186 91 210 90 228 84 C212 94 188 98 166 94 Z"
        fill="url(#chimLacGoldGrad)"
        fillOpacity="0.8"
      />
      <path
        d="M154 90 C172 98 196 102 216 100 C198 106 174 106 150 96 Z"
        fill="url(#chimLacGoldGrad)"
        fillOpacity="0.7"
      />

      {/* Traditional geometric chevron hatchings on body */}
      <path
        d="M88 64 L92 68 L88 72 M96 65 L100 69 L96 73 M104 67 L108 71 L104 74"
        stroke="#8A6710"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
    </g>
  </svg>
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

