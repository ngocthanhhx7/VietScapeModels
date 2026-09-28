import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ChimLacBirdMotif, GrandDongSonDrumMotif, CloudScrollMotif } from './HeritageMotifs';

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
  const [isClimax, setIsClimax] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
  });

  // Track desktop viewport for expansive aerial flight path
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset internal animation stage states on open
  useEffect(() => {
    if (isOpen) {
      setIsParting(false);
      setIsClimax(false);
      setIsTransitioning(false);
    }
  }, [isOpen]);

  // Clean finish
  const handleFinish = useCallback(() => {
    markHeritageEntranceSeen();
    document.body.style.overflow = '';
    onComplete();
  }, [onComplete]);

  // Instant graceful Skip
  const handleSkip = useCallback(() => {
    markHeritageEntranceSeen();
    document.body.style.overflow = '';
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  }, [onComplete, onSkip]);

  // Keyboard shortcut: ESC to skip instantly
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

  // Body scroll lock during entrance with guaranteed cleanup
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Guaranteed unmount cleanup
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Master 4-tier Epic Timeline: ~4.2s total (satisfying ~3.8s - 4.5s)
  useEffect(() => {
    if (!isOpen) return;

    // Stage 1 -> Stage 2: Curtain parting & Aura burst at 1.8s
    const partingTimer = setTimeout(() => {
      setIsParting(true);
    }, 1800);

    // Stage 2 -> Stage 3: Drum Climax & Typography at 2.8s
    const climaxTimer = setTimeout(() => {
      setIsClimax(true);
    }, 2800);

    // Stage 3 -> Stage 4 / Transition: Cross-fade to main page at 3.8s
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 3800);

    // Stage 4 Complete & unmount at 4.2s
    const completeTimer = setTimeout(() => {
      handleFinish();
    }, 4200);

    return () => {
      clearTimeout(partingTimer);
      clearTimeout(climaxTimer);
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, [isOpen, shouldReduceMotion, handleFinish]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="heritage-entrance-root"
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100] overflow-hidden select-none bg-[#0D0A08]"
        role="dialog"
        aria-label="Hiệu ứng Mở Màn Hoàng Triều VietScape Models"
      >
        {/* Skip Action Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          onClick={handleSkip}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 z-50 group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-widest text-heritage-sand/90 hover:text-white bg-black/60 hover:bg-black/90 border border-heritage-gold/40 hover:border-heritage-gold backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer"
          aria-label="Bỏ qua mở màn và khám phá ngay (phím ESC)"
        >
          <span>Bỏ qua / Khám phá ngay</span>
          <ArrowRight className="w-3.5 h-3.5 text-heritage-gold group-hover:translate-x-0.5 transition-transform" />
        </motion.button>

        {/* ============================================================== */}
        {/* STAGE 1: MYTHIC CLOUDS / ETHEREAL MIST (Top Left & Top Right)  */}
        {/* ============================================================== */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{
            x: isParting ? -260 : 0,
            opacity: isParting ? 0 : 0.7,
          }}
          transition={{
            duration: isParting ? 0.9 : 1.6,
            ease: 'easeOut',
          }}
          className="absolute top-4 sm:top-8 md:top-12 left-2 sm:left-8 md:left-12 lg:left-16 z-35 pointer-events-none text-heritage-gold/45"
        >
          <CloudScrollMotif size={160} className="w-28 sm:w-44 md:w-56 lg:w-64 h-auto drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{
            x: isParting ? 260 : 0,
            opacity: isParting ? 0 : 0.7,
          }}
          transition={{
            duration: isParting ? 0.9 : 1.6,
            ease: 'easeOut',
          }}
          className="absolute top-4 sm:top-8 md:top-12 right-2 sm:right-8 md:right-12 lg:right-16 z-35 pointer-events-none text-heritage-gold/45 scale-x-[-1]"
        >
          <CloudScrollMotif size={160} className="w-28 sm:w-44 md:w-56 lg:w-64 h-auto drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
        </motion.div>

        {/* Ambient Mist Pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isParting ? 0 : [0, 0.45, 0.3],
            scale: [0.8, 1.1, 1],
          }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-radial-spotlight opacity-40 filter blur-3xl pointer-events-none z-32"
        />

        {/* ============================================================== */}
        {/* STAGE 2: ROYAL SILK CURTAINS PARTING (Spring Physics)          */}
        {/* ============================================================== */}
        {/* Left Curtain */}
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: isParting ? '-102%' : '0%' }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 85,
            mass: 1.1,
          }}
          className="absolute top-0 bottom-0 left-0 w-[calc(50%+1.5px)] z-30 overflow-hidden shadow-[25px_0_50px_rgba(0,0,0,0.9)] border-r border-heritage-gold/40"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 royal-silk-curtain" />
          <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-heritage-gold/30 to-transparent pointer-events-none" />
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          initial={{ x: '0%' }}
          animate={{ x: isParting ? '102%' : '0%' }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 85,
            mass: 1.1,
          }}
          className="absolute top-0 bottom-0 right-0 w-[calc(50%+1.5px)] z-30 overflow-hidden shadow-[-25px_0_50px_rgba(0,0,0,0.9)] border-l border-heritage-gold/40"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 royal-silk-curtain" />
          <div className="absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-heritage-gold/30 to-transparent pointer-events-none" />
        </motion.div>

        {/* Center Split Radiant Light Beam */}
        {isParting && (
          <motion.div
            initial={{ opacity: 0.95, scaleX: 1 }}
            animate={{ opacity: 0, scaleX: 35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-transparent via-[#FFF3C4] to-transparent z-35 pointer-events-none filter blur-xs"
          />
        )}

        {/* ============================================================== */}
        {/* CENTER STAGE: SOLAR DRUM, CHIM LẠC & CLIMAX TYPOGRAPHY         */}
        {/* ============================================================== */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
          <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col items-center justify-center my-auto">
            {/* Luminous Solar Aura Shockwave / Burst */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                isParting
                  ? { opacity: [0.9, 0.45, 0.75], scale: [0.8, 2.2, 1.2] }
                  : { opacity: [0, 0.65, 0.8], scale: [0.6, 1, 1.05] }
              }
              transition={{
                duration: isParting ? 1.0 : 1.8,
                ease: 'easeOut',
              }}
              className="absolute w-[320px] h-[320px] xs:w-[380px] xs:h-[380px] sm:w-[500px] sm:h-[500px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] max-w-[55vh] max-h-[55vh] rounded-full bg-radial-spotlight opacity-75 filter blur-3xl pointer-events-none"
            />

            {/* Focal Heraldic Center: Drum Backdrop + Chim Lac Hero */}
            <div className="relative flex items-center justify-center w-full">
              {/* Rotating Grand Đông Sơn Drum (Sacred Solar Mandala Backdrop) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotate: 0 }}
                animate={{
                  opacity: isClimax ? 0.8 : isParting ? 0.55 : 0.35,
                  scale: isClimax ? 1.0 : isParting ? 0.95 : 0.85,
                  rotate: 360,
                }}
                transition={{
                  opacity: { duration: 0.8, ease: 'easeOut' },
                  scale: { duration: 0.9, ease: 'easeOut' },
                  rotate: { duration: 55, repeat: Infinity, ease: 'linear' },
                }}
                className="text-heritage-gold/60 pointer-events-none w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[390px] sm:h-[390px] md:w-[450px] md:h-[450px] lg:w-[490px] lg:h-[490px] max-w-[48vh] max-h-[48vh] aspect-square flex items-center justify-center"
              >
                <GrandDongSonDrumMotif size="100%" />
              </motion.div>

              {/* Chim Lạc Swooping Dynamic Flight along Bezier Trajectory (Facing Left, soaring from high clouds) */}
              <motion.div
                initial={{
                  x: isDesktop ? 460 : 220,
                  y: isDesktop ? -260 : -150,
                  scale: 0.38,
                  opacity: 0,
                  rotate: -18,
                }}
                animate={
                  isClimax
                    ? {
                        x: 0,
                        y: 0,
                        scale: 1.05,
                        opacity: 1,
                        rotate: 0,
                      }
                    : {
                        x: isDesktop ? [460, 180, 25, 0] : [220, 80, 10, 0],
                        y: isDesktop ? [-260, -85, -10, 0] : [-150, -45, -8, 0],
                        scale: [0.38, 0.85, 1.15, 1.0],
                        opacity: [0, 0.85, 1, 1],
                        rotate: [-18, -9, 2, 0],
                      }
                }
                transition={
                  isClimax
                    ? { duration: 0.8, ease: 'easeOut' }
                    : {
                        duration: 1.8,
                        times: [0, 0.45, 0.8, 1],
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="absolute z-10 flex items-center justify-center pointer-events-none"
              >
                {/* Radiant Bird Halo */}
                <div className="absolute inset-0 bg-heritage-gold/30 rounded-full filter blur-2xl scale-125 -z-10" />
                <ChimLacBirdMotif className="w-44 xs:w-52 sm:w-68 md:w-80 lg:w-96 max-h-[28vh] w-auto h-auto drop-shadow-[0_12px_36px_rgba(212,175,55,0.7)]" />
              </motion.div>
            </div>

            {/* Stage 3 Branding Typography Awakening */}
            <div className="text-center relative z-20 space-y-2 sm:space-y-2.5 md:space-y-3 mt-3 xs:mt-4 sm:mt-5 md:mt-6">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={
                  isClimax
                    ? { opacity: 1, y: 0, scale: 1 }
                    : isParting
                    ? { opacity: 0.7, y: 8, scale: 0.98 }
                    : { opacity: 0, y: 22 }
                }
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                <h1 className="font-serif text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[0.16em] sm:tracking-[0.22em] text-gold-gradient uppercase drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] whitespace-nowrap">
                  VIETSCAPE MODELS
                </h1>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  isClimax
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                className="flex items-center justify-center gap-2 sm:gap-3 py-0.5 sm:py-1"
              >
                <div className="w-10 xs:w-12 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent to-heritage-gold" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 border border-heritage-gold bg-heritage-gold/40" />
                <div className="w-10 xs:w-12 sm:w-24 md:w-32 h-px bg-gradient-to-l from-transparent to-heritage-gold" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={
                  isClimax
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                className="font-mono text-[9px] xs:text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.22em] sm:tracking-[0.32em] text-heritage-sand/90 font-medium drop-shadow-md"
              >
                Hồn Thiêng Kiến Trúc Việt
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HeritageEntrance;
