import { motion } from "framer-motion";
import { useMemo } from "react";

const cropEmojis = ["🌾", "🌽", "🍚", "🌿", "🍃", "☘️", "🌱", "🍂", "🌻", "🌺", "🍀", "🌴", "🥬", "🍅", "🥕", "🫑", "🌶️", "🥭", "🍋", "🍊"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: cropEmojis[Math.floor(Math.random() * cropEmojis.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 16 + Math.random() * 28,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * -20,
    rotation: Math.random() * 360,
    opacity: 0.15 + Math.random() * 0.2,
  }));
}

export default function AnimatedBackground() {
  const particles = useMemo(() => generateParticles(25), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] rounded-full blur-[150px] opacity-50"
          style={{ background: "radial-gradient(circle, hsl(142 60% 80% / 0.5), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[50vh] rounded-full blur-[180px] opacity-45"
          style={{ background: "radial-gradient(circle, hsl(100 50% 85% / 0.4), transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full blur-[120px] opacity-40"
          style={{ background: "radial-gradient(circle, hsl(38 80% 85% / 0.3), transparent 70%)" }} />
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(142 40% 40%) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating crop particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -50, 0, 30, 0],
            x: [0, 20, -15, 8, 0],
            rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
            scale: [1, 1.08, 0.95, 1.03, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Floating orbs - softer for light theme */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{ background: "hsl(142 60% 50%)", boxShadow: "0 0 20px hsl(142 60% 50% / 0.3)", top: "20%", left: "10%" }}
        animate={{ y: [0, -80, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.4, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: "hsl(100 60% 50%)", boxShadow: "0 0 15px hsl(100 60% 50% / 0.3)", top: "60%", right: "15%" }}
        animate={{ y: [0, -60, 0], opacity: [0.25, 0.5, 0.25], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: -3 }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{ background: "hsl(38 80% 55%)", boxShadow: "0 0 18px hsl(38 80% 55% / 0.3)", bottom: "30%", left: "70%" }}
        animate={{ y: [0, -90, 0], opacity: [0.2, 0.45, 0.2], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: -6 }}
      />
    </div>
  );
}
