import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export function BackgroundEffects({ isEntered }: { isEntered: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number; duration: number; size: number }[]>([]);
  const [clickHearts, setClickHearts] = useState<FloatingHeart[]>([]);

  // Slow ambient falling background hearts
  useEffect(() => {
    if (!isEntered) return;
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      size: 8 + Math.random() * 12,
    }));
    setParticles(newParticles);
  }, [isEntered]);

  // Click / Touch Heart Spawner (Finger Hearts)
  useEffect(() => {
    if (!isEntered) return;

    const colors = [
      '#fda4af', // pink-300
      '#f43f5e', // rose-500
      '#ec4899', // pink-500
      '#d946ef', // fuchsia-500
      '#a855f7', // purple-500
      '#c084fc', // purple-400
    ];

    const handlePointerDown = (e: PointerEvent) => {
      // Don't spawn if tapping on buttons or inputs directly (optional, but nice to let them spawn everywhere)
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        // Still allow small decoration but let's do it regardless to make it feel responsive
      }

      const id = Date.now().toString() + Math.random().toString();
      const newHeart: FloatingHeart = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: 14 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 40 - 20,
      };

      setClickHearts((prev) => [...prev, newHeart]);

      // Clean up after animation finishes
      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1500);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isEntered]);

  if (!isEntered) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Falling Background Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-[-5%]"
            initial={{ y: '-10vh', x: `${p.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              opacity: [0, 0.4, 0.4, 0],
              rotate: 360,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="#FFD6E8" opacity="0.6" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Interactive Finger Hearts */}
      <AnimatePresence>
        {clickHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0, x: h.x, y: h.y, rotate: h.rotation }}
            animate={{
              opacity: 0,
              scale: [1, 1.4, 0.8],
              y: h.y - 120 - Math.random() * 40,
              x: h.x + (Math.random() * 60 - 30),
              rotate: h.rotation + (Math.random() * 30 - 15),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute pointer-events-none z-50 select-none"
            style={{
              x: '-50%',
              y: '-50%',
            }}
          >
            <svg
              width={h.size}
              height={h.size}
              viewBox="0 0 24 24"
              fill={h.color}
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.15))' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
