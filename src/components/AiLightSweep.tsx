import { motion } from "framer-motion";

const AiLightSweep = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <motion.div
        className="absolute top-0 h-full w-[200px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(190 100% 90% / 0.04), transparent)",
        }}
        animate={{ x: ["-200px", "calc(100vw + 200px)"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AiLightSweep;
