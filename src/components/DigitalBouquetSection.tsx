import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DigitalBouquetSection() {
  const [stage, setStage] = useState<'seed' | 'sprout' | 'growing' | 'bouquet'>('seed');

  const handleSeedClick = () => {
    if (stage === 'seed') {
      setStage('sprout');
      setTimeout(() => setStage('growing'), 1200);
      setTimeout(() => {
        setStage('bouquet');
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fb7185', '#fef08a', '#c084fc']
        });
      }, 3000);
    }
  };

  const handleReset = () => {
    setStage('seed');
  };

  return (
    <section className="py-24 relative z-10 px-4 max-w-xl mx-auto text-center flex flex-col items-center">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3 border border-rose-200"
        >
          <Sparkles size={14} />
          <span>A Gift For You</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-serif text-gray-800 font-bold">
          Digital Bouquet 💐
        </h2>
        <p className="text-gray-500 mt-2 font-serif italic text-sm md:text-base">
          {stage === 'seed' && "Tap the magic seed to grow your bouquet"}
          {stage === 'sprout' && "Growing..."}
          {stage === 'growing' && "Blooming..."}
          {stage === 'bouquet' && "A bouquet grown just for you!"}
        </p>
      </div>

      {/* Interactive Growth Box */}
      <div className="relative w-80 h-96 bg-white/40 backdrop-blur-md rounded-[2.5rem] border-2 border-white/60 shadow-xl flex flex-col items-center justify-center overflow-hidden p-6">
        
        <AnimatePresence mode="wait">
          {stage === 'seed' && (
            <motion.div
              key="seed-stage"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleSeedClick}
              className="cursor-pointer flex flex-col items-center gap-4 group"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center shadow-inner border-2 border-amber-300/60"
              >
                <span className="text-5xl select-none animate-bounce">🌱</span>
              </motion.div>
              <p className="text-rose-600 font-medium text-sm bg-white/80 px-4 py-1.5 rounded-full shadow-xs border border-rose-100">
                Tap to plant seed ✨
              </p>
            </motion.div>
          )}

          {stage === 'sprout' && (
            <motion.div
              key="sprout-stage"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-7xl animate-pulse">🌿</span>
              <p className="text-xs text-gray-500 font-mono mt-4">Sprouting with love...</p>
            </motion.div>
          )}

          {stage === 'growing' && (
            <motion.div
              key="growing-stage"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <span className="text-8xl">🌸</span>
              <p className="text-xs text-rose-500 font-semibold mt-4">Flowers opening up...</p>
            </motion.div>
          )}

          {stage === 'bouquet' && (
            <motion.div
              key="bouquet-stage"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="flex flex-col items-center gap-4 z-10"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl drop-shadow-lg"
              >
                💐
              </motion.div>

              <div className="space-y-2 text-center">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-rose-600 px-2 leading-tight">
                  "If I could, I'd hand these to you in person."
                </h3>
                <p className="text-gray-600 text-xs font-serif italic">
                  Until then, here is a digital bouquet grown specially for you. 🌹🌻🌷
                </p>
              </div>

              <button
                onClick={handleReset}
                className="mt-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2 rounded-full hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw size={12} />
                <span>Grow Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
