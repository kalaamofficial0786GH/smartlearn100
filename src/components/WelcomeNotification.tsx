import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

interface WelcomeNotificationProps {
  show: boolean;
  onDone: () => void;
}

const WelcomeNotification = ({ show, onDone }: WelcomeNotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-24 left-1/2 z-[100] pointer-events-none"
          initial={{ opacity: 0, y: -30, x: "-50%", scale: 0.85, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.9, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="glass-strong rounded-2xl px-8 py-5 flex flex-col items-center gap-2 border border-primary/20"
            style={{
              boxShadow:
                "0 0 30px hsl(var(--neon-blue) / 0.25), 0 0 60px hsl(var(--neon-blue) / 0.1), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🚀</span>
              <h3 className="font-display text-sm md:text-base font-bold text-foreground tracking-wide">
                Welcome to SmartLearn Universe
              </h3>
            </div>
            <p className="text-xs text-muted-foreground font-body tracking-wide">
              Explore Free Coding Courses
            </p>
            {/* Animated glow bar */}
            <motion.div
              className="h-0.5 rounded-full bg-gradient-to-r from-primary via-accent to-primary mt-1"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeNotification;
