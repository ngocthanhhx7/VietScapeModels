import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareMore, X, Sparkles } from 'lucide-react';

/* ==========================================================================
   1. AUTHENTIC VECTOR ICONS (ZALO, MESSENGER, PHONE HANDSET)
   ========================================================================== */

/**
 * Authentic Zalo Vector Icon (Brand Blue #0068FF)
 */
export const ZaloIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 26,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 4C12.954 4 4 12.507 4 23c0 4.12 1.396 7.933 3.774 11.026L5.05 41.874a1.5 1.5 0 0 0 1.848 1.848l7.848-2.722C17.839 42.42 20.84 43 24 43c11.046 0 20-8.507 20-19S35.046 4 24 4z"
      fill="#0068FF"
    />
    <path
      d="M13 18.5h8.8l-7.2 10.2h7.6v2.3H12v-2l7.2-10.2H13v-2.3zm12.3 3.4h2.5v9.1h-2.5v-9.1zm0-3.4h2.5v2.2h-2.5V18.5zm4.8 3.4h2.4v1.3c.7-.9 1.8-1.5 3-1.5 2.1 0 3.8 1.7 3.8 4.7v4.7h-2.4v-4.4c0-1.6-.8-2.6-2-2.6s-2.4 1-2.4 2.6v4.4h-2.4v-9.2zm12.4 4.6c0 2.8 1.8 4.7 4.5 4.7 1.4 0 2.6-.6 3.3-1.6v1.4h2.4v-9.1h-2.4v1.4c-.7-1-1.9-1.6-3.3-1.6-2.7 0-4.5 1.9-4.5 4.8zm7.8 0c0 1.7-1.1 2.8-2.5 2.8s-2.5-1.1-2.5-2.8 1.1-2.8 2.5-2.8 2.5 1.1 2.5 2.8z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Authentic Facebook Messenger Vector Icon (Multi-stop Cyan-to-Purple Gradient)
 */
export const MessengerIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 26,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="vietscapeMessengerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00B2FE" />
        <stop offset="50%" stopColor="#006AFF" />
        <stop offset="100%" stopColor="#A033FF" />
      </linearGradient>
    </defs>
    <path
      d="M18 2C9.163 2 2 8.742 2 17.062c0 4.636 2.228 8.766 5.717 11.517.297.234.48.587.494.966l.128 3.011c.045 1.054 1.107 1.758 2.062 1.332l3.356-1.498c.277-.124.593-.133.877-.027A17.15 17.15 0 0 0 18 33.125c8.837 0 16-6.742 16-15.063C34 8.742 26.837 2 18 2z"
      fill="url(#vietscapeMessengerGradient)"
    />
    <path
      d="M8.8 21.2l5.4-8.6c.7-.9 1.9-.9 2.6-.1l4.1 4.1c.3.3.7.3 1 .1l5.4-4.1c.7-.5 1.5.3 1 1l-5.4 8.6c-.7.9-1.9.9-2.6.1l-4.1-4.1c-.3-.3-.7-.3-1-.1l-5.4 4.1c-.7.5-1.5-.3-1-1z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Hotline Phone Handset Icon
 */
export const PhoneCallIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 22,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ==========================================================================
   2. FRAMER MOTION ANIMATION CONFIGURATION
   ========================================================================== */

const dockContainerVariants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const dockItemVariants = {
  closed: {
    opacity: 0,
    y: 20,
    scale: 0.7,
    pointerEvents: 'none' as const,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    pointerEvents: 'auto' as const,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 24,
      mass: 0.8,
    },
  },
};

/* ==========================================================================
   3. PROPS INTERFACE (WITH OFFICIAL PROJECT DEFAULTS)
   ========================================================================== */

export interface FloatingContactDockProps {
  hotline?: string;
  hotlineDisplay?: string;
  zaloUrl?: string;
  messengerUrl?: string;
  facebookUrl?: string;
  className?: string;
  defaultExpanded?: boolean;
}

