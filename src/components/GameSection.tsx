import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const messages = [
  "You are beautiful.",
  "Thank you for everything.",
  "I'm so proud of you.",
  "I love you endlessly.",
  "You are my sunshine."
];

export function GameSection() {
  const [hearts, setHearts] = useState<{ id: number; left: number; speed: number; delay: number }[]>([]);
  const [caughtMsg, setCaughtMsg] = useState<string | null>(null);
  const [caughtCount, setCaughtCount] = useState(0);

  useEffect(() => {
    // Generate floating hearts
    const initialHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      speed: 10 + Math.random() * 15,
      delay: Math.random() * 5
    }));
    setHearts(initialHearts);
  }, []);

  const catchHeart = (id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCaughtMsg(randomMsg);
    setCaughtCount(c => c + 1);
    
    // Confetti on catch
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#C8A2FF', '#E0C3FC', '#FFFFFF']
    });

    if (caughtCount + 1 === 5) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#C8A2FF', '#E0C3FC', '#FFFFFF', '#FFD6E8'],
          disableForReducedMotion: true
        });
      }, 500);
    }

    setTimeout(() => setCaughtMsg(null), 3000);
  };

  return (
    <section className="py-24 relative z-10 px-4 min-h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-purple-50/50 to-[#F3E8FF] rounded-3xl mx-4 my-12 border border-purple-200/40 shadow-inner">
      <div className="text-center mb-8 relative z-20">
        <h2 className="text-3xl md:text-5xl font-serif text-purple-900 mb-4">Catch a Heart</h2>
        <p className="text-purple-700/80 text-lg">Tap a floating heart for a message...</p>
        <p className="text-sm font-semibold text-purple-600 mt-4 bg-white/60 inline-block px-4 py-1 rounded-full shadow-sm">
          Caught: {caughtCount}
        </p>
      </div>

      <AnimatePresence>
        {caughtMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute z-30 bg-purple-900/90 backdrop-blur px-8 py-4 rounded-full shadow-2xl text-xl font-medium text-purple-50 border border-purple-400/50 text-center"
          >
            💜 {caughtMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ y: '120vh', opacity: 0, rotate: -20 }}
            animate={{ y: '-20vh', opacity: [0, 1, 1, 0], rotate: 20 }}
            transition={{ 
              duration: heart.speed, 
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute pointer-events-auto cursor-pointer drop-shadow-xl hover:scale-125 transition-transform"
            style={{ left: `${heart.left}%` }}
            onClick={() => catchHeart(heart.id)}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#C8A2FF" stroke="#A881DF" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
