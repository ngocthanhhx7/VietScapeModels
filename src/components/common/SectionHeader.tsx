import React from 'react';
import { HeritageDivider } from './HeritageMotifs';

interface SectionHeaderProps {
  badge?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'center' | 'left';
  dividerVariant?: 'lotus' | 'drum' | 'minimal' | 'none';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  dividerVariant = 'lotus',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-3 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-heritage-gold/10 text-heritage-dark border border-heritage-gold/30 ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold" />
          {badge}
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-heritage-dark leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-heritage-muted text-base sm:text-lg leading-relaxed font-sans">
          {subtitle}
        </p>
      )}

      {dividerVariant !== 'none' && (
        <HeritageDivider variant={dividerVariant} className={isCenter ? 'mx-auto' : ''} />
      )}
    </div>
  );
};

export default SectionHeader;
