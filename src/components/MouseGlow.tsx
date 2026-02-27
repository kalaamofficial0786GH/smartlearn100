import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const MouseGlow = () => {
  const [mounted, setMounted] = useState(false);
  const springX = useSpring(0, { stiffness: 40, damping: 20 });
  const springY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handler = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [springX, springY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[2]"
      style={{
        x: springX,
        y: springY,
        width: 300,
        height: 300,
        marginLeft: -150,
        marginTop: -150,
        borderRadius: "50%",
        background: "radial-gradient(circle, hsl(190 100% 50% / 0.08) 0%, transparent 70%)",
      }}
    />
  );
};

export default MouseGlow;
