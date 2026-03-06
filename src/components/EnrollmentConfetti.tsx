import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";

interface EnrollmentConfettiProps {
  show: boolean;
  onDone: () => void;
}

const CONFETTI_COLORS = [
  "hsl(190 100% 50%)",   // neon-blue
  "hsl(263 84% 52%)",    // neon-violet
  "hsl(142 76% 46%)",    // green
  "hsl(45 93% 58%)",     // gold
  "hsl(350 89% 60%)",    // rose
  "hsl(200 95% 55%)",    // sky
];

const EnrollmentConfetti = ({ show, onDone }: EnrollmentConfettiProps) => {
  const confettiPieces = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      delay: Math.random() * 0.4,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotation: Math.random() * 720 - 360,
      size: Math.random() * 6 + 4,
      type: i % 3, // 0=circle, 1=rect, 2=star
    })),
  []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Confetti particles */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.type === 1 ? piece.size * 0.4 : piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.type === 0 ? "50%" : piece.type === 1 ? "1px" : "2px",
                top: "50%",
                left: "50%",
              }}
              initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: [0, piece.x * 6, piece.x * 8],
                y: [0, -200 - Math.random() * 150, 400],
                scale: [0, 1.2, 0.5],
                rotate: [0, piece.rotation],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}

          {/* Success popup */}
          <motion.div
            className="relative z-10 glass-strong rounded-3xl px-10 py-8 flex flex-col items-center gap-3 border border-primary/30 max-w-sm mx-4"
            style={{
              boxShadow:
                "0 0 40px hsl(var(--neon-blue) / 0.3), 0 0 80px hsl(var(--neon-blue) / 0.1), 0 16px 48px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, scale: 0.6, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="text-5xl"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
            >
              🎉
            </motion.span>

            <h3 className="font-display text-lg font-bold text-foreground tracking-wide">
              Enrollment Successful!
            </h3>

            <p className="text-sm text-muted-foreground font-body text-center leading-relaxed">
              Thanks for joining this course.
              <br />
              Start learning now.
            </p>

            {/* Progress bar auto-close indicator */}
            <motion.div
              className="w-full h-0.5 rounded-full bg-gradient-to-r from-primary via-accent to-primary mt-2"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3.5, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentConfetti;
