import { motion } from "framer-motion";
import { Target, Eye, Award, Users, BookOpen, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const duration = 1500;
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
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const statItems = [
  { label: "Students Enrolled", value: 25000, suffix: "+", icon: <Users className="w-5 h-5" /> },
  { label: "Free Courses", value: 10, suffix: "+", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Success Rate", value: 94, suffix: "%", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Certifications", value: 5000, suffix: "+", icon: <Award className="w-5 h-5" /> },
];

const AboutTab = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-2">About SmartLearn</h2>
        <p className="text-muted-foreground text-sm max-w-2xl">
          SmartLearn is an AI-powered free coding academy by Al-Ameen Polytechnic College, dedicated to making quality tech education accessible to everyone.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 glow-blue">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">Our Vision</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To become the leading free coding education platform, empowering students with industry-ready skills through immersive AI-driven learning experiences.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 glow-violet">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">Our Mission</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Provide 100% free, high-quality coding courses with hands-on projects, certificates, and career guidance — breaking financial barriers to tech education.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statItems.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="glass rounded-xl p-4 text-center"
          >
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

      {/* Achievements */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" /> Key Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Trained 25,000+ students across India",
            "Partnered with leading tech companies for internships",
            "94% course completion rate",
            "Featured in National Education Awards 2025",
            "100% placement assistance for top performers",
            "AI-integrated adaptive learning system",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-xs text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
