import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Heart, Sparkles, X, Eye } from 'lucide-react';

interface Memory {
  id: number;
  url: string;
  date: string;
  title: string;
  caption: string;
  tag: string;
}

const memories: Memory[] = [
  {
    id: 1,
    url: "/first_meet.png",
    date: "First Chapter",
    title: "The Beginning",
    caption: "The day I realized how incredibly lucky I am to have found you in this vast world.",
    tag: "Sweet Memories"
  },
  {
    id: 2,
    url: "/gallery1.jpg",
    date: "Sweet Smiles",
    title: "Our Selfie",
    caption: "Your smile is my favorite view in the entire universe. It lights up my whole world.",
    tag: "Cute Selfies"
  },
  {
    id: 3,
    url: "/gallery2.jpg",
    date: "Hand in Hand",
    title: "Holding Hands",
    caption: "Holding your hand makes me feel safe, happy, and complete wherever we go.",
    tag: "Adventures"
  },
  {
    id: 4,
    url: "/gallery3.jpg",
    date: "Cozy Travel",
    title: "Sweet Kiss",
    caption: "Even the longest train journeys feel like a dream when I am holding you close.",
    tag: "Travel Diaries"
  },
  {
    id: 5,
    url: "/gallery4.jpg",
    date: "Timeless Connection",
    title: "Together Forever",
    caption: "A timeless connection that grows stronger and deeper with every passing second.",
    tag: "Classic Love"
  },
  {
    id: 6,
    url: "/gallery5.jpg",
    date: "Pure Magic",
    title: "Loving Hug",
    caption: "Every warm embrace and sweet kiss from you melts all my worries away.",
    tag: "Pure Love"
  }
];

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<Memory | null>(null);

  return (
    <section className="py-24 relative z-10 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-sm font-medium mb-3 border border-pink-200"
        >
          <Sparkles size={16} />
          <span>Our Precious Moments</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif text-gray-800"
        >
          Our Memory Gallery
        </motion.h2>
        <p className="text-gray-500 mt-2 font-serif italic text-sm md:text-base">
          Click any frame to read the memory, or click to expand for full view
        </p>
      </div>

      {/* 6 Photo Frames Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
        {memories.map((memory, index) => {
          const rotations = [-2, 2, -1.5, 2.5, -2];
          const rotation = rotations[index % rotations.length];
          const isSelected = selected === memory.id;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40, rotate: rotation }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              className="cursor-pointer relative bg-white p-3 pb-6 rounded-xl shadow-lg border border-pink-100/50 group transition-all duration-300 hover:shadow-2xl"
              style={{
                boxShadow: '0 12px 30px -10px rgba(244, 114, 182, 0.15), 0 4px 6px -2px rgba(0,0,0,0.05)'
              }}
            >
              {/* Cute Washi Tape / Pin Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-200/70 border border-pink-300/60 rounded-sm shadow-sm backdrop-blur-xs transform -rotate-2 z-20 flex items-center justify-center">
                <Heart size={10} className="text-pink-500 fill-pink-400" />
              </div>

              {/* Photo Container */}
              <div 
                className="aspect-[4/5] overflow-hidden rounded-lg mb-3 relative bg-pink-50"
                onClick={() => setSelected(isSelected ? null : memory.id)}
              >
                <img 
                  src={memory.url} 
                  alt={memory.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Tag Badge */}
                <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide">
                  {memory.tag}
                </div>

                {/* Expand Button Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal(memory);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="View Photo"
                >
                  <Eye size={14} />
                </button>
              </div>
              
              {/* Card Footer Details */}
              <div className="px-1 text-center" onClick={() => setSelected(isSelected ? null : memory.id)}>
                <h3 className="font-serif text-base font-semibold text-gray-800 line-clamp-1">{memory.title}</h3>
                <p className="text-xs font-semibold text-pink-500 mt-0.5">{memory.date}</p>
                
                <motion.div 
                  animate={{ opacity: isSelected ? 1 : 0, height: isSelected ? 'auto' : 0 }}
                  className="overflow-hidden mt-2 text-left bg-pink-50/70 p-2.5 rounded-lg border border-pink-100"
                >
                  <p className="text-xs text-gray-700 font-serif italic leading-relaxed">{memory.caption}</p>
                </motion.div>
                
                {!isSelected && (
                  <div className="mt-2 text-[11px] text-pink-400 font-medium tracking-tight">
                    ✨ Tap to read secret note
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Photo Modal Lightbox */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-2xl max-w-lg w-full relative shadow-2xl overflow-hidden border border-pink-100"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 shadow-inner">
                <img 
                  src={activeModal.url} 
                  alt={activeModal.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest">{activeModal.date}</span>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mt-1 mb-2">{activeModal.title}</h3>
                <p className="text-gray-600 font-serif italic leading-relaxed text-sm md:text-base bg-pink-50/50 p-4 rounded-xl border border-pink-100/70">
                  "{activeModal.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

