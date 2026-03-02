import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Zap, Code2, Shield, Palette, Award, Rocket, CheckCircle2, ExternalLink } from "lucide-react";

const team = [
  {
    name: "Mr. R. Mohamed Meera Niyash, B.E.",
    role: "Project Mentor",
    tagline: "Guiding futures through technology",
    accent: "blue" as const,
    experience: "10+ Years",
    bio: "A visionary educator and project mentor who guides students through cutting-edge technology projects. Passionate about empowering the next generation of developers with industry-ready skills.",
    skills: [
      { name: "Project Management", value: 95 },
      { name: "System Architecture", value: 90 },
      { name: "Mentorship", value: 98 },
      { name: "Research & Development", value: 88 },
    ],
    achievements: [
      "Founded SmartLearn Core Platform",
      "Mentored 500+ students in tech",
      "Designed curriculum for 10 courses",
      "Led AI-powered learning initiative",
    ],
    projects: [
      { name: "SmartLearn Platform", desc: "AI-powered immersive learning", tech: ["React", "Node.js", "AI"], status: 100 },
      { name: "Campus ERP System", desc: "Complete campus management", tech: ["Python", "Django", "PostgreSQL"], status: 95 },
    ],
  },
  {
    name: "M. Abdul Kalaam",
    role: "Full Stack Developer",
    tagline: "Crafting code that shapes the future",
    accent: "violet" as const,
    experience: "3+ Years",
    bio: "A passionate full stack developer specializing in modern web technologies. Builds scalable, performant applications with clean architecture and intuitive user experiences.",
    skills: [
      { name: "React & TypeScript", value: 92 },
      { name: "Node.js & Express", value: 88 },
      { name: "Database Design", value: 85 },
      { name: "API Development", value: 90 },
    ],
    achievements: [
      "Built SmartLearn Core Platform",
      "Developed Course Enrollment System",
      "Created Certificate Generation Engine",
      "Implemented Secure Authentication",
    ],
    projects: [
      { name: "SmartLearn Backend", desc: "Scalable API architecture", tech: ["Node.js", "Express", "MongoDB"], status: 100 },
      { name: "Auth System", desc: "JWT-based secure authentication", tech: ["TypeScript", "JWT", "bcrypt"], status: 100 },
    ],
  },
  {
    name: "S. Gerzim Harrieshma",
    role: "UI/UX Designer",
    tagline: "Designing experiences beyond screens",
    accent: "blue" as const,
    experience: "2+ Years",
    bio: "A creative UI/UX designer with an eye for futuristic aesthetics and immersive digital experiences. Specializes in glassmorphism, 3D interfaces, and motion design.",
    skills: [
      { name: "UI Design", value: 95 },
      { name: "Motion Design", value: 90 },
      { name: "Figma & Prototyping", value: 92 },
      { name: "3D Visual Systems", value: 85 },
    ],
    achievements: [
      "Designed 3D Immersive UI System",
      "Created SmartLearn Design System",
      "Built Motion Animation Library",
      "Crafted Glassmorphism Components",
    ],
    projects: [
      { name: "SmartLearn UI Kit", desc: "Complete design system", tech: ["Figma", "Tailwind", "Framer Motion"], status: 100 },
      { name: "3D Card System", desc: "Interactive 3D components", tech: ["CSS 3D", "Framer Motion"], status: 90 },
    ],
  },
  {
    name: "S. Boopathi",
    role: "Backend Developer",
    tagline: "Engineering robust digital foundations",
    accent: "violet" as const,
    experience: "3+ Years",
    bio: "A backend specialist focused on building secure, high-performance server-side solutions. Expert in database optimization, API design, and system security.",
    skills: [
      { name: "Python & Django", value: 90 },
      { name: "Database Optimization", value: 88 },
      { name: "Security & Auth", value: 92 },
      { name: "Cloud Deployment", value: 85 },
    ],
    achievements: [
      "Developed AI Motion Engine",
      "Built Secure API Gateway",
      "Created Quiz Scoring System",
      "Implemented Cloud Infrastructure",
    ],
    projects: [
      { name: "API Gateway", desc: "Rate-limited secure gateway", tech: ["Python", "Redis", "Docker"], status: 100 },
      { name: "Quiz Engine", desc: "Real-time scoring system", tech: ["Node.js", "WebSocket", "MongoDB"], status: 95 },
    ],
  },
  {
    name: "G. Priya Dharshini",
    role: "Testing & Documentation",
    tagline: "Ensuring perfection in every detail",
    accent: "blue" as const,
    experience: "2+ Years",
    bio: "A meticulous QA specialist and technical writer who ensures every feature meets the highest quality standards. Expert in automated testing and comprehensive documentation.",
    skills: [
      { name: "Test Automation", value: 90 },
      { name: "Technical Writing", value: 95 },
      { name: "Quality Assurance", value: 92 },
      { name: "CI/CD Pipelines", value: 82 },
    ],
    achievements: [
      "Built Automated Test Suite",
      "Created Platform Documentation",
      "Implemented CI/CD Pipeline",
      "Designed QA Workflow System",
    ],
    projects: [
      { name: "Test Framework", desc: "End-to-end test automation", tech: ["Cypress", "Jest", "GitHub Actions"], status: 100 },
      { name: "Docs Portal", desc: "Interactive documentation site", tech: ["Markdown", "Docusaurus", "React"], status: 88 },
    ],
  },
];

