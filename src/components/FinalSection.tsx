import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

const HEART_ICONS = ['❤️', '💖', '💗', '💓', '💝'];

export function FinalSection() {
  const [tapCount, setTapCount] = useState(0);
  const [opened, setOpened] = useState(false);
  const [showHeartBeat, setShowHeartBeat] = useState(false);
  const [heartStage, setHeartStage] = useState(0);
  const [heartFilledScreen, setHeartFilledScreen] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReplay = useCallback(() => {
    setIsFadingOut(true);
    scrollToTop();

    // Wait for scroll + fade animation, then reset everything
    setTimeout(() => {
      setShowHeartBeat(false);
      setHeartStage(0);
      setHeartFilledScreen(false);
      setShowFinalMessage(false);
      setShowReplayButton(false);
      setIsFadingOut(false);
      setOpened(false);
      setTapCount(0);
    }, 2000);
  }, [scrollToTop]);

  // Show replay button 6s after final message, auto-replay after 25s
  useEffect(() => {
    if (!showFinalMessage) return;

    const replayBtnTimer = setTimeout(() => {
      setShowReplayButton(true);
    }, 6000);

    const autoReplayTimer = setTimeout(() => {
      handleReplay();
    }, 30000);

    return () => {
      clearTimeout(replayBtnTimer);
      clearTimeout(autoReplayTimer);
    };
  }, [showFinalMessage, handleReplay]);

  const handleBoxTap = () => {
    if (opened) return;
    
    setTapCount(c => c + 1);

    if (tapCount + 1 >= 3) {
      setOpened(true);
      
      // Confetti explosion
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#FFD6E8', '#C8A2FF', '#FFF8F5', '#ff0000']
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#FFD6E8', '#C8A2FF', '#FFF8F5', '#ff0000']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => setShowHeartBeat(true), 4000);
    }
  };

  const handleHeartTap = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([60, 40, 60]);
    }

    if (heartStage < HEART_ICONS.length - 1) {
      setHeartStage(prev => prev + 1);
    } else {
      // Final stage - Fill screen
      setHeartFilledScreen(true);
      setTimeout(() => {
        setShowFinalMessage(true);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#fda4af', '#ffffff']
        });
      }, 2000);
    }
  };

  const boxShakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  return (
    <section className="min-h-screen py-24 relative z-10 px-4 max-w-3xl mx-auto flex flex-col items-center justify-center select-none">
      
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="giftbox"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={tapCount > 0 ? boxShakeAnimation : {}}
            className="cursor-pointer text-center group flex flex-col items-center"
            onClick={handleBoxTap}
          >
            <motion.div 
              className="text-8xl mb-6 drop-shadow-2xl select-none touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎁
            </motion.div>
            <p className="text-xl text-gray-600 font-medium font-serif">
              {tapCount === 0 && "I have one last thing for you..."}
              {tapCount === 1 && "Hmm... maybe tap it again?"}
              {tapCount === 2 && "One more time..."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md flex flex-col items-center space-y-8"
          >
            {!showHeartBeat ? (
              <>
                <div className="w-full aspect-[4/5] bg-white rounded-xl shadow-2xl overflow-hidden p-4 rotate-2 border border-pink-100/50">
                  <img 
                    src="/favorite_photo.png" 
                    alt="Our Favorite Photo" 
                    className="w-full h-full object-cover rounded-lg shadow-inner"
                  />
                </div>
                <h3 className="text-2xl font-serif text-pink-600 text-center font-bold tracking-wide mt-2">
                  My absolute favorite memory. ❤️
                </h3>
              </>
            ) : (
              <div />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHeartBeat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            transition={{ duration: isFadingOut ? 1.5 : 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto"
          >
            {/* Stage 1: Tap to grow Heart */}
            {!heartFilledScreen && (
              <div className="flex flex-col items-center justify-center text-center space-y-8 cursor-pointer" onClick={handleHeartTap}>
                <motion.div
                  key={heartStage}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 + heartStage * 0.4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="drop-shadow-[0_0_35px_rgba(244,63,94,0.8)] select-none"
                  style={{ fontSize: `${80 + heartStage * 30}px` }}
                >
                  {HEART_ICONS[heartStage]}
                </motion.div>
                
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-pink-300 font-serif italic text-lg md:text-xl"
                >
                  Tap the heart to fill it with love... ({heartStage + 1}/{HEART_ICONS.length})
                </motion.p>
              </div>
            )}

            {/* Stage 2: Heart Fills Screen -> Unfolds into Handwritten Letter */}
            {heartFilledScreen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl flex flex-col items-center justify-center text-center space-y-8"
              >
                {!showFinalMessage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-7xl animate-pulse">💝</div>
                    <h2 className="text-3xl md:text-5xl font-serif text-pink-400 font-bold">
                      "You filled my heart with love."
                    </h2>
                    <p className="text-gray-400 text-sm font-mono animate-bounce pt-4">
                      Unfolding letter... 📜
                    </p>
                  </motion.div>
                ) : (
                  /* Handwritten Paper Card Unfolded */
                  <motion.div
                    initial={{ opacity: 0, rotateX: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                    transition={{ duration: 1.5, type: "spring" }}
                    className="w-full bg-[#FFFBF0] text-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#F3E5AB] relative overflow-hidden text-center space-y-6"
                    style={{
                      backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      boxShadow: '0 25px 50px -12px rgba(244, 63, 94, 0.3), 0 0 30px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Decorative Stamp */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-2 border-rose-400/40 rounded-full flex items-center justify-center text-rose-500 font-serif text-xs rotate-12 pointer-events-none">
                      LOVE 💌
                    </div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl font-serif text-rose-600 font-bold tracking-wide"
                    >
                      Happy Girlfriend's Day, My Love. ❤️
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="text-gray-800 text-base md:text-xl leading-relaxed space-y-4 font-serif italic max-w-lg mx-auto"
                    >
                      <p>Meeting you was one of the most beautiful things that has ever happened to me.</p>
                      <p>Thank you for your patience, your care, and for standing beside me through everything.</p>
                      <p>Every memory with you is a treasure I'll always hold close to my heart.</p>
                      <p>My heart feels at home whenever I'm with you.</p>
                      
                      <div className="pt-4 border-t border-rose-200/60">
                        <p className="text-rose-600 font-bold text-xl md:text-2xl not-italic">
                          Thank you for being you. <br />
                          <span className="text-pink-500">I love you more than words can ever say. 🌸</span>
                        </p>
                      </div>
                    </motion.div>

                    {/* Replay Journey Button */}
                    <AnimatePresence>
                      {showReplayButton && !isFadingOut && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 1 }}
                          className="pt-6 flex flex-col items-center gap-3 z-20"
                        >
                          <motion.button
                            onClick={handleReplay}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-base shadow-md hover:shadow-lg transition-all"
                          >
                            🔄 Replay Our Journey ↑
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}
