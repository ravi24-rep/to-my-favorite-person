import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Detailed realistic lipstick SVG
function RealisticKissSVG({ size = '100%', id = 'kiss' }: { size?: string; id?: string }) {
  return (
    <svg
      viewBox="0 0 200 180"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 30px rgba(190, 18, 60, 0.5))' }}
    >
      <defs>
        <radialGradient id={`${id}-lip-grad`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="40%" stopColor="#e11d48" />
          <stop offset="70%" stopColor="#be123c" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id={`${id}-lip-lower`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </radialGradient>
        <radialGradient id={`${id}-shine`} cx="35%" cy="30%" r="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={`${id}-texture`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter={`url(#${id}-texture)`}>
        {/* Upper lip - left side with cupid's bow */}
        <path
          d="M 30,90 C 35,65 55,55 75,60 C 85,62 90,70 100,68 C 110,70 115,62 125,60 C 145,55 165,65 170,90 C 150,85 130,82 100,85 C 70,82 50,85 30,90 Z"
          fill={`url(#${id}-lip-grad)`}
        />

        {/* Lower lip - fuller, more rounded */}
        <path
          d="M 30,95 C 50,92 70,90 100,92 C 130,90 150,92 170,95 C 165,120 150,145 130,155 C 115,162 105,163 100,163 C 95,163 85,162 70,155 C 50,145 35,120 30,95 Z"
          fill={`url(#${id}-lip-lower)`}
        />

        {/* Lip line / separation */}
        <path
          d="M 35,92 C 55,88 75,86 100,88 C 125,86 145,88 165,92"
          fill="none"
          stroke="#9f1239"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Cupid's bow definition */}
        <path
          d="M 85,68 C 90,60 95,58 100,62 C 105,58 110,60 115,68"
          fill="none"
          stroke="#881337"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </g>

      {/* Shine / gloss on upper lip */}
      <ellipse cx="80" cy="72" rx="18" ry="8" fill={`url(#${id}-shine)`} />
      <ellipse cx="120" cy="72" rx="18" ry="8" fill={`url(#${id}-shine)`} />

      {/* Shine on lower lip */}
      <ellipse cx="100" cy="120" rx="22" ry="12" fill="rgba(255,255,255,0.15)" />

      {/* Subtle lip wrinkle lines */}
      <g stroke="rgba(136, 19, 55, 0.25)" strokeWidth="0.8" fill="none">
        <path d="M 60,75 Q 65,70 70,75" />
        <path d="M 130,75 Q 135,70 140,75" />
        <path d="M 70,110 Q 80,115 90,110" />
        <path d="M 110,110 Q 120,115 130,110" />
        <path d="M 80,125 Q 90,132 100,128" />
        <path d="M 100,128 Q 110,132 120,125" />
        <path d="M 75,135 Q 85,142 100,140" />
        <path d="M 125,135 Q 115,142 100,140" />
      </g>

      {/* Outer lip edge smudge */}
      <g opacity="0.3">
        <path
          d="M 28,88 C 32,62 52,50 75,56 C 87,58 92,68 100,65 C 108,68 113,58 125,56 C 148,50 168,62 172,88"
          fill="none"
          stroke="#be123c"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 28,97 C 33,125 48,150 70,160 C 85,167 100,168 100,168 C 100,168 115,167 130,160 C 152,150 167,125 172,97"
          fill="none"
          stroke="#be123c"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// Mini kiss mark for scattered marks
function MiniKissSVG() {
  return (
    <svg viewBox="0 0 100 80" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mini-lip" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <filter id="mini-tex">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2" />
        </filter>
      </defs>
      <g filter="url(#mini-tex)" fill="url(#mini-lip)" opacity="0.8">
        <path d="M 15,40 C 25,25 40,25 50,35 C 60,25 75,25 85,40 C 70,43 60,45 50,45 C 40,45 30,43 15,40 Z" />
        <path d="M 15,46 C 30,48 40,51 50,51 C 60,51 70,48 85,46 C 75,65 65,75 50,75 C 35,75 25,65 15,46 Z" />
      </g>
    </svg>
  );
}

type KissMark = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

export function KissCounterSection() {
  const [count, setCount] = useState(0);
  const [showBigKiss, setShowBigKiss] = useState(false);
  const [miniKisses, setMiniKisses] = useState<KissMark[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: string; x: number; y: number; delay: number }[]>([]);
  const [hasUnlocked, setHasUnlocked] = useState(false);

  const triggerKiss = useCallback(() => {
    setCount(c => c + 1);
    setShowBigKiss(true);

    // Vibrate on mobile
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([50, 30, 80]);
    }

    // Create floating hearts
    const newHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now().toString() + i,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 20,
      delay: i * 0.15,
    }));
    setFloatingHearts(newHearts);

    // Hide big kiss after 2.5s
    setTimeout(() => {
      setShowBigKiss(false);
      setFloatingHearts([]);

      // Leave a small kiss mark at a random position in the area
      const newMark: KissMark = {
        id: Date.now().toString(),
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 60,
        rotation: Math.random() * 30 - 15,
        scale: 0.6 + Math.random() * 0.5,
      };
      setMiniKisses(prev => [...prev, newMark]);
    }, 2500);
  }, []);

  useEffect(() => {
    if (count === 50 && !hasUnlocked) {
      setHasUnlocked(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#f43f5e', '#ec4899', '#ffffff', '#fda4af'],
      });
    }
  }, [count, hasUnlocked]);

  return (
    <section className="py-24 relative z-10 px-4 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-serif text-gray-800 mb-3 text-center"
      >
        Virtual Kiss
      </motion.h2>
      <p className="text-gray-500 font-serif italic text-sm md:text-base mb-8 text-center">
        Tap the button and let me kiss you 💋
      </p>

      {/* Kiss Area - Frosted glass mirror */}
      <div className="relative w-full max-w-sm h-[420px] md:h-[480px] bg-white/15 backdrop-blur-lg rounded-[2.5rem] shadow-2xl border border-white/30 overflow-hidden">

        {/* Glass shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-pink-100/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

        {/* Counter at top */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <motion.div
            key={count}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/60 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-pink-100/60"
          >
            <span className="text-2xl font-bold text-pink-600">{count}</span>
            <span className="text-sm font-medium text-pink-400 ml-1.5">kisses</span>
          </motion.div>
        </div>

        {/* Unlocked badge */}
        <AnimatePresence>
          {hasUnlocked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg pointer-events-none"
            >
              ♾️ Unlimited Kisses Unlocked!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent mini kiss marks on the glass */}
        {miniKisses.map(mk => (
          <motion.div
            key={mk.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: mk.scale }}
            className="absolute pointer-events-none"
            style={{
              left: `${mk.x}%`,
              top: `${mk.y}%`,
              width: '50px',
              height: '40px',
              transform: `translate(-50%, -50%) rotate(${mk.rotation}deg)`,
            }}
          >
            <MiniKissSVG />
          </motion.div>
        ))}

        {/* BIG KISS OVERLAY - Full area kiss */}
        <AnimatePresence>
          {showBigKiss && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 flex items-center justify-center"
            >
              {/* Pink/red ripple rings */}
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute w-32 h-32 rounded-full border-4 border-rose-400/60"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
                className="absolute w-28 h-28 rounded-full border-2 border-pink-300/50"
              />

              {/* Red glow background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0.2] }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-radial from-rose-500/30 via-pink-500/10 to-transparent"
                style={{ background: 'radial-gradient(circle, rgba(225, 29, 72, 0.25) 0%, transparent 70%)' }}
              />

              {/* THE BIG KISS - fills most of the area */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  mass: 0.8,
                }}
                className="w-[85%] max-w-[320px] z-10"
              >
                <RealisticKissSVG id="big" />
              </motion.div>

              {/* Mwah text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-16 z-20"
              >
                <span className="text-3xl md:text-4xl font-serif italic text-rose-600 drop-shadow-lg font-bold">
                  Mwah! 💋
                </span>
              </motion.div>

              {/* Floating hearts bursting out */}
              {floatingHearts.map(heart => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.3, 1.2, 1, 0.6],
                    x: (Math.random() - 0.5) * 200,
                    y: -120 - Math.random() * 80,
                  }}
                  transition={{ duration: 1.8, delay: heart.delay, ease: 'easeOut' }}
                  className="absolute pointer-events-none text-xl md:text-2xl z-20"
                  style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                >
                  {['❤️', '💕', '💗', '💖', '💘', '🩷', '♥️', '💋'][Math.floor(Math.random() * 8)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* KISS ME BUTTON - centered in area */}
        {!showBigKiss && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.button
              onClick={triggerKiss}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative group"
            >
              {/* Pulsing glow ring */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-6 rounded-full bg-pink-400/20 blur-xl"
              />

              {/* Button itself */}
              <div className="relative bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 hover:from-rose-500 hover:via-rose-600 hover:to-rose-700 text-white px-10 py-5 rounded-full font-bold text-xl md:text-2xl shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 transition-all flex items-center gap-3 border border-rose-300/40">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl"
                >
                  💋
                </motion.span>
                Kiss Me
              </div>
            </motion.button>

            <p className="mt-4 text-pink-400/80 text-sm font-medium">
              Tap to receive a kiss!
            </p>
          </div>
        )}

        {/* Clear button */}
        <AnimatePresence>
          {miniKisses.length > 0 && !showBigKiss && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setMiniKisses([]);
                setCount(0);
                setHasUnlocked(false);
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/60 hover:bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-rose-500 font-medium text-xs transition-colors border border-rose-200/50 shadow-sm"
            >
              Clear Kisses
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
