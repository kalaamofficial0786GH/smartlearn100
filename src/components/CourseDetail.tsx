import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, ArrowLeft, Users, MessageSquare, TrendingUp, Play, CheckCircle, Mail } from "lucide-react";
import { courses } from "./CourseUniverse";

type Course = typeof courses[0];

// Animated counter hook
const useCounter = (end: number, duration = 1500, start = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef<number>();
  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [end, duration, start]);
  return count;
};

// Radial progress ring
const ScopeRing = ({ value, label }: { value: number; label: string }) => {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="drop-shadow-[0_0_15px_hsl(190_100%_50%/0.3)]">
        <circle cx="70" cy="70" r={r} fill="none" stroke="hsl(217 20% 18%)" strokeWidth="8" />
        <motion.circle
          cx="70" cy="70" r={r} fill="none"
          stroke="url(#scopeGrad)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          transform="rotate(-90 70 70)"
        />
        <defs>
          <linearGradient id="scopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(190 100% 50%)" />
            <stop offset="100%" stopColor="hsl(263 84% 52%)" />
          </linearGradient>
        </defs>
        <text x="70" y="66" textAnchor="middle" className="font-display text-xl font-bold fill-foreground">{value}%</text>
        <text x="70" y="84" textAnchor="middle" className="text-[10px] fill-muted-foreground">Demand</text>
      </svg>
      <p className="text-xs text-muted-foreground mt-2 text-center max-w-[160px]">{label}</p>
    </div>
  );
};

// Mini neon bar chart
const NeonChart = () => {
  const bars = [40, 55, 45, 70, 65, 80, 75, 90, 85, 95];
  return (
    <div className="glass rounded-2xl p-6 glow-blue">
      <h4 className="font-display text-xs tracking-wider text-muted-foreground mb-4 uppercase">Student Growth</h4>
      <div className="flex items-end gap-2 h-32">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-accent/60"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ boxShadow: "0 0 8px hsl(190 100% 50% / 0.3)" }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[9px] text-muted-foreground">Jan</span>
        <span className="text-[9px] text-muted-foreground">Oct</span>
      </div>
    </div>
  );
};

// Typewriter effect
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
};

const CourseDetail = ({ course, onBack }: { course: Course; onBack: () => void }) => {
  const [enrollState, setEnrollState] = useState<"idle" | "loading" | "success">("idle");
  const isBlue = course.color === "neon-blue";
  const studentCount = useCounter(parseInt(course.students.replace(/,/g, "")), 1500);
  const successRate = useCounter(87, 1500);

  const handleEnroll = () => {
    setEnrollState("loading");
    setTimeout(() => setEnrollState("success"), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen py-24 px-6"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onBack}
        className="fixed top-8 left-8 z-50 glass rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer glow-blue"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-display text-xs tracking-wider">Courses</span>
      </motion.button>

      <div className="max-w-5xl mx-auto">
        {/* Course header card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`glass rounded-3xl p-8 md:p-12 mb-8 ${isBlue ? "glow-blue" : "glow-violet"} relative overflow-hidden`}
        >
          {/* FREE badge */}
          <div className="absolute top-6 right-6 flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 animate-pulse">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-display font-bold text-primary tracking-wider">100% FREE</span>
          </div>

          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
            {course.category}
          </span>

          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 max-w-lg">
            {course.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-display text-lg font-bold text-primary">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{studentCount.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{course.reviews} reviews</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">{successRate}% success rate</span>
            </div>
          </div>

          {/* Enroll button with states */}
          <AnimatePresence mode="wait">
            {enrollState === "idle" && (
              <motion.button
                key="enroll"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleEnroll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full font-display text-sm font-semibold tracking-widest uppercase bg-primary/10 text-primary glow-blue neon-border cursor-pointer transition-all duration-400"
              >
                Enroll FREE
              </motion.button>
            )}

            {enrollState === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                <span className="font-display text-sm text-muted-foreground tracking-wider">Enrolling...</span>
              </motion.div>
            )}

            {enrollState === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="font-display text-sm text-primary tracking-wider">Enrolled Successfully</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <NeonChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass rounded-2xl p-6 glow-violet flex flex-col items-center justify-center"
          >
            <h4 className="font-display text-xs tracking-wider text-muted-foreground mb-6 uppercase">Career Scope</h4>
            <ScopeRing value={92} label="High Career Scope — 92% Industry Demand" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass rounded-2xl p-6 glow-blue"
          >
            <h4 className="font-display text-xs tracking-wider text-muted-foreground mb-4 uppercase">Success Rate</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Completion", value: 87 },
                { label: "Job Placement", value: 72 },
                { label: "Satisfaction", value: 95 },
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-primary font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ boxShadow: "0 0 8px hsl(190 100% 50% / 0.4)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enrollment success section */}
        <AnimatePresence>
          {enrollState === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Success message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="glass-strong rounded-3xl p-10 text-center mb-8 glow-blue relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="text-5xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-3">
                    ENROLLMENT SUCCESSFUL
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    You are now officially enrolled in this FREE course.
                  </p>
                </div>
              </motion.div>

              {/* Video player */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="glass rounded-3xl p-2 mb-6 neon-border overflow-hidden"
              >
                <div className="relative w-full aspect-video bg-background rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                  <div className="relative z-10 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full glass-strong flex items-center justify-center mx-auto mb-4 cursor-pointer glow-blue"
                    >
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </motion.div>
                    <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                      Welcome to {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">Lesson 1 — Introduction</p>
                  </div>
                </div>
              </motion.div>

              {/* Email section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="glass rounded-2xl p-6 glow-violet"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="font-display text-xs tracking-wider text-muted-foreground uppercase">Registered Email</span>
                </div>
                <p className="font-mono text-sm text-primary mb-2">
                  <Typewriter text="student@smartlearn.com" delay={1200} />
                </p>
                <p className="text-xs text-muted-foreground">
                  Course access has been sent to your email.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default CourseDetail;
