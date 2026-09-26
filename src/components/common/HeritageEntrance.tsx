import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ChimLacBirdMotif, GrandDongSonDrumMotif } from './HeritageMotifs';

export interface HeritageEntranceProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip?: () => void;
}

const STORAGE_KEY = 'vietscape_heritage_entrance_seen';

export const hasSeenHeritageEntrance = (): boolean => {
  try {
    return typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const markHeritageEntranceSeen = (): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }
  } catch {
    // Ignore storage restriction in strict sandboxes
  }
};

export const clearHeritageEntranceSeen = (): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage restriction in strict sandboxes
  }
};

export const HeritageEntrance: React.FC<HeritageEntranceProps> = ({
  isOpen,
  onComplete,
  onSkip,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isParting, setIsParting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Finish and clean up
  const handleFinish = useCallback(() => {
    markHeritageEntranceSeen();
    setIsDone(true);
    onComplete();
  }, [onComplete]);

  // Skip handler (graceful 350ms exit)
  const handleSkip = useCallback(() => {
    if (onSkip) onSkip();
    setIsParting(true);
    markHeritageEntranceSeen();
    setTimeout(() => {
      handleFinish();
    }, 350);
  }, [handleFinish, onSkip]);

  // Keyboard shortcut: ESC to skip
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleSkip]);

  // Body scroll lock during entrance
  useEffect(() => {
    if (isOpen && !isDone) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, isDone]);

  // Master timeline orchestration
  useEffect(() => {
    if (!isOpen || isDone) return;

    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        handleFinish();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Phase 1 -> Phase 2 trigger at 1.8s
    const partingTimer = setTimeout(() => {
      setIsParting(true);
    }, 1800);

    // Complete entrance at 2.8s
    const completeTimer = setTimeout(() => {
      handleFinish();
    }, 2800);

    return () => {
      clearTimeout(partingTimer);
      clearTimeout(completeTimer);
    };
  }, [isOpen, isDone, shouldReduceMotion, handleFinish]);

  if (!isOpen || isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="heritage-entrance-root"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] overflow-hidden select-none pointer-events-auto"
        role="dialog"
        aria-label="Hiệu ứng Mở Màn Hoàng Triều VietScape Models"
      >
        {/* Skip Action Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onClick={handleSkip}
          className="absolute top-5 right-6 z-50 group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-heritage-sand/90 hover:text-white bg-black/50 hover:bg-black/80 border border-heritage-gold/40 hover:border-heritage-gold backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer"
          aria-label="Bỏ qua mở màn và khám phá ngay"
        >
          <span>Bỏ qua / Khám phá ngay</span>
          <ArrowRight className="w-3.5 h-3.5 text-heritage-gold group-hover:translate-x-0.5 transition-transform" />
        </motion.button>

        {/* Left Royal Silk Curtain Panel */}
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: isParting ? '-102%' : '0%' }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 90,
            mass: 1.1,
          }}
          className="absolute top-0 bottom-0 left-0 w-[calc(50%+1.5px)] z-30 overflow-hidden shadow-[25px_0_50px_rgba(0,0,0,0.85)] border-r border-heritage-gold/40"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 royal-silk-curtain" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-heritage-gold/25 to-transparent pointer-events-none" />
        </motion.div>

        {/* Right Royal Silk Curtain Panel */}
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: isParting ? '102%' : '0%' }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 90,
            mass: 1.1,
          }}
          className="absolute top-0 bottom-0 right-0 w-[calc(50%+1.5px)] z-30 overflow-hidden shadow-[-25px_0_50px_rgba(0,0,0,0.85)] border-l border-heritage-gold/40"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 royal-silk-curtain" />
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-heritage-gold/25 to-transparent pointer-events-none" />
        </motion.div>

        {/* Center Mythic Stage: Solar Drum, Chim Lạc & Typography */}
        <motion.div
          animate={
            isParting
              ? { opacity: 0, scale: 1.08, filter: 'blur(12px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-6"
        >
          {/* Luminous Solar Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.7, 0.9], scale: [0.6, 1, 1.05] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] rounded-full bg-radial-spotlight opacity-75 filter blur-3xl"
          />

          {/* Rotating Grand Đông Sơn Drum */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
            animate={{ opacity: 0.55, scale: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeOut' },
              scale: { duration: 1.0, ease: 'easeOut' },
              rotate: { duration: 55, repeat: Infinity, ease: 'linear' },
            }}
            className="text-heritage-gold/60 pointer-events-none w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] flex items-center justify-center"
          >
            <GrandDongSonDrumMotif size="100%" />
          </motion.div>

          {/* Chim Lạc Swooping Dynamic Flight */}
          <motion.div
            initial={{ x: 180, y: -130, scale: 0.45, opacity: 0, rotate: -18 }}
            animate={{
              x: [180, 45, 0],
              y: [-130, -25, 0],
              scale: [0.45, 1.15, 1.0],
              opacity: [0, 1, 1],
              rotate: [-18, 4, 0],
            }}
            transition={{
              duration: 1.2,
              times: [0, 0.65, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 -mt-24 sm:-mt-36 mb-6"
          >
            <div className="absolute inset-0 bg-heritage-gold/25 rounded-full filter blur-xl scale-125 -z-10" />
            <ChimLacBirdMotif className="w-44 sm:w-64 h-auto drop-shadow-[0_12px_28px_rgba(212,175,55,0.5)]" />
          </motion.div>

          {/* Branding Typography Awakening */}
          <div className="text-center relative z-20 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: 'easeOut' }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.22em] text-gold-gradient uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                VIETSCAPE MODELS
              </h1>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.6, ease: 'easeOut' }}
              className="flex items-center justify-center gap-3 py-1"
            >
              <div className="w-16 sm:w-32 h-px bg-gradient-to-r from-transparent to-heritage-gold" />
              <span className="w-2 h-2 rotate-45 border border-heritage-gold bg-heritage-gold/40" />
              <div className="w-16 sm:w-32 h-px bg-gradient-to-l from-transparent to-heritage-gold" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-heritage-sand/90 font-medium drop-shadow-md"
            >
              Hồn Thiêng Kiến Trúc Việt
            </motion.p>
          </div>
        </motion.div>

        {/* Center Split Radiant Light Beam */}
        {isParting && (
          <motion.div
            initial={{ opacity: 0.95, scaleX: 1 }}
            animate={{ opacity: 0, scaleX: 30 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-transparent via-amber-200 to-transparent z-35 pointer-events-none filter blur-xs"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default HeritageEntrance;
