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
