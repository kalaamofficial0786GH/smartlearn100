import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "Mr. R. Mohamed Meera Niyash, B.E.",
    role: "Project Mentor",
    accent: "blue" as const,
  },
  {
    name: "M. Abdul Kalaam",
    role: "Full Stack Developer",
    accent: "violet" as const,
  },
  {
    name: "S. Gerzim Harrieshma",
    role: "UI/UX Designer",
    accent: "blue" as const,
  },
  {
    name: "S. Boopathi",
    role: "Backend Developer",
    accent: "violet" as const,
  },
  {
    name: "G. Priya Dharshini",
    role: "Testing & Documentation",
    accent: "blue" as const,
  },
];

const TeamCard = ({ member, index }: { member: typeof team[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const isBlue = member.accent === "blue";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className={`glass rounded-2xl p-6 text-center ${isBlue ? "glow-blue" : "glow-violet"} hover:scale-105 transition-transform duration-400`}>
        {/* Avatar circle */}
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-display font-bold ${isBlue ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
          {member.name.charAt(0)}
        </div>
        <h3 className="font-display text-sm font-semibold text-foreground mb-1 leading-tight">
          {member.name}
        </h3>
        <p className={`text-xs font-semibold ${isBlue ? "text-primary" : "text-accent"}`}>
          {member.role}
        </p>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Our Team
        </h2>
        <p className="text-muted-foreground text-lg">
          The minds behind SmartLearn
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {team.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
