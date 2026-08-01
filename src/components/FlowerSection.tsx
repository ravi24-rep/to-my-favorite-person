import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Sun, Sparkles, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FlowerSection: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Track highest stage ever reached so petals don't re-collapse when stage changes
  const maxStageReached = useRef(0);

  const getStage = (p: number) => {
    if (p >= 100) return 4;
    if (p >= 75) return 3;
    if (p >= 50) return 2;
    if (p >= 25) return 1;
    return 0;
  };

  const stage = getStage(progress);

  useEffect(() => {
    if (stage > maxStageReached.current) {
      maxStageReached.current = stage;
    }
  }, [stage]);

  const grow = (action: string) => {
    if (progress < 100) {
      setLastAction(action);
      const newProgress = Math.min(progress + 25, 100);
      setProgress(newProgress);
      
      if (newProgress === 100) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#ffc0cb', '#ff69b4', '#9f1239']
        });
      }
    }
  };

  const reset = () => {
    setProgress(0);
    setLastAction(null);
    maxStageReached.current = 0;
  };

  const stages = [
    "Planting the Seed",
    "A Little Sprout",
    "Growing a Bud",
    "Blooming Rose",
    "Our Beautiful Garden"
  ];

  return (
    <section className="py-20 bg-pink-50 relative overflow-hidden" id="grow">
      {stage >= 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 opacity-50"
              initial={{ y: "100vh", x: Math.random() * 100 + "vw", scale: Math.random() * 0.5 + 0.5 }}
              animate={{ 
                y: "-10vh",
                x: `${Math.random() * 100}vw`,
                rotate: 360
              }}
              transition={{ 
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Heart size={24} />
            </motion.div>
          ))}
        </div>
      )}

      {stage === 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`butterfly-${i}`}
              className="absolute z-10"
              initial={{ x: "-10vw", y: 200 + i * 50 }}
              animate={{ 
                x: "110vw",
                y: [200 + i * 50, 150 + i * 50, 250 + i * 50, 180 + i * 50],
              }}
              transition={{ 
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 100 100">
                <motion.g
                  animate={{ scaleY: [1, 0.2, 1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  style={{ transformOrigin: 'center' }}
                >
                  <path d="M50 50 C 30 20, 10 30, 20 60 Z" fill="#c084fc" opacity="0.8" />
                  <path d="M50 50 C 70 20, 90 30, 80 60 Z" fill="#c084fc" opacity="0.8" />
                  <path d="M50 50 C 35 70, 25 80, 30 90 Z" fill="#a855f7" opacity="0.8" />
                  <path d="M50 50 C 65 70, 75 80, 70 90 Z" fill="#a855f7" opacity="0.8" />
                </motion.g>
                <rect x="48" y="45" width="4" height="30" rx="2" fill="#333" />
                <circle cx="50" cy="45" r="4" fill="#333" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 font-serif">
          Let's Grow Together
        </h2>
        
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-rose-600 mb-2">
              {stages[stage]}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <motion.div 
                className="bg-rose-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Growth: {progress}%
            </p>
          </div>

          <div className="h-80 relative flex items-end justify-center mb-10 overflow-visible">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="seed"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="mb-4"
                >
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <ellipse cx="50" cy="80" rx="15" ry="10" fill="#8B4513" />
                    <ellipse cx="50" cy="80" rx="10" ry="6" fill="#A0522D" />
                  </svg>
                </motion.div>
              )}

              {stage === 1 && (
                <motion.div
                  key="sprout"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="origin-bottom"
                >
                  <svg width="100" height="120" viewBox="0 0 100 120">
                    <path d="M50 120 Q 45 80, 55 40" stroke="#22c55e" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M52 80 Q 70 70, 80 50 Q 60 55, 52 80" fill="#4ade80" />
                    <path d="M48 60 Q 30 50, 20 30 Q 40 35, 48 60" fill="#4ade80" />
                  </svg>
                </motion.div>
              )}

              {stage === 2 && (
                <motion.div
                  key="budding"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="origin-bottom"
                >
                  <svg width="120" height="200" viewBox="0 0 120 200">
                    <defs>
                      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#166534" />
                      </linearGradient>
                    </defs>
                    {/* Stem */}
                    <path d="M60 200 Q 50 120, 65 40" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
                    {/* Leaves */}
                    <path d="M58 140 C 90 130, 110 100, 105 80 C 85 90, 60 110, 58 140 Z" fill="url(#leafGrad)" />
                    <path d="M55 100 C 25 90, 10 60, 15 40 C 35 50, 55 70, 55 100 Z" fill="url(#leafGrad)" />
                    {/* Bud */}
                    <path d="M65 40 Q 55 20, 65 10 Q 75 20, 65 40 Z" fill="#fda4af" />
                    <path d="M65 45 L 55 25 L 65 40 Z" fill="#166534" />
                    <path d="M65 45 L 75 25 L 65 40 Z" fill="#166534" />
                  </svg>
                </motion.div>
              )}

              {stage >= 3 && (
                <motion.div
                  key="blooming"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="origin-bottom absolute w-full h-full flex justify-center items-end"
                >
                  <svg width="400" height="320" viewBox="0 0 400 320" className="overflow-visible z-20">
                    <defs>
                      <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14532d" />
                        <stop offset="50%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#14532d" />
                      </linearGradient>
                      
                      <linearGradient id="leafGradRealistic" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="50%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#14532d" />
                      </linearGradient>

                      <radialGradient id="roseInner" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                        <stop offset="0%" stopColor="#fda4af" />
                        <stop offset="70%" stopColor="#e11d48" />
                        <stop offset="100%" stopColor="#881337" />
                      </radialGradient>

                      <radialGradient id="roseOuter" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fb7185" />
                        <stop offset="60%" stopColor="#be123c" />
                        <stop offset="100%" stopColor="#4c0519" />
                      </radialGradient>

                      <linearGradient id="petalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#9f1239" />
                      </linearGradient>

                      <linearGradient id="lavenderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e879f9" />
                        <stop offset="100%" stopColor="#86198f" />
                      </linearGradient>

                      <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#ca8a04" />
                      </radialGradient>
                    </defs>

                    {stage === 4 && (
                      <g className="side-flowers">
                        {/* Lavender - Left */}
                        <motion.g
                          initial={{ opacity: 0, x: 50, scale: 0 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.8 }}
                        >
                          <path d="M120 320 Q 110 200, 100 120" stroke="#16a34a" strokeWidth="4" fill="none" />
                          <path d="M115 250 Q 80 230, 90 200 Q 105 220, 115 250" fill="url(#leafGradRealistic)" />
                          
                          {/* Lavender buds */}
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <g key={i} transform={`translate(${100 + Math.sin(i)*5}, ${120 + i*15})`}>
                              <ellipse cx="-8" cy="0" rx="10" ry="5" fill="url(#lavenderGrad)" transform="rotate(-30 -8 0)" />
                              <ellipse cx="8" cy="0" rx="10" ry="5" fill="url(#lavenderGrad)" transform="rotate(30 8 0)" />
                              <circle cx="0" cy="0" r="4" fill="#d946ef" />
                            </g>
                          ))}
                        </motion.g>

                        {/* Daisy - Right */}
                        <motion.g
                          initial={{ opacity: 0, x: -50, scale: 0 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                        >
                          <path d="M280 320 Q 290 220, 300 140" stroke="#15803d" strokeWidth="5" fill="none" />
                          <path d="M285 240 Q 320 230, 330 200 Q 300 210, 285 240" fill="url(#leafGradRealistic)" />
                          
                          <g transform="translate(300, 140)">
                            {/* Petals */}
                            {[...Array(12)].map((_, i) => (
                              <ellipse 
                                key={i} 
                                cx="0" cy="-25" rx="8" ry="25" 
                                fill="#ffffff" stroke="#f1f5f9" strokeWidth="1"
                                transform={`rotate(${i * 30})`} 
                              />
                            ))}
                            {/* Center */}
                            <circle cx="0" cy="0" r="15" fill="url(#daisyCenter)" />
                            {/* Texture dots */}
                            <circle cx="-5" cy="-5" r="1.5" fill="#a16207" />
                            <circle cx="5" cy="-2" r="1.5" fill="#a16207" />
                            <circle cx="-2" cy="6" r="1.5" fill="#a16207" />
                            <circle cx="4" cy="5" r="1.5" fill="#a16207" />
                          </g>
                        </motion.g>
                      </g>
                    )}

                    {/* MAIN ROSE */}
                    <g transform="translate(200, 320)">
                      {/* Stem */}
                      <path d="M0 0 Q -15 -100, 0 -220" stroke="url(#stemGrad)" strokeWidth="10" fill="none" strokeLinecap="round" />
                      
                      {/* Thorns */}
                      <path d="M -4 -50 L -15 -45 L -5 -60 Z" fill="#78350f" />
                      <path d="M 6 -120 L 18 -115 L 7 -130 Z" fill="#78350f" />
                      <path d="M -6 -180 L -16 -175 L -5 -190 Z" fill="#78350f" />

                      {/* Leaves */}
                      <g className="leaves">
                        <path d="M -5 -80 C -50 -100, -80 -60, -90 -30 C -60 -40, -20 -50, -5 -80 Z" fill="url(#leafGradRealistic)" />
                        <path d="M -5 -80 C -40 -90, -60 -55, -70 -35 C -50 -45, -15 -55, -5 -80 Z" fill="none" stroke="#14532d" strokeWidth="1.5" opacity="0.6" />
                        
                        <path d="M 5 -140 C 60 -160, 90 -110, 100 -80 C 70 -95, 25 -105, 5 -140 Z" fill="url(#leafGradRealistic)" />
                        <path d="M 5 -140 C 45 -150, 70 -105, 80 -85 C 55 -100, 20 -110, 5 -140 Z" fill="none" stroke="#14532d" strokeWidth="1.5" opacity="0.6" />
                      </g>

                      {/* Calyx (Sepals) */}
                      <g transform="translate(0, -220)">
                        <path d="M -25 -20 L -35 -40 L -15 -15 Z" fill="#166534" />
                        <path d="M 25 -20 L 35 -40 L 15 -15 Z" fill="#166534" />
                        <path d="M 0 0 C -20 0, -25 -25, -30 -30 C -15 -10, 0 -10, 0 0 Z" fill="#14532d" />
                        <path d="M 0 0 C 20 0, 25 -25, 30 -30 C 15 -10, 0 -10, 0 0 Z" fill="#14532d" />
                        <path d="M -15 -10 L 0 -45 L 15 -10 Z" fill="#16a34a" />
                      </g>

                      {/* Flower Bloom - use maxStageReached so petals never collapse on stage 3→4 */}
                      <g transform="translate(0, -220)">

                        {/* Gentle sway - only when fully bloomed at stage 4 */}
                        <motion.g
                          animate={stage === 4 ? { rotate: [0, 2, -2, 0] } : { rotate: 0 }}
                          transition={stage === 4 ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
                          style={{ transformOrigin: '0px 0px' }}
                        >
                          {/* 1. Outer Petals - bloom once when maxStageReached >= 3, never collapse */}
                          <motion.g
                            initial={{ scale: 0, opacity: 0 }}
                            animate={maxStageReached.current >= 3
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                            }
                            transition={{ type: "spring", stiffness: 60, damping: 15 }}
                          >
                            {[0, 72, 144, 216, 288].map((angle, i) => (
                              <path
                                key={`outer-${angle}`}
                                d="M 0 0 C -45 -15, -60 -55, 0 -75 C 60 -55, 45 -15, 0 0 Z"
                                fill="url(#roseOuter)"
                                stroke="#881337"
                                strokeWidth="0.8"
                                style={{
                                  transformOrigin: '0px 0px',
                                  transform: `rotate(${angle + (i % 2 === 0 ? 3 : -3)}deg) scale(1.15)`
                                }}
                              />
                            ))}
                          </motion.g>

                          {/* 2. Middle Petals */}
                          <motion.g
                            initial={{ scale: 0, opacity: 0 }}
                            animate={maxStageReached.current >= 3
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                            }
                            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.15 }}
                          >
                            {[36, 108, 180, 252, 324].map((angle, i) => (
                              <path
                                key={`mid-${angle}`}
                                d="M 0 0 C -35 -12, -48 -45, 0 -60 C 48 -45, 35 -12, 0 0 Z"
                                fill="url(#roseInner)"
                                stroke="#9f1239"
                                strokeWidth="0.6"
                                style={{
                                  transformOrigin: '0px 0px',
                                  transform: `rotate(${angle + (i % 2 === 0 ? -2 : 2)}deg) scale(1.1)`
                                }}
                              />
                            ))}
                          </motion.g>

                          {/* 3. Inner Petals */}
                          <motion.g
                            initial={{ scale: 0, opacity: 0 }}
                            animate={maxStageReached.current >= 3
                              ? { scale: 1, opacity: 1 }
                              : maxStageReached.current >= 2
                              ? { scale: 0.6, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                            }
                            transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
                          >
                            {[0, 72, 144, 216, 288].map((angle) => (
                              <path
                                key={`inner-${angle}`}
                                d="M 0 0 C -25 -10, -35 -35, 0 -45 C 35 -35, 25 -10, 0 0 Z"
                                fill="url(#roseInner)"
                                stroke="#be123c"
                                strokeWidth="0.5"
                                style={{
                                  transformOrigin: '0px 0px',
                                  transform: `rotate(${angle + 18}deg)`
                                }}
                              />
                            ))}
                          </motion.g>

                          {/* 4. Center swirl core */}
                          <motion.g
                            initial={{ scale: 0 }}
                            animate={maxStageReached.current >= 2 ? { scale: 1 } : { scale: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 10 }}
                          >
                            <path
                              d="M 0 -8 C -15 -18, -10 -35, 0 -35 C 10 -35, 15 -18, 0 -8"
                              fill="#881337"
                              stroke="#4c0519"
                              strokeWidth="1"
                            />
                            <path d="M -5 -12 Q -10 -25, 0 -28 Q 10 -25, 5 -12 Z" fill="#4c0519" />
                            <circle cx="0" cy="-20" r="6" fill="#881337" opacity="0.9" />
                            <circle cx="0" cy="-20" r="3" fill="#fda4af" opacity="0.4" />
                          </motion.g>
                        </motion.g>
                      </g>
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => grow('water')}
              disabled={progress === 100}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                progress === 100 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 active:scale-95 shadow-sm'
              }`}
            >
              <Droplets className="w-8 h-8 mb-2" />
              <span className="font-semibold text-sm">Water</span>
            </button>
            <button
              onClick={() => grow('sun')}
              disabled={progress === 100}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                progress === 100 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-amber-50 text-amber-500 hover:bg-amber-100 hover:scale-105 active:scale-95 shadow-sm'
              }`}
            >
              <Sun className="w-8 h-8 mb-2" />
              <span className="font-semibold text-sm">Sunlight</span>
            </button>
            <button
              onClick={() => grow('love')}
              disabled={progress === 100}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                progress === 100 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-pink-50 text-pink-500 hover:bg-pink-100 hover:scale-105 active:scale-95 shadow-sm'
              }`}
            >
              <Sparkles className="w-8 h-8 mb-2" />
              <span className="font-semibold text-sm">Love Magic</span>
            </button>
          </div>

          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-gray-700 font-medium mb-4">
                Look how beautiful our garden has become, just like us! 🌸
              </p>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-6 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Grow Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlowerSection;
