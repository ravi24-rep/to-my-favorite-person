import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function LoveMeterSection() {
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (inView && !isError) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        // Non-linear progress
        if (currentProgress < 90) {
          currentProgress += Math.floor(Math.random() * 15) + 5;
        } else if (currentProgress < 99) {
          currentProgress += 1;
        } else if (currentProgress < 150) {
          currentProgress += 10;
        } else {
          currentProgress += 100000;
        }

        setProgress(currentProgress);

        if (currentProgress > 1000000) {
          clearInterval(interval);
          setIsError(true);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [inView, isError]);

  return (
    <section 
      className="py-24 relative z-10 px-4 min-h-[60vh] flex flex-col items-center justify-center bg-white/50"
      onMouseEnter={() => setInView(true)}
      onTouchStart={() => setInView(true)}
    >
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-pink-100 text-center relative overflow-hidden">
        <h2 className="text-2xl font-serif text-gray-800 mb-8 uppercase tracking-widest text-pink-500">Love Meter</h2>
        
        {!isError ? (
          <div className="space-y-6">
            <div className="text-4xl md:text-5xl font-mono text-gray-700 font-bold h-12">
              {progress}%
            </div>
            <p className="text-gray-500 animate-pulse">Calculating...</p>
            
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 to-red-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-red-500"
          >
            <div className="text-5xl animate-bounce">⚠️</div>
            <div className="text-3xl font-bold uppercase tracking-wider">Error</div>
            <div className="text-2xl font-serif text-pink-600 font-bold">Love Overflow ❤️</div>
            <p className="text-gray-600">Capacity exceeded. Cannot measure infinite love.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
