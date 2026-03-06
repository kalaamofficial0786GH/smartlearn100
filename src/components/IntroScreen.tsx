import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Auto-transition after 3s
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050505 0%, #0F172A 100%)",
      }}
      exit={{
        scale: 1.3,
        opacity: 0,
        filter: "blur(20px)",
      }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Cinematic zoom container */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        animate={{ scale: [1, 1.02] }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {/* Line 1 */}
        <motion.h1
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          style={{
            color: "hsl(var(--foreground))",
            textShadow:
              "0 0 30px hsl(var(--neon-blue) / 0.4), 0 0 60px hsl(var(--neon-blue) / 0.2)",
          }}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Your Future is Written in Code.
        </motion.h1>

        {/* Line 2 */}
        <motion.p
          className="font-display text-lg sm:text-2xl md:text-3xl font-medium mt-4 sm:mt-6"
          style={{
            color: "hsl(var(--neon-blue))",
            textShadow:
              "0 0 20px hsl(var(--neon-blue) / 0.5), 0 0 40px hsl(var(--neon-blue) / 0.3)",
          }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Start Learning Today – 100% Free.
        </motion.p>

        {/* Entering message */}
        <motion.span
          className="mt-12 sm:mt-16 text-xs sm:text-sm tracking-[0.3em] uppercase"
          style={{
            color: "hsl(var(--muted-foreground))",
            textShadow: "0 0 10px hsl(var(--neon-blue) / 0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
          transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
        >
          Entering SmartLearn...
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
