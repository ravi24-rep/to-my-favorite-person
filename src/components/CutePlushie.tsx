import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

const MESSAGES = [
  'He loves you ❤️',
  'Keep scrolling! 🌸',
  'You are beautiful! ✨',
  'Psst... there is more below! 👇',
  'You two are perfect! 💕',
  'This page is for you! 🎀',
  'Follow me! 🐰✨',
  'Let me show you our love! 🌸',
];

export const CutePlushie: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 300 });

  // Handle random movement on screen
  useEffect(() => {
    const moveRabbit = () => {
      const margin = 120;
      // Safeguard check for SSR/window existence
      const width = typeof window !== 'undefined' ? window.innerWidth : 800;
      const height = typeof window !== 'undefined' ? window.innerHeight : 600;
      
      const maxX = width - margin;
      const maxY = height - margin;
      
      // Keep it within comfortable bounds of the viewport
      const randomX = margin / 2 + Math.random() * (maxX - margin);
      const randomY = margin / 2 + Math.random() * (maxY - margin);
      
      setPos({ x: randomX, y: randomY });
      
      // Randomly change message when moving
      setMessageIndex(prev => {
        let next = Math.floor(Math.random() * MESSAGES.length);
        while (next === prev) {
          next = Math.floor(Math.random() * MESSAGES.length);
        }
        return next;
      });
    };

    // Initial movement
    moveRabbit();

    // Move every 8-12 seconds
    const interval = setInterval(moveRabbit, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isHopping) return;
    setIsHopping(true);
    setShowHearts(true);
    
    // Jump message
    const nextMsg = Math.floor(Math.random() * MESSAGES.length);
    setMessageIndex(nextMsg);

    // Random dash to a new spot after hopping!
    setTimeout(() => {
      setIsHopping(false);
    }, 600);

    setTimeout(() => {
      setShowHearts(false);
    }, 2000);
  };

  return (
    <motion.div 
      animate={{ x: pos.x, y: pos.y }}
      transition={{ duration: 6, ease: "easeInOut" }}
      className="fixed z-50 flex flex-col items-center select-none pointer-events-none"
      style={{ left: 0, top: 0 }}
    >
      <div className="flex flex-col items-center pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="relative bg-white text-pink-500 px-4 py-2 rounded-2xl shadow-lg border border-pink-100 font-medium text-xs mb-3 max-w-[150px] text-center"
          >
            {MESSAGES[messageIndex]}
            {/* Speech bubble tail pointing towards the rabbit */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b border-r border-pink-100 transform rotate-45" />
          </motion.div>
        </AnimatePresence>

        <div className="relative cursor-pointer group" onClick={handleClick}>
          {/* Pink glow / aura */}
          <div className="absolute inset-0 bg-pink-300 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 transform scale-110" />
          
          {/* Heart Burst */}
          <AnimatePresence>
            {showHearts && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 pointer-events-none"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, x: 0, scale: 0 }}
                    animate={{
                      y: -50 - Math.random() * 60,
                      x: (Math.random() - 0.5) * 80,
                      scale: 1 + Math.random() * 0.8,
                      opacity: 0,
                    }}
                    transition={{ duration: 1 + Math.random() * 0.5, ease: "easeOut" }}
                    className="absolute text-pink-400"
                  >
                    <Heart fill="currentColor" size={18} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rabbit SVG with Bob/Bounce animation */}
          <motion.div
            animate={
              isHopping
                ? { y: [-30, 0, -15, 0] }
                : { y: [0, -6, 0] }
            }
            transition={
              isHopping
                ? { duration: 0.6, ease: "easeInOut" }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative z-10"
          >
            <svg width="72" height="80" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Fluffy Tail */}
              <circle cx="85" cy="85" r="12" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2.5" />
              
              {/* Left Ear */}
              <path d="M30 45 C15 5, 35 5, 40 40" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2.5" />
              <path d="M31 40 C22 15, 34 15, 38 38" fill="#ffb6c1" />
              
              {/* Right Ear */}
              <path d="M70 45 C85 5, 65 5, 60 40" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2.5" />
              <path d="M69 40 C78 15, 66 15, 62 38" fill="#ffb6c1" />
              
              {/* Body */}
              <ellipse cx="50" cy="75" rx="35" ry="32" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2.5" />
              
              {/* Head */}
              <circle cx="50" cy="45" r="30" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2.5" />
              
              {/* Rosy Cheeks */}
              <ellipse cx="28" cy="50" rx="7" ry="4" fill="#ffb6c1" opacity="0.7" />
              <ellipse cx="72" cy="50" rx="7" ry="4" fill="#ffb6c1" opacity="0.7" />
              
              {/* Big Eyes */}
              <circle cx="36" cy="42" r="6" fill="#4a4a4a" />
              <circle cx="34" cy="39" r="2" fill="#ffffff" />
              <circle cx="64" cy="42" r="6" fill="#4a4a4a" />
              <circle cx="62" cy="39" r="2" fill="#ffffff" />
              
              {/* Nose & Mouth */}
              <path d="M50 48 L48 51 L52 51 Z" fill="#ff8da1" />
              <path d="M45 53 Q50 57 55 53" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              
              {/* Paws */}
              <ellipse cx="30" cy="85" rx="8" ry="6" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2" />
              <ellipse cx="70" cy="85" rx="8" ry="6" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2" />
              
              {/* Hands */}
              <ellipse cx="32" cy="65" rx="6" ry="8" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2" transform="rotate(-30 32 65)" />
              <ellipse cx="68" cy="65" rx="6" ry="8" fill="#ffffff" stroke="#ffb6c1" strokeWidth="2" transform="rotate(30 68 65)" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
