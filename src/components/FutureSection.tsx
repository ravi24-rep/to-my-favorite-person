import { motion } from 'motion/react';
import { useState } from 'react';

const futurePlans = [
  { icon: "🏠", label: "One day...", hidden: "Our own little home" },
  { icon: "✈️", label: "One day...", hidden: "Traveling the world together" },
  { icon: "☕", label: "One day...", hidden: "Quiet morning coffee dates" },
  { icon: "🌅", label: "One day...", hidden: "Watching endless sunsets" },
];

function FlipCard({ plan }: { plan: typeof futurePlans[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-48 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full bg-white/60 backdrop-blur-sm rounded-2xl shadow-md border border-white/80 flex flex-col items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
          <span className="text-4xl mb-3">{plan.icon}</span>
          <span className="text-lg font-medium text-gray-700">{plan.label}</span>
          <span className="text-xs text-gray-400 mt-2">Tap to reveal</span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full bg-pink-100 rounded-2xl shadow-lg border border-pink-200 flex items-center justify-center p-6 text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-xl font-serif text-pink-800 leading-snug">{plan.hidden}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function FutureSection() {
  return (
    <section className="py-24 relative z-10 px-4 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-serif text-gray-800 mb-16 text-center"
      >
        Our Future
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {futurePlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <FlipCard plan={plan} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
