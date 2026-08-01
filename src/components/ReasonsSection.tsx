import { motion } from 'motion/react';

const reasons = [
  "Your kindness",
  "Your smile",
  "The way you understand me",
  "The way you make ordinary days special",
  "The way you believe in us"
];

export function ReasonsSection() {
  return (
    <section className="min-h-screen py-24 flex flex-col items-center justify-center relative z-10 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl md:text-5xl font-serif text-gray-800 mb-16 text-center"
      >
        Reasons I Love You
      </motion.h2>

      <div className="space-y-8 w-full max-w-lg">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow text-center"
          >
            <p className="text-xl text-gray-800 font-medium">❤️ {reason}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