type TeamMember = typeof team[0];

/* ── Skill Bar ── */
const SkillBar = ({ name, value, accent, delay }: { name: string; value: number; accent: "blue" | "violet"; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="space-y-1"
  >
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{name}</span>
      <span className={accent === "blue" ? "text-primary" : "text-accent"}>{value}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${accent === "blue" ? "bg-gradient-to-r from-primary/80 to-primary" : "bg-gradient-to-r from-accent/80 to-accent"}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

/* ── Achievement Item ── */
const AchievementItem = ({ text, index, accent }: { text: string; index: number; accent: "blue" | "violet" }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
    className="flex items-center gap-3 group"
  >
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${accent === "blue" ? "bg-primary/10 glow-blue" : "bg-accent/10 glow-violet"}`}>
      <CheckCircle2 className={`w-3.5 h-3.5 ${accent === "blue" ? "text-primary" : "text-accent"}`} />
    </div>
    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{text}</span>
  </motion.div>
);

/* ── Project Card ── */
const ProjectCard = ({ project, accent, index }: { project: TeamMember["projects"][0]; accent: "blue" | "violet"; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
    className={`glass rounded-xl p-4 ${accent === "blue" ? "glow-blue" : "glow-violet"}`}
  >
    <div className="flex items-start justify-between mb-2">
      <h5 className="font-display text-xs font-semibold text-foreground">{project.name}</h5>
      <span className={`text-[10px] font-semibold ${accent === "blue" ? "text-primary" : "text-accent"}`}>{project.status}%</span>
    </div>
    <p className="text-xs text-muted-foreground mb-3">{project.desc}</p>
    {/* Progress ring */}
    <div className="flex items-center gap-3 mb-3">
      <svg width="32" height="32" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--muted)/0.3)" strokeWidth="3" />
        <motion.circle
          cx="18" cy="18" r="14" fill="none"
          stroke={accent === "blue" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={`${project.status * 0.88} 88`}
          transform="rotate(-90 18 18)"
          initial={{ strokeDasharray: "0 88" }}
          animate={{ strokeDasharray: `${project.status * 0.88} 88` }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Detail Panel ── */
const TeamDetail = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  const [showProjects, setShowProjects] = useState(false);
  const isBlue = member.accent === "blue";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(12px)" }}
      />

      {/* Panel */}
      <motion.div
        className={`relative glass-strong rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto ${isBlue ? "glow-blue" : "glow-violet"}`}
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ perspective: 1000 }}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-5 mb-6">
            <motion.div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display font-bold shrink-0 ${isBlue ? "bg-primary/10 text-primary border-2 border-primary/30" : "bg-accent/10 text-accent border-2 border-accent/30"}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              style={{
                boxShadow: isBlue
                  ? "0 0 25px hsl(var(--neon-blue)/0.4)"
                  : "0 0 25px hsl(var(--neon-violet)/0.4)",
              }}
            >
              {member.name.charAt(0)}
            </motion.div>
            <div>
              <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="font-display text-lg font-bold text-foreground leading-tight">
                {member.name}
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`text-sm font-semibold ${isBlue ? "text-primary" : "text-accent"}`}>
                {member.role}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-xs text-muted-foreground mt-1">
                {member.experience} Experience · {member.tagline}
              </motion.p>
            </div>
          </div>

          {/* Bio */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm text-muted-foreground leading-relaxed mb-6">
            {member.bio}
          </motion.p>

          {/* Skills */}
          <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-display text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
            <Zap className={`w-3.5 h-3.5 ${isBlue ? "text-primary" : "text-accent"}`} /> Skills
          </motion.h4>
          <div className="space-y-3 mb-6">
            {member.skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} accent={member.accent} delay={0.3 + i * 0.08} />
            ))}
          </div>

          {/* Achievements */}
          <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-display text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
            <Award className={`w-3.5 h-3.5 ${isBlue ? "text-primary" : "text-accent"}`} /> What They Have Built
          </motion.h4>
          <div className="space-y-2.5 mb-6">
            {member.achievements.map((a, i) => (
              <AchievementItem key={a} text={a} index={i} accent={member.accent} />
            ))}
          </div>

          {/* View Projects Toggle */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => setShowProjects(!showProjects)}
            className={`flex items-center gap-2 text-xs font-display font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${isBlue ? "bg-primary/10 text-primary hover:bg-primary/20 glow-blue" : "bg-accent/10 text-accent hover:bg-accent/20 glow-violet"}`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {showProjects ? "Hide Projects" : "View Projects"}
          </motion.button>

          <AnimatePresence>
            {showProjects && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 mt-4">
                  {member.projects.map((p, i) => (
                    <ProjectCard key={p.name} project={p} accent={member.accent} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Team Card ── */
const TeamCard = ({ member, index, onClick }: { member: TeamMember; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [8, -8]);
  const rotateY = useTransform(x, [-80, 80], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const isBlue = member.accent === "blue";
  const roleIcons: Record<string, typeof Code2> = {
    "Project Mentor": Rocket,
    "Full Stack Developer": Code2,
    "UI/UX Designer": Palette,
    "Backend Developer": Shield,
    "Testing & Documentation": Award,
  };
  const Icon = roleIcons[member.role] || Code2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className={`glass rounded-2xl p-6 text-center ${isBlue ? "glow-blue" : "glow-violet"} hover:scale-105 transition-all duration-400 group relative overflow-hidden`}>
        {/* Sweep highlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 40%, hsl(var(--neon-blue)/0.06) 50%, transparent 60%)" }}
        />

        {/* Avatar */}
        <div
          className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-display font-bold relative ${isBlue ? "bg-primary/10 text-primary border-2 border-primary/20" : "bg-accent/10 text-accent border-2 border-accent/20"}`}
          style={{
            boxShadow: isBlue
              ? "0 0 20px hsl(var(--neon-blue)/0.3)"
              : "0 0 20px hsl(var(--neon-violet)/0.3)",
          }}
        >
          {member.name.charAt(0)}
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${isBlue ? "bg-primary/20" : "bg-accent/20"}`}>
            <Icon className={`w-3 h-3 ${isBlue ? "text-primary" : "text-accent"}`} />
          </div>
        </div>

        <h3 className="font-display text-xs font-semibold text-foreground mb-1 leading-tight">
          {member.name}
        </h3>
        <p className={`text-xs font-semibold mb-1 ${isBlue ? "text-primary" : "text-accent"}`}>
          {member.role}
        </p>
        <p className="text-[10px] text-muted-foreground italic">{member.tagline}</p>
      </div>
    </motion.div>
  );
};

/* ── Section ── */
const TeamSection = () => {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Meet Our Core Team
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          The brilliant minds powering SmartLearn's immersive learning universe
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {team.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} onClick={() => setSelected(member)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <TeamDetail member={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;
