import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PinchHeartSection() {
  const [scale, setScale] = useState(1);
  const [hasExploded, setHasExploded] = useState(false);
  const touchStartDist = useRef<number | null>(null);

  // Handle pinch gesture on touch screens
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDist.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      const factor = dist / touchStartDist.current;
      const newScale = Math.min(Math.max(scale * factor, 0.8), 12);
      setScale(newScale);
      touchStartDist.current = dist; // update baseline
    }
  };

  const handleTouchEnd = () => {
    touchStartDist.current = null;
  };

  // Trigger celebration when the heart becomes huge
  useEffect(() => {
    if (scale >= 6 && !hasExploded) {
      setHasExploded(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f43f5e', '#ec4899', '#ffffff', '#fda4af']
      });
    }
  }, [scale, hasExploded]);

  const resetHeart = () => {
    setScale(1);
    setHasExploded(false);
  };

  return (
    <section className="py-24 relative z-10 px-4 max-w-xl mx-auto text-center flex flex-col items-center">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-sm font-medium mb-3 border border-pink-200"
        >
          <Sparkles size={16} />
          <span>Interactive Magic</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif text-gray-800">Pinch the Heart 🤏</h2>
        <p className="text-gray-500 mt-2 font-serif italic text-sm md:text-base">
          {hasExploded 
            ? "Look how big it grew!"
            : "Use two fingers to pinch out (zoom) and expand the heart!"}
        </p>
      </div>

      {/* Main interactive area */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-80 h-80 bg-white/40 backdrop-blur-md rounded-[2.5rem] border-2 border-white/60 shadow-xl flex items-center justify-center overflow-hidden touch-none"
      >
        {/* Helper layout for desktop users / mouse dragging slider */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!hasExploded ? (
            <motion.div
              key="interactive-heart"
              style={{ scale }}
              className="relative cursor-pointer transition-transform duration-75"
              whileHover={{ scale: scale * 1.05 }}
            >
              <Heart 
                size={40} 
                className="text-rose-500 fill-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" 
              />
            </motion.div>
          ) : (
            <motion.div
              key="exploded-heart"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="flex flex-col items-center gap-4 z-10 px-4"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={120} className="text-rose-600 fill-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]" />
              </motion.div>
              
              <h3 className="text-3xl font-serif font-extrabold text-rose-600 tracking-wide mt-2">
                "My love for you." ❤️
              </h3>
              
              <button 
                onClick={resetHeart}
                className="mt-4 text-xs font-semibold text-rose-500 bg-white border border-rose-200 px-4 py-1.5 rounded-full shadow-xs hover:bg-rose-50 transition-colors"
              >
                Pinch Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop helper slider (fallback for mouse users who cannot pinch) */}
        {!hasExploded && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center gap-1.5 z-20 pointer-events-auto bg-white/70 px-4 py-2 rounded-xl border border-white/50 shadow-sm">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Desktop Helper Slider
            </span>
            <input 
              type="range" 
              min="1" 
              max="6.5" 
              step="0.05"
              value={scale} 
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        )}
      </div>
    </section>
  );
}
