import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Blurred glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-violet/10 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* 3D Rotating Cube */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative mb-12"
        style={{ perspective: "800px" }}
      >
        <div
          className="relative w-56 h-56 md:w-72 md:h-72"
          style={{
            transformStyle: "preserve-3d",
            animation: "cubeRotate 20s linear infinite",
          }}
        >
          {/* Cube faces */}
          {[
            { transform: "translateZ(9rem)", label: "front" },
            { transform: "rotateY(180deg) translateZ(9rem)", label: "back" },
            { transform: "rotateY(90deg) translateZ(9rem)", label: "right" },
            { transform: "rotateY(-90deg) translateZ(9rem)", label: "left" },
            { transform: "rotateX(90deg) translateZ(9rem)", label: "top" },
            { transform: "rotateX(-90deg) translateZ(9rem)", label: "bottom" },
          ].map((face) => (
            <div
              key={face.label}
              className="absolute inset-0 glass rounded-2xl flex items-center justify-center border border-neon-blue/20"
              style={{
                transform: face.transform,
                backfaceVisibility: "visible",
              }}
            >
              <div className="text-center p-4">
                <h1 className="font-display text-xl md:text-2xl font-bold text-gradient leading-tight">
                  SMART
                  <br />
                  LEARN
                </h1>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-lg md:text-2xl text-muted-foreground font-body mb-8 tracking-wide"
      >
        Experience Learning in 3D
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative px-10 py-4 rounded-full font-display text-sm md:text-base font-semibold tracking-widest uppercase bg-primary/10 text-primary glow-blue neon-border cursor-pointer transition-all duration-400"
      >
        Enter Learning Universe
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