/* ==========================================================================
   4. MAIN COMPONENT IMPLEMENTATION
   ========================================================================== */

export const FloatingContactDock: React.FC<FloatingContactDockProps> = ({
  hotline = '0852699188',
  hotlineDisplay = '0852 699 188',
  zaloUrl = 'https://zalo.me/0852699188',
  messengerUrl = 'https://m.me/minquan27',
  facebookUrl = 'https://www.facebook.com/minquan27',
  className = '',
  defaultExpanded = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const dockRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside of the dock
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <aside
      ref={dockRef}
      aria-label="Kênh liên hệ trực tuyến VietScape Models"
      className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end select-none print:hidden ${className}`}
    >
      {/* --------------------------------------------------------------------
          EXPANDABLE CONTACT CHANNELS LIST
          -------------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="contact-channels-group"
            variants={dockContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col items-end gap-3.5 mb-3.5"
          >
            {/* 1. HOTLINE BUTTON */}
            <motion.div variants={dockItemVariants} className="relative flex items-center group">
              {/* Tooltip Label */}
              <div
                role="tooltip"
                className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 sm:group-hover:opacity-100 transition-all duration-200 translate-x-2 sm:group-hover:translate-x-0 hidden sm:flex flex-col items-end"
              >
                <div className="bg-[#1C1714]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl border border-heritage-gold/30 whitespace-nowrap text-right">
                  <div className="text-[12px] font-semibold text-heritage-gold flex items-center gap-1.5 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Hotline 24/7 (Gọi ngay)
                  </div>
                  <div className="text-[11px] font-mono text-heritage-sand/90 mt-0.5">
                    {hotlineDisplay}
                  </div>
                </div>
                {/* Arrow Pointer */}
                <div className="w-2 h-2 bg-[#1C1714]/95 border-r border-b border-heritage-gold/30 rotate-[-45deg] -mr-1 -mt-2.5" />
              </div>

              {/* Action Button */}
              <motion.a
                href={`tel:${hotline}`}
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.94 }}
                aria-label={`Gọi điện thoại trực tiếp hotline ${hotlineDisplay}`}
                className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#9E3524] via-[#C9472E] to-[#E25C43] text-white flex items-center justify-center shadow-lg hover:shadow-red-900/30 transition-shadow focus:outline-hidden focus-visible:ring-2 focus-visible:ring-heritage-gold"
              >
                {/* Continuous Heartbeat Ping Outer Ripples */}
                <span className="absolute -inset-1 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                <motion.span
                  className="absolute -inset-2.5 rounded-full border-2 border-red-500/40 pointer-events-none"
                  animate={{
                    scale: [0.95, 1.35, 1.55],
                    opacity: [0.7, 0.3, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />

                {/* Telephone Ring Wobble Animation */}
                <motion.div
                  animate={{
                    rotate: [0, -14, 14, -10, 10, -4, 4, 0],
                    scale: [1, 1.08, 1.08, 1.08, 1, 1, 1, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10"
                >
                  <PhoneCallIcon size={22} className="text-white drop-shadow-xs" />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* 2. ZALO BUTTON */}
            <motion.div variants={dockItemVariants} className="relative flex items-center group">
              {/* Tooltip Label */}
              <div
                role="tooltip"
                className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 sm:group-hover:opacity-100 transition-all duration-200 translate-x-2 sm:group-hover:translate-x-0 hidden sm:flex flex-col items-end"
              >
                <div className="bg-[#1C1714]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl border border-heritage-gold/30 whitespace-nowrap text-right">
                  <div className="text-[12px] font-semibold text-[#0084FF] flex items-center gap-1.5 justify-end">
                    Chat Zalo: {hotlineDisplay}
                  </div>
                  <div className="text-[11px] font-sans text-heritage-sand/80 mt-0.5">
                    Xem ảnh mẫu &amp; Hướng dẫn DIY
                  </div>
                </div>
                <div className="w-2 h-2 bg-[#1C1714]/95 border-r border-b border-heritage-gold/30 rotate-[-45deg] -mr-1 -mt-2.5" />
              </div>

              {/* Action Button */}
              <motion.a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.94 }}
                aria-label={`Mở khung trò chuyện Zalo số ${hotlineDisplay} với VietScape Models`}
                className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white shadow-lg border border-blue-100 flex items-center justify-center p-1.5 hover:shadow-blue-500/25 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0068FF]"
              >
                <ZaloIcon size={32} className="drop-shadow-xs" />
              </motion.a>
            </motion.div>

            {/* 3. MESSENGER BUTTON */}
            <motion.div variants={dockItemVariants} className="relative flex items-center group">
              {/* Tooltip Label */}
              <div
                role="tooltip"
                className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 sm:group-hover:opacity-100 transition-all duration-200 translate-x-2 sm:group-hover:translate-x-0 hidden sm:flex flex-col items-end"
              >
                <div className="bg-[#1C1714]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl border border-heritage-gold/30 whitespace-nowrap text-right">
                  <div className="text-[12px] font-semibold text-[#A033FF] flex items-center gap-1.5 justify-end">
                    Facebook Messenger
                  </div>
                  <div className="text-[11px] font-sans text-heritage-sand/80 mt-0.5">
                    Inbox ngay tới minquan27
                  </div>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-purple-300 hover:underline mt-0.5"
                  >
                    Xem Facebook: minquan27
                  </a>
                </div>
                <div className="w-2 h-2 bg-[#1C1714]/95 border-r border-b border-heritage-gold/30 rotate-[-45deg] -mr-1 -mt-2.5" />
              </div>

              {/* Action Button */}
              <motion.a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Mở trò chuyện qua Facebook Messenger tới minquan27"
                className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white shadow-lg border border-purple-100 flex items-center justify-center p-1.5 hover:shadow-purple-500/25 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <MessengerIcon size={32} className="drop-shadow-xs" />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------------------------
          MAIN TOGGLE FLOATING ACTION BUTTON (FAB)
          -------------------------------------------------------------------- */}
      <div className="relative group">
        {/* Tooltip on Hover when Closed */}
        {!isOpen && (
          <div
            role="tooltip"
            className="pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 opacity-0 sm:group-hover:opacity-100 transition-all duration-200 translate-x-2 sm:group-hover:translate-x-0 hidden sm:flex flex-col items-end"
          >
            <div className="bg-[#1C1714]/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-xl border border-heritage-gold/40 whitespace-nowrap text-right">
              <div className="text-[12px] font-semibold text-heritage-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Hỗ trợ trực tuyến (3 kênh)
              </div>
              <div className="text-[10px] font-mono text-heritage-sand/70 mt-0.5">
                Hotline • Zalo • Messenger
              </div>
            </div>
            <div className="w-2 h-2 bg-[#1C1714]/95 border-r border-b border-heritage-gold/40 rotate-[-45deg] -mr-1 -mt-2.5" />
          </div>
        )}

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Thu gọn danh sách kênh liên hệ' : 'Mở danh sách kênh liên hệ trực tuyến'}
          className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-heritage-gold border-2 ${
            isOpen
              ? 'bg-[#2A211D] border-heritage-gold-light text-heritage-sand shadow-pedestal-elevated'
              : 'bg-heritage-dark border-heritage-gold text-heritage-sand hover:border-heritage-gold-light hover:shadow-spotlight'
          }`}
        >
          {/* Subtle Golden Radial Glow */}
          <div className="absolute inset-0 rounded-full bg-radial-spotlight opacity-50 pointer-events-none" />

          {/* Active Online Status Badge (Only when closed) */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-heritage-dark items-center justify-center text-[8px] font-bold text-white">
                3
              </span>
            </span>
          )}

          {/* Rotating Icon Morphing */}
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="w-full h-full flex items-center justify-center text-heritage-sand"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-heritage-gold-light" />
            ) : (
              <MessageSquareMore className="w-6 h-6 text-heritage-gold" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </aside>
  );
};

export default FloatingContactDock;
