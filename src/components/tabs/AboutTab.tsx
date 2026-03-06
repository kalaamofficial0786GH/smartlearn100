import { motion } from "framer-motion";
import {
  Target, Eye, Award, Users, BookOpen, TrendingUp,
  Code2, Palette, MousePointerClick, BarChart3, PlayCircle,
  ShieldCheck, LayoutDashboard, Bot, Rocket, Globe,
  Smartphone, Zap, Layers, MonitorPlay
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1500 / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});

const statItems = [
  { label: "Students Enrolled", value: 25000, suffix: "+", icon: <Users className="w-5 h-5" /> },
  { label: "Free Courses", value: 24, suffix: "+", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Success Rate", value: 94, suffix: "%", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Certifications", value: 5000, suffix: "+", icon: <Award className="w-5 h-5" /> },
];

const techStack = [
  {
    title: "Frontend Technologies",
    icon: <Code2 className="w-5 h-5 text-primary" />,
    items: ["HTML5 – Semantic structure", "CSS3 – Advanced styling & animations", "JavaScript – Interactive functionality", "React – Component-based UI architecture", "TypeScript – Type-safe development", "Tailwind CSS – Utility-first styling"],
  },
  {
    title: "UI Design",
    icon: <Palette className="w-5 h-5 text-primary" />,
    items: ["Glassmorphism design language", "3D interactive course cards", "Neon glow effects & gradients", "Responsive grid layouts", "Custom icon system", "Dark-themed modern aesthetic"],
  },
  {
    title: "UX Design",
    icon: <MousePointerClick className="w-5 h-5 text-primary" />,
    items: ["Smooth page transitions", "Scroll-triggered animations", "Intuitive course navigation", "Quick-action shortcuts", "Mobile-first responsive design", "Accessibility-focused interactions"],
  },
  {
    title: "Data & Analytics",
    icon: <BarChart3 className="w-5 h-5 text-primary" />,
    items: ["Real-time student statistics", "Course popularity tracking", "Learning progress visualization", "Enrollment analytics", "Performance metrics", "Interactive charts & graphs"],
  },
  {
    title: "Video Learning System",
    icon: <PlayCircle className="w-5 h-5 text-primary" />,
    items: ["Embedded YouTube player", "Responsive video playback", "Course-specific playlists", "Tamil & English content", "Full-screen support", "Autoplay controls"],
  },
  {
    title: "Authentication & Security",
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    items: ["Secure signup & login", "Email verification system", "Session management", "Protected user routes", "Encrypted data transfer", "Role-based access control"],
  },
  {
    title: "Student Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 text-primary" />,
    items: ["Progress tracking system", "Course enrollment manager", "Learning analytics view", "Personalized recommendations", "Achievement badges", "Study streak tracking"],
  },
  {
    title: "AI Features",
    icon: <Bot className="w-5 h-5 text-primary" />,
    items: ["SmartLearn AI Chatbot", "Course doubt resolution", "Multilingual support (EN/TA)", "Learning path suggestions", "Real-time streaming responses", "Context-aware guidance"],
  },
];

const philosophyItems = [
  { icon: <Layers className="w-5 h-5" />, title: "Clean Architecture", desc: "Modular, maintainable codebase with reusable components" },
  { icon: <Smartphone className="w-5 h-5" />, title: "Mobile First", desc: "Responsive design that works beautifully on every device" },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Performance", desc: "Optimized loading with lazy rendering and code splitting" },
  { icon: <Globe className="w-5 h-5" />, title: "Accessible Learning", desc: "Free education for everyone, regardless of background" },
];

const AboutTab = () => {
  return (
    <div className="space-y-10 pb-8">
      {/* Hero Header */}
      <motion.div {...fade(0)}>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-3">
          About SmartLearn
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl leading-relaxed">
          SmartLearn is a <span className="text-foreground font-medium">100% free coding academy</span> dedicated to making quality programming education accessible to everyone.
          Students can learn in both <span className="text-primary font-medium">Tamil</span> and <span className="text-primary font-medium">English</span>, with courses ranging from basic HTML to advanced AI — completely free of charge.
        </p>
      </motion.div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div {...fade(0.1)} className="glass rounded-xl p-6 glow-blue">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">Our Vision</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To become a <span className="text-foreground">free global coding academy</span> helping students worldwide learn programming without financial barriers — empowering the next generation of developers through accessible, high-quality education.
          </p>
        </motion.div>

        <motion.div {...fade(0.15)} className="glass rounded-xl p-6 glow-violet">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">Our Mission</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Provide 100% free, high-quality coding courses with hands-on projects, AI-powered assistance, and career guidance — breaking financial barriers to tech education for students everywhere.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statItems.map((stat, i) => (
          <motion.div key={stat.label} {...fade(0.2 + i * 0.05)} className="glass rounded-xl p-4 text-center">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              {stat.icon}
            </div>
            <p className="font-display text-xl font-bold text-foreground">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-[10px] text-muted-foreground font-display tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Technology Stack */}
      <motion.div {...fade(0.3)}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
            <MonitorPlay className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Technology Stack</h2>
            <p className="text-xs text-muted-foreground">Built with modern web technologies for the best learning experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06, duration: 0.4 }}
              className="glass rounded-xl p-5 hover:border-primary/30 transition-colors"
              style={{ border: "1px solid hsl(var(--glass-border) / 0.3)" }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {section.icon}
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Development Philosophy */}
      <motion.div {...fade(0.5)}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">Development Philosophy</h2>
            <p className="text-xs text-muted-foreground">The principles that guide how we build SmartLearn</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {philosophyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.07 }}
              className="glass rounded-xl p-5 text-center"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                {item.icon}
              </div>
              <h4 className="font-display text-xs font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div {...fade(0.6)} className="glass rounded-xl p-6">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" /> Key Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Trained 25,000+ students across India",
            "24+ free courses in Tamil & English",
            "94% course completion rate",
            "AI-powered learning assistant integrated",
            "100% placement assistance for top performers",
            "Featured in National Education Awards 2025",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-xs text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutTab;
