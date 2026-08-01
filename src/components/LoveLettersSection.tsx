import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

const letters = [
  { id: 1, text: "Hey Love ❤️\n\nI made this small world just for you. Every pixel, every animation, is a little piece of my heart trying to show you how much you mean to me.", position: { top: '20%', left: '15%' }, delay: 0 },
  { id: 2, text: "I still remember the day we met like it was yesterday. You brought this incredible light into my life, and I've been basking in it ever since.", position: { top: '60%', left: '75%' }, delay: 2 },
  { id: 3, text: "Thank you for being my safe space, my biggest supporter, and my favorite person to annoy. I wouldn't trade our moments for anything in the world.", position: { top: '30%', left: '80%' }, delay: 4 },
  { id: 4, text: "Happy Girlfriend's Day! I hope this makes you smile as big as you make me smile every single day.", position: { top: '70%', left: '20%' }, delay: 1 },
];

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40); // speed of typing
    
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayedText}</>;
}

export function LoveLettersSection() {
  const [selectedLetter, setSelectedLetter] = useState<typeof letters[0] | null>(null);

  return (
    <section className="py-24 relative z-10 px-4 min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-6 text-center z-10">Love Letters</h2>
      <p className="text-gray-600 mb-12 text-center z-10">Catch a floating envelope...</p>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {letters.map((letter) => (
          <motion.div
            key={letter.id}
            initial={{ y: '120vh', opacity: 0, rotate: -20 }}
            animate={{ y: '-20vh', opacity: [0, 1, 1, 0], rotate: 20 }}
            transition={{
              duration: 15,
              delay: letter.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute pointer-events-auto cursor-pointer p-4"
            style={{ left: letter.position.left }}
            onClick={() => setSelectedLetter(letter)}
          >
            <motion.div whileHover={{ scale: 1.1, rotate: 0 }} className="drop-shadow-xl">
              <Mail className="w-16 h-16 md:w-20 md:h-20 text-pink-300 drop-shadow-md" fill="#FFF8F5" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedLetter(null)}
          >
            {/* The Envelope wrapper */}
            <motion.div
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              className="relative flex items-center justify-center w-full max-w-md h-[400px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Envelope Back */}
              <motion.div 
                className="absolute inset-0 bg-pink-300 rounded-lg shadow-2xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              />

              {/* The Paper */}
              <motion.div
                initial={{ 
                  scale: 0.2, 
                  opacity: 0, 
                  rotateX: 90,
                  clipPath: 'inset(100% 0 0 0)' // Folded up
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  rotateX: 0,
                  clipPath: 'inset(0% 0 0 0)' // Unfolded
                }}
                transition={{ 
                  delay: 0.5, 
                  duration: 1.5, 
                  type: "spring", 
                  damping: 15, 
                  stiffness: 40 
                }}
                className="w-full p-8 md:p-12 rounded-sm shadow-2xl relative z-20 min-h-[300px]"
                style={{
                  backgroundColor: '#fdfbf7',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)',
                  backgroundAttachment: 'local',
                  backgroundPosition: '0 4px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 40px rgba(0,0,0,0.03)'
                }}
              >
                <button 
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-30"
                >
                  <X size={24} />
                </button>
                <div 
                  className="text-gray-800 text-2xl md:text-3xl leading-[32px] pt-1 whitespace-pre-wrap mt-4" 
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <TypewriterText text={selectedLetter.text} />
                </div>
              </motion.div>

              {/* Envelope Front Flaps (Fade out to reveal letter) */}
              <motion.div 
                className="absolute inset-0 z-30 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-pink-200 rounded-lg" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
                <div className="absolute inset-0 bg-pink-200 rounded-lg" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-0 bg-pink-100 rounded-lg" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>
                <motion.div 
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: 180 }}
                  transition={{ duration: 0.8 }}
                  style={{ transformOrigin: 'top', backfaceVisibility: 'hidden' }}
                  className="absolute top-0 left-0 right-0 h-[60%]"
                >
                  <div className="w-full h-full bg-pink-400 rounded-t-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                </motion.div>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
