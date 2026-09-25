import React from 'react';
import { DongSonDrumMotif } from './HeritageMotifs';

interface MuseumPedestalProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
  minHeight?: string;
  badgeText?: string;
  spotlight?: boolean;
  children?: React.ReactNode;
}

export const MuseumPedestal: React.FC<MuseumPedestalProps> = ({
  imageSrc,
  imageAlt,
  className = '',
  minHeight = 'min-h-[420px]',
  badgeText,
  spotlight = true,
  children,
}) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden museum-pedestal p-8 flex items-center justify-center border border-heritage-border/80 ${minHeight} ${
        spotlight ? 'museum-spotlight' : ''
      } ${className}`}
    >
      {badgeText && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-xs font-mono text-heritage-muted bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-heritage-border/80 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-heritage-jade" />
          <span>{badgeText}</span>
        </div>
      )}

      {/* Subtle Background Bronze Drum Silhouette */}
      <div className="absolute bottom-[-10%] right-[-5%] opacity-10 pointer-events-none select-none text-heritage-dark">
        <DongSonDrumMotif size={240} />
      </div>

      {/* Model Display Render */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto max-h-[380px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>

      {children}
    </div>
  );
};

export default MuseumPedestal;
