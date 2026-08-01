import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, ChevronUp, ChevronDown } from 'lucide-react';

const LYRICS = [
  { time: 0, text: "I still remember the first day we met... 🌸" },
  { time: 15, text: "Your smile lit up my entire world... ✨" },
  { time: 35, text: "Holding your hand felt like coming home... 💕" },
  { time: 55, text: "Every single day with you is a new adventure... 🗺️" },
  { time: 75, text: "I love you more than words can ever say... ❤️" },
  { time: 90, text: "Forever and always, my favorite person... 🎀" }
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 145;
  const [currentLyric, setCurrentLyric] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio('./our-song.mp3');
    audio.loop = true;
    setAudioEl(audio);

    return () => {
      audio.pause();
    };
  }, []);

  // Update progress and lyrics
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev >= duration ? 0 : prev + 1;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Find active lyric
  useEffect(() => {
    const active = [...LYRICS]
      .reverse()
      .find((l) => currentTime >= (l.time / 100) * duration);
    if (active) setCurrentLyric(active.text);
  }, [currentTime]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const togglePlay = () => {
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      setIsPlaying(false);
    } else {
      audioEl.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio play blocked or failed:", err);
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 left-4 z-40 select-none"
      style={{ maxWidth: isCollapsed ? '52px' : '240px' }}
    >
      {/* Collapse / Expand toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -top-3 -right-3 z-50 w-7 h-7 rounded-full bg-zinc-800/90 border border-zinc-600 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors shadow-md"
      >
        {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence mode="wait">
        {isCollapsed ? (
          /* Mini floating play button when collapsed */
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-lg hover:bg-black/85 transition-colors"
          >
            {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" className="ml-0.5" />}
          </motion.button>
        ) : (
          /* Full mini player */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/60 backdrop-blur-xl text-white p-3 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-2"
          >
            {/* Top row: Album art + details */}
            <div className="flex items-center gap-2.5">
              <motion.div 
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-lg bg-gradient-to-tr from-pink-500 to-rose-500 shadow-sm flex items-center justify-center relative overflow-hidden border border-white/10 flex-shrink-0"
              >
                <img 
                  src="/favorite_photo.png" 
                  alt="Our Story" 
                  className="w-full h-full object-cover opacity-70"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <Heart className="absolute inset-0 m-auto text-white fill-white" size={14} />
              </motion.div>

              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-xs truncate">Our Story ❤️</h4>
                <p className="text-[10px] text-zinc-400 truncate">Me & You</p>
              </div>

              {/* Mini wave visualizer */}
              {isPlaying && (
                <div className="flex gap-px items-end h-4 flex-shrink-0">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['3px', '12px', '5px', '12px'] }}
                      transition={{ repeat: Infinity, duration: 0.7 + i * 0.15 }}
                      className="w-[3px] bg-[#1db954] rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Lyric line */}
            <div className="h-7 flex items-center justify-center bg-zinc-900/50 rounded-lg px-2 border border-zinc-800/50">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLyric}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[9px] font-medium text-pink-300/90 italic tracking-wide line-clamp-1 text-center"
                >
                  {isPlaying ? currentLyric : "🎵 Tap Play..."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-1">
              <div className="w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1db954] rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[8px] text-zinc-500 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button className="text-zinc-500 hover:text-white transition-colors">
                <SkipBack size={14} />
              </button>
              <motion.button
                onClick={togglePlay}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors shadow-sm"
              >
                {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" className="ml-px" />}
              </motion.button>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <SkipForward size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
