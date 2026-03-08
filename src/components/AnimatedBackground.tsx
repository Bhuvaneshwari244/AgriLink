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
    opacity: 0.06 + Math.random() * 0.12,
  }));
}

export default function AnimatedBackground() {
  const particles = useMemo(() => generateParticles(30), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[50vh] rounded-full blur-[180px] opacity-15"
          style={{ background: "radial-gradient(circle, hsl(142 71% 45% / 0.3), transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full blur-[120px] opacity-10"
          style={{ background: "radial-gradient(circle, hsl(38 92% 50% / 0.3), transparent 70%)" }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
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
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -60, 0, 40, 0],
            x: [0, 30, -20, 10, 0],
            rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
            scale: [1, 1.1, 0.9, 1.05, 1],
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

      {/* Diagonal light streaks */}
      <motion.div
        className="absolute -top-[50%] -left-[20%] w-[200%] h-[200%] opacity-[0.02]"
        style={{
          background: "repeating-linear-gradient(45deg, transparent, transparent 200px, hsl(var(--primary)) 200px, hsl(var(--primary)) 201px)",
        }}
        animate={{ x: [0, 100], y: [0, 100] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{ background: "hsl(var(--primary))", boxShadow: "0 0 20px hsl(var(--primary) / 0.5)", top: "20%", left: "10%" }}
        animate={{ y: [0, -100, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: "hsl(var(--success))", boxShadow: "0 0 15px hsl(var(--success) / 0.4)", top: "60%", right: "15%" }}
        animate={{ y: [0, -80, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: -3 }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{ background: "hsl(var(--warning))", boxShadow: "0 0 18px hsl(var(--warning) / 0.4)", bottom: "30%", left: "70%" }}
        animate={{ y: [0, -120, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 1.4, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: -6 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)" }} />
    </div>
  );
}
