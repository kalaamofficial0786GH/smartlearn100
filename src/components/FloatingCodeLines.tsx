import { motion } from "framer-motion";

const codeSnippets = [
  '<div class="future">',
  'function learnFree() { return success; }',
  'print("Code Your Future")',
  'const skill = "FullStack";',
  'import { knowledge } from "smartlearn";',
  'async function grow() { await practice(); }',
  '<section className="immersive">',
  'export default StudentSuccess;',
  'npm install future --save',
  'git commit -m "level up"',
];

const FloatingCodeLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-sm text-foreground whitespace-nowrap"
          style={{
            top: `${8 + i * 9}%`,
            left: i % 2 === 0 ? "-20%" : "100%",
            opacity: 0.08,
            filter: "blur(1.5px)",
          }}
          animate={{
            x: i % 2 === 0 ? ["0%", "140vw"] : ["0%", "-140vw"],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCodeLines;
