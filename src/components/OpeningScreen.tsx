import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Typewriter component for realistic text typing
function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 80);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block ml-1 text-pink-500 font-normal"
      >
        |
      </motion.span>
    </span>
  );
}

export function OpeningScreen({ onEnter }: { onEnter: () => void }) {
  const [stage, setStage] = useState<'password' | 'loading' | 'landing' | 'opened' | 'question' | 'teasing' | 'accepted'>('password');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Checking...');

  const [noCount, setNoCount] = useState(0);
  const [faceTapCount, setFaceTapCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [leaveParticles, setLeaveParticles] = useState<{id: number, x: number, y: number}[]>([]);

  // Floating background petals & hearts state
  const [bgElements, setBgElements] = useState<{ id: number; x: number; size: number; delay: number; duration: number; type: 'heart' | 'petal' }[]>([]);

  useEffect(() => {
    // Generate floating petals and hearts
    const items = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 16,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      type: i % 2 === 0 ? ('heart' as const) : ('petal' as const)
    }));
    setBgElements(items);
  }, []);

  useEffect(() => {
    if (stage === 'loading') {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        setLoadingProgress(currentProgress);
        
        if (currentProgress === 30) {
          setLoadingText('Checking...');
        } else if (currentProgress === 60) {
          setLoadingText('Too cute. Increasing limit...');
        } else if (currentProgress === 100) {
          setLoadingText('System crashed ❤️');
        } else if (currentProgress > 120) {
          clearInterval(interval);
          setStage('landing');
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === 'bavadharani ravikumar' || password.trim().toLowerCase() === 'bavadharani') {
      setStage('loading');
    } else {
      setPasswordError(true);
    }
  };

  const handleEnvelopeClick = () => {
    if (stage === 'landing') {
      setStage('opened');
      setTimeout(() => {
        setStage('question');
      }, 1500);
    }
  };

  const handleFaceTap = () => {
    setFaceTapCount(c => c + 1);
    if (faceTapCount + 1 >= 5) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
      setFaceTapCount(0);
    }
  };

  const handleNoTouch = (e: React.PointerEvent | React.MouseEvent | React.TouchEvent) => {
    if (noCount < 8) {
      e.preventDefault();
      setLeaveParticles(prev => [...prev, { id: Date.now(), x: noPosition.x, y: noPosition.y }]);
      setNoCount(c => c + 1);
      
      const maxDist = 120;
      const newX = (Math.random() - 0.5) * maxDist * 2;
      const newY = (Math.random() - 0.5) * maxDist * 2;
      
      setNoPosition({ x: newX, y: newY });
      
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    } else if (stage !== 'teasing') {
      setStage('teasing');
      setTimeout(() => {
        setStage('question');
      }, 4000);
    }
  };

  const handleYes = () => {
    setStage('accepted');
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD6E8', '#C8A2FF', '#FFF8F5', '#ff0000']
    });
    setTimeout(() => {
      onEnter();
    }, 2500);
  };

  let currentFace = '(•ᴗ•)';
  let currentBubble = 'Open me!';

  if (showEasterEgg) {
    currentFace = '(づ｡◕‿‿◕｡)づ';
    currentBubble = 'Psst... just press YES. He worked really hard on this website. 🥹❤️';
  } else if (stage === 'opened') {
    currentFace = '(◕‿◕)';
    currentBubble = 'Yay!';
  } else if (stage === 'question') {
    if (noCount === 0) {
      currentFace = '🥺';
      currentBubble = 'Please?';
    } else if (noCount === 1) {
      currentFace = '( •̀⤙•́ )';
      currentBubble = 'Hey!! 😤';
    } else if (noCount === 2) {
      currentFace = '(ಠ_ಠ)';
      currentBubble = 'Nope...';
    } else if (noCount === 3) {
      currentFace = '(╯°□°)';
      currentBubble = 'Nice try 😂';
    } else {
      currentFace = '(ง\'̀-\'́)ง';
      currentBubble = 'Catch me first!';
    }
  } else if (stage === 'teasing') {
    currentFace = '😂';
    currentBubble = 'Haha, I was just teasing! ❤️ You can always be honest.';
  } else if (stage === 'accepted') {
    currentFace = '(≧◡≦)';
    currentBubble = 'YAYYYYY!!! ❤️❤️❤️';
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8F5] via-[#FFD6E8] to-[#C8A2FF] overflow-hidden select-none">
      
      {/* Background Floating Hearts & Rose Petals */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {bgElements.map(el => (
          <motion.div
            key={el.id}
            initial={{ y: '110vh', x: `${el.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '-10vh',
              x: `${el.x + (Math.random() * 20 - 10)}vw`,
              opacity: [0, 0.7, 0.7, 0],
              rotate: 360
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute"
          >
            {el.type === 'heart' ? (
              <span style={{ fontSize: `${el.size}px` }} className="text-pink-400 opacity-70">
                ❤️
              </span>
            ) : (
              <span style={{ fontSize: `${el.size}px` }} className="text-rose-300 opacity-80">
                🌸
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="w-full max-w-sm px-6 text-center space-y-6 z-10"
          >
            <div className="text-5xl mb-4 animate-bounce">🔒</div>
            <h1 className="text-3xl font-serif text-gray-800">Secret Website ❤️</h1>
            <p className="text-gray-600 font-medium">Only for a very special person.</p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-4">
              <input
                type="text"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                placeholder="Enter your name"
                className="w-full px-6 py-4 rounded-full text-center text-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none shadow-sm text-gray-700 bg-white/80 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-full shadow-lg transition-colors active:scale-95"
              >
                Tap to Enter
              </button>
            </form>
            
            {passwordError && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-pink-600 text-sm font-medium mt-4"
              >
                Oops! This website is reserved for someone very special. ❤️
              </motion.p>
            )}
          </motion.div>
        )}

        {stage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm px-6 text-center space-y-8 z-10"
          >
            <div className="space-y-4">
              <p className="text-xl font-medium text-gray-800 h-8">{loadingText}</p>
              
              <div className="w-full h-6 bg-gray-200/50 rounded-full overflow-hidden shadow-inner border border-gray-300/30 p-1">
                <motion.div 
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              
              <div className="text-sm font-mono text-gray-500">
                {Math.min(loadingProgress, 100)}%
              </div>
            </div>
          </motion.div>
        )}

        {(stage !== 'password' && stage !== 'loading') && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4 max-w-md px-4 z-10 w-full flex flex-col items-center"
          >
            
            {/* Text Section with Typewriter Effect */}
            <div className="h-40 flex flex-col items-center justify-end pb-4">
              <AnimatePresence mode="wait">
                {stage === 'landing' && (
                  <motion.div
                    key="landing-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    <h1 className="text-3xl md:text-4xl font-serif text-gray-800 font-bold min-h-[48px]">
                      <TypewriterText text="Happy Girlfriend's Day, Bavadharani ❤️" />
                    </h1>
                    <p className="text-gray-700 text-sm md:text-base">I made something special just for my favorite person.</p>
                    <p className="text-xs md:text-sm text-pink-600 font-medium">Tap the envelope to open... 💌</p>
                  </motion.div>
                )}
                
                {(stage === 'question' || stage === 'teasing' || stage === 'accepted' || stage === 'opened') && (
                  <motion.div
                    key="question-text"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-800">
                      {stage === 'accepted' ? 'I knew it! ❤️' : stage === 'opened' ? 'Opening...' : 'Do you love me? 🥺'}
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The Face & Bubble */}
            <div className="relative mt-2 mb-6 h-28 flex flex-col items-center justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBubble}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm text-sm font-medium text-pink-600 mb-3 border border-pink-100 max-w-[250px] text-center"
                >
                  {currentBubble}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 border-b border-r border-pink-100 rotate-45"></div>
                </motion.div>
              </AnimatePresence>
              <motion.div 
                className="text-4xl cursor-pointer select-none drop-shadow-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                onClick={handleFaceTap}
              >
                {currentFace}
              </motion.div>
            </div>

            {/* Envelope Area */}
            <div className="relative h-64 w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {(stage === 'landing' || stage === 'opened') && (
                  <motion.div
                    key="envelope"
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    className="cursor-pointer relative w-64 h-40 md:w-80 md:h-48 drop-shadow-xl"
                    onClick={handleEnvelopeClick}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Back of Envelope */}
                    <div className="absolute inset-0 bg-pink-300 rounded-lg"></div>

                    {/* Letter Inside */}
                    <motion.div
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: stage === 'opened' ? -60 : 0, opacity: stage === 'opened' ? 1 : 0 }}
                      transition={{ duration: 0.8, type: 'spring' }}
                      className="absolute bottom-2 left-4 right-4 top-4 bg-white rounded-md shadow-inner flex flex-col items-center justify-center z-10 p-4 border border-pink-100"
                    >
                      <div className="text-2xl text-pink-500 mb-2">❤️</div>
                      <div className="h-2 w-24 bg-pink-100 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-pink-100 rounded"></div>
                    </motion.div>

                    {/* Envelope Flap */}
                    <motion.div
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: stage === 'opened' ? 180 : 0 }}
                      transition={{ duration: 0.6, type: "tween" }}
                      style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
                      className="absolute top-0 left-0 right-0 h-[60%] z-20"
                    >
                      <div 
                        className="w-full h-full bg-pink-400"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                      ></div>
                    </motion.div>
                    
                    {/* Envelope Front Left */}
                    <div 
                      className="absolute inset-0 bg-pink-200 z-10 rounded-l-lg"
                      style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
                    ></div>
                    
                    {/* Envelope Front Right */}
                    <div 
                      className="absolute inset-0 bg-pink-200 z-10 rounded-r-lg"
                      style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
                    ></div>

                    {/* Envelope Front Bottom */}
                    <div 
                      className="absolute inset-0 bg-pink-100 z-10 rounded-b-lg"
                      style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
                    ></div>

                    {/* Seal */}
                    <motion.div
                      animate={{ scale: stage === 'opened' ? 0 : 1, opacity: stage === 'opened' ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center border-2 border-red-600/50">
                        <span className="text-white text-xl animate-pulse">❤️</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {(stage === 'question' || stage === 'teasing' || stage === 'accepted') && (
                  <motion.div
                    key="buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-row items-center justify-center gap-6 md:gap-12 w-full relative"
                  >
                    <motion.button
                      onClick={handleYes}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-pink-300/50 transition-all text-xl md:text-2xl border-2 border-pink-300/50 z-20"
                    >
                      YES ❤️
                    </motion.button>
                    
                    <div className="relative">
                      <motion.button
                        animate={noPosition}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onPointerDown={handleNoTouch}
                        onMouseEnter={handleNoTouch}
                        className="bg-white/80 backdrop-blur-sm text-gray-600 font-bold py-4 px-10 rounded-full shadow-md text-xl md:text-2xl border border-gray-200 z-50 relative overflow-hidden"
                      >
                        NO 💔
                      </motion.button>
                      
                      {/* Particles left behind */}
                      {leaveParticles.map(p => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
                          animate={{ opacity: 0, scale: 1.5, y: p.y - 20 }}
                          transition={{ duration: 1 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-300 pointer-events-none z-10"
                        >
                          💨
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
