import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const quotes = [
  "Learn Today. Build Tomorrow.",
  "Code Your Future.",
  "Skills are the new currency.",
  "Dream it. Code it. Ship it.",
  "Every expert was once a beginner.",
];

const ScrollMotivation = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {quotes.map((quote, i) => (
        <FloatingQuote key={i} text={quote} index={i} />
      ))}
    </div>
  );
};

const FloatingQuote = ({ text, index }: { text: string; index: number }) => {
  const { scrollYProgress } = useScroll();

  // Each quote appears in a different scroll range
  const start = index * 0.18;
  const peak = start + 0.06;
  const end = start + 0.14;

  const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 0.35, 0]);
  const y = useTransform(scrollYProgress, [start, end], [20, -20]);

  // Alternate sides
  const positions = [
    { left: "8%", top: "30%" },
    { right: "6%", top: "45%" },
    { left: "12%", top: "60%" },
    { right: "10%", top: "25%" },
    { left: "5%", top: "75%" },
  ];

  const pos = positions[index % positions.length];

  return (
    <motion.p
      className="absolute font-display text-sm md:text-base tracking-[0.15em] uppercase"
      style={{
        ...pos,
        opacity,
        y,
        color: "hsl(var(--muted-foreground))",
        textShadow: "0 0 20px hsl(var(--neon-blue) / 0.2)",
      }}
    >
      {text}
    </motion.p>
  );
};

export default ScrollMotivation;
