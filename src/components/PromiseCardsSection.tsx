import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

interface PromiseCard {
  id: number;
  text: string;
  subText: string;
  icon: string;
  color: string;
}

const INITIAL_CARDS: PromiseCard[] = [
  {
    id: 1,
    text: "I promise to always listen to you.",
    subText: "Even when you're just venting about the smallest things, I'm all ears.",
    icon: "👂",
    color: "from-pink-400 to-rose-400"
  },
  {
    id: 2,
    text: "I promise to stand beside you.",
    subText: "Through every storm, every challenge, and every milestone.",
    icon: "🤝",
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 3,
    text: "I promise to share my food.",
    subText: "Yes, even the very last slice of pizza or bite of dessert.",
    icon: "🍕",
    color: "from-amber-400 to-rose-400"
  },
  {
    id: 4,
    text: "I promise to cherish our memories.",
    subText: "To hold every sweet moment we share close to my heart.",
    icon: "💖",
    color: "from-rose-400 to-pink-500"
  },
  {
    id: 5,
    text: "I'll keep trying to make you smile.",
    subText: "Because your smile is the most beautiful thing in the world to me.",
    icon: "🥹",
    color: "from-rose-500 to-pink-600"
  }
];

export function PromiseCardsSection() {
  const [cards, setCards] = useState<PromiseCard[]>(INITIAL_CARDS);
  const [swipedCount, setSwipedCount] = useState(0);

  const activeIndex = cards.length - 1;

  const handleSwipe = (direction: 'left' | 'right') => {
    // Remove the swiped card from the top of the stack
    setCards(prev => prev.slice(0, -1));
    setSwipedCount(c => c + 1);
  };

  const handleReset = () => {
    setCards(INITIAL_CARDS);
    setSwipedCount(0);
  };

  return (
    <section className="py-24 relative z-10 px-4 max-w-lg mx-auto text-center flex flex-col items-center">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-sm font-medium mb-3 border border-pink-200"
        >
          <Heart size={14} className="fill-pink-500 text-pink-500" />
          <span>My Promises to You</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif text-gray-800">Promise Cards 💖</h2>
        <p className="text-gray-500 mt-2 font-serif italic text-sm md:text-base">
          {cards.length > 0 ? "Swipe the cards left or right to read them" : "My promise, forever."}
        </p>
      </div>

      {/* Card Deck Wrapper */}
      <div className="relative w-80 h-[400px] flex items-center justify-center">
        <AnimatePresence>
          {cards.length > 0 ? (
            cards.map((card, index) => {
              const isTopCard = index === activeIndex;
              return (
                <TinderCard
                  key={card.id}
                  card={card}
                  isTopCard={isTopCard}
                  onSwipe={handleSwipe}
                  index={index}
                  stackSize={cards.length}
                />
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-pink-100 shadow-xl w-full h-full flex flex-col items-center justify-center gap-6"
            >
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 shadow-inner">
                <Heart size={44} className="fill-pink-500 text-pink-500" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-800">Every Promise, Kept.</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-[240px] mx-auto font-serif italic leading-relaxed">
                  "No matter what the future holds, I promise to walk beside you."
                </p>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
              >
                <RefreshCw size={16} />
                <span>Read Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface TinderCardProps {
  card: PromiseCard;
  isTopCard: boolean;
  onSwipe: (dir: 'left' | 'right') => void;
  index: number;
  stackSize: number;
}

function TinderCard({ card, isTopCard, onSwipe, index, stackSize }: TinderCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for rotation and fade depending on drag position
  const rotate = useTransform(x, [-150, 150], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]);
  const dragColor = useTransform(x, [-150, 0, 150], ['#ef4444', '#ffffff', '#22c55e']);

  // Stack calculation offsets
  const positionOffset = (stackSize - 1 - index) * 6;
  const rotationOffset = (stackSize - 1 - index) * (index % 2 === 0 ? 1.5 : -1.5);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{
        x: isTopCard ? x : 0,
        y: isTopCard ? y : positionOffset,
        rotate: isTopCard ? rotate : rotationOffset,
        opacity: isTopCard ? opacity : 0.95 - (stackSize - 1 - index) * 0.08,
        zIndex: index,
        scale: isTopCard ? 1 : 0.96 + (index - stackSize) * 0.015,
        touchAction: 'none'
      }}
      drag={isTopCard}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      className={`absolute w-full h-full bg-gradient-to-br ${card.color} text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between border border-white/20 select-none cursor-grab active:cursor-grabbing origin-bottom`}
      exit={{ 
        x: x.get() > 0 ? 300 : -300, 
        opacity: 0, 
        scale: 0.8,
        rotate: x.get() > 0 ? 35 : -35,
        transition: { duration: 0.35, ease: "easeOut" } 
      }}
      transition={isTopCard ? undefined : { type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Decorative details */}
      <div className="flex justify-between items-start">
        <span className="text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full font-bold">
          My Promise
        </span>
        <Sparkles size={20} className="opacity-80" />
      </div>

      {/* Main card center content */}
      <div className="flex flex-col items-center text-center gap-6 py-6">
        <span className="text-6xl drop-shadow-md select-none">{card.icon}</span>
        <div>
          <h3 className="text-2xl font-serif font-extrabold leading-snug">
            "{card.text}"
          </h3>
          <p className="text-white/80 font-serif italic text-sm mt-3 leading-relaxed max-w-[220px]">
            {card.subText}
          </p>
        </div>
      </div>

      {/* Slide indicators at bottom */}
      <div className="text-center text-white/55 text-xs font-semibold tracking-wider uppercase flex justify-between px-4">
        <span>← Swipe Left</span>
        <span>Swipe Right →</span>
      </div>
    </motion.div>
  );
}
