import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const events = [
  { icon: "🌱", title: "The day we met", desc: "A moment I'll never forget." },
  { icon: "💬", title: "Our first long conversation", desc: "When I knew there was something special." },
  { icon: "❤️", title: "The day you became my girlfriend", desc: "The best day ever." },
  { icon: "🌸", title: "Today", desc: "Loving you more than yesterday." }
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative z-10 px-4 max-w-4xl mx-auto overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-serif text-gray-800 mb-24 text-center"
      >
        Our Journey
      </motion.h2>

      <div className="relative">
        {/* The Main Trunk */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[4px] bg-green-900/10 -translate-x-1/2 rounded-full" />
        <motion.div 
          className="absolute left-[30px] md:left-1/2 top-0 w-[6px] bg-green-600/80 -translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          style={{ height }}
        />

        <div className="space-y-24 md:space-y-40 relative pt-10 pb-10">
          {events.map((event, index) => (
            <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
              
              {/* Branch connecting to the trunk */}
              <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-40px)] h-[3px] z-0 ${index % 2 === 0 ? 'right-[50%] origin-right' : 'left-[50%] origin-left'}`}>
                <motion.div 
                  className="w-full h-full bg-green-600/60 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <div className={`md:hidden absolute left-[30px] top-1/2 -translate-y-1/2 w-10 h-[3px] z-0 origin-left`}>
                 <motion.div 
                  className="w-full h-full bg-green-600/60 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>

              {/* Node on the trunk */}
              <div className="absolute left-[30px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", delay: 0.5 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-green-600 border-4 border-[#FFF8F5] shadow-lg flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </div>

              {/* Content Card */}
              <div className={`md:w-1/2 w-full flex pl-20 md:pl-0 ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12 md:order-2'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", delay: 0.6 }}
                  className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl border border-white/50 w-full max-w-sm relative z-10 hover:shadow-2xl transition-shadow"
                >
                  <span className="text-4xl mb-4 block drop-shadow-md">{event.icon}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 font-serif">{event.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{event.desc}</p>
                </motion.div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
