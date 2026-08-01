import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface ConstellationStar {
  id: number;
  x: number; // percentage
  y: number; // percentage
  label: string;
}

// 7 Stars forming a heart shape
const HEART_STARS: ConstellationStar[] = [
  { id: 0, x: 50, y: 35, label: "Center Top" },
  { id: 1, x: 38, y: 22, label: "Left Arch" },
  { id: 2, x: 26, y: 35, label: "Left Side" },
  { id: 3, x: 38, y: 55, label: "Left Slope" },
  { id: 4, x: 50, y: 70, label: "Bottom Point" },
  { id: 5, x: 62, y: 55, label: "Right Slope" },
  { id: 6, x: 74, y: 35, label: "Right Side" },
  { id: 7, x: 62, y: 22, label: "Right Arch" },
];

export function NightSkySection() {
  const [connectedStars, setConnectedStars] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStarClick = (starId: number) => {
    if (isCompleted) return;

    // Add star if not already connected
    if (!connectedStars.includes(starId)) {
      const nextConnected = [...connectedStars, starId];
      setConnectedStars(nextConnected);

      // Check if all stars connected
      if (nextConnected.length === HEART_STARS.length) {
        setIsCompleted(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#fef08a', '#facc15', '#ffffff', '#ec4899']
        });
      }
    }
  };

  const handleReset = () => {
    setConnectedStars([]);
    setIsCompleted(false);
  };

  return (
    <section className="relative min-h-[85vh] w-full bg-slate-950 overflow-hidden my-24 flex flex-col items-center justify-center select-none px-4">
      {/* Background Twinkling Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={`bg-star-${i}`}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            width: (1 + Math.random() * 2) + 'px',
            height: (1 + Math.random() * 2) + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Header instructions */}
      <div className="z-20 text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-200 text-xs px-4 py-1.5 rounded-full mb-3"
        >
          ✨ Star Constellation Game
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-serif text-white font-bold">
          Connect the Stars ⭐
        </h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 font-serif italic">
          {isCompleted 
            ? "Look at the constellation you created!"
            : `Tap the stars to draw lines (${connectedStars.length}/${HEART_STARS.length})`}
        </p>
      </div>

      {/* Interactive Constellation Area */}
      <div className="relative w-full max-w-lg h-[400px] border border-slate-800/80 rounded-3xl bg-slate-900/40 backdrop-blur-sm overflow-hidden shadow-2xl">
        
        {/* SVG Starlight Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {connectedStars.map((starId, index) => {
            if (index === 0) return null;
            const prevStar = HEART_STARS.find(s => s.id === connectedStars[index - 1]);
            const currStar = HEART_STARS.find(s => s.id === starId);
            if (!prevStar || !currStar) return null;

            return (
              <motion.line
                key={`line-${index}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke={isCompleted ? "#facc15" : "#fef08a"}
                strokeWidth={isCompleted ? "3" : "2"}
                strokeDasharray={isCompleted ? "none" : "4 2"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  filter: isCompleted ? "drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))" : "none"
                }}
              />
            );
          })}

          {/* Loop line back to origin when completed */}
          {isCompleted && connectedStars.length === HEART_STARS.length && (
            <motion.line
              x1={`${HEART_STARS[connectedStars[connectedStars.length - 1]].x}%`}
              y1={`${HEART_STARS[connectedStars[connectedStars.length - 1]].y}%`}
              x2={`${HEART_STARS[connectedStars[0]].x}%`}
              y2={`${HEART_STARS[connectedStars[0]].y}%`}
              stroke="#facc15"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
              style={{ filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))" }}
            />
          )}
        </svg>

        {/* Constellation Key Stars */}
        {HEART_STARS.map((star) => {
          const isSelected = connectedStars.includes(star.id);

          return (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none group p-3"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Star Core Glow */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected 
                    ? 'bg-yellow-200 shadow-[0_0_20px_8px_rgba(250,204,21,0.9)] scale-110' 
                    : 'bg-white/70 shadow-[0_0_10px_2px_rgba(255,255,255,0.5)] group-hover:bg-yellow-100'
                }`}
              >
                <span className="text-[10px]">⭐</span>
              </div>
            </motion.button>
          );
        })}

        {/* Completion Starlight Burst */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-slate-950/75 backdrop-blur-md px-6 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ❤️✨
              </motion.div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-yellow-200 mb-2">
                "You are my favorite star."
              </h3>
              <p className="text-slate-300 text-sm font-serif italic max-w-xs mb-6">
                Out of billions of stars in the universe, you are the one that lights up my night.
              </p>
              <button
                onClick={handleReset}
                className="text-xs bg-yellow-400/20 text-yellow-200 border border-yellow-400/40 px-5 py-2 rounded-full hover:bg-yellow-400/30 transition-colors"
              >
                Play Again ⭐
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
