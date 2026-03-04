import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { Star, Zap, ArrowLeft, Globe } from "lucide-react";
import { courses, type Course } from "@/data/courses";

export { courses, type Course } from "@/data/courses";

const CourseCard3D = ({ course, index, onSelect }: { course: Course; index: number; onSelect: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetMouse = () => { x.set(0); y.set(0); };
  const isBlue = course.color === "neon-blue";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.04, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      onClick={onSelect}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "600px" }}
      className="cursor-pointer"
      whileHover={{ z: 30, scale: 1.05 }}
    >
      <div className={`glass rounded-2xl p-6 h-full ${isBlue ? "glow-blue" : "glow-violet"} transition-all duration-400 relative overflow-hidden group`}>
        {/* FREE Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 animate-pulse">
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-display font-bold text-primary tracking-wider">FREE</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
            {course.category}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/30 text-[10px] text-muted-foreground">
            <Globe className="w-3 h-3" />
            {course.lang}
          </span>
        </div>

        <div className={`w-full h-24 rounded-xl mb-4 flex items-center justify-center ${isBlue ? "bg-primary/5 border border-primary/10" : "bg-accent/5 border border-accent/10"} group-hover:border-primary/30 transition-colors`}>
          <span className="font-display text-3xl font-bold text-gradient opacity-40 group-hover:opacity-70 transition-opacity">
            {course.title.charAt(0)}
          </span>
        </div>

        <h3 className="font-display text-sm font-semibold text-foreground mb-2 leading-tight pr-12">
          {course.title}
        </h3>

        <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-primary font-semibold">{course.rating}</span>
          </span>
          <span>{course.students} students</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-[10px] text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-muted/20">{course.level}</span>
          <span className="px-2 py-0.5 rounded-full bg-muted/20">{course.duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-primary glow-text-blue">FREE</span>
          <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${isBlue ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
            View Course
          </span>
        </div>
      </div>
    </motion.div>
  );
};

type LangFilter = "all" | "English" | "Tamil";

const CourseUniverse = ({ onSelectCourse, onBack }: { onSelectCourse: (course: Course) => void; onBack: () => void }) => {
  const [langFilter, setLangFilter] = useState<LangFilter>("all");
  const filtered = langFilter === "all" ? courses : courses.filter(c => c.lang === langFilter);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative min-h-screen py-24 px-6"
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBack}
        className="fixed top-8 left-8 z-50 glass rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer glow-blue"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-display text-xs tracking-wider">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Course Universe
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
          Explore {courses.length} premium courses — all 100% free, forever.
        </p>

        {/* Language filter */}
        <div className="flex items-center justify-center gap-3">
          {(["all", "English", "Tamil"] as LangFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setLangFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-display tracking-wider transition-all cursor-pointer ${
                langFilter === f
                  ? "bg-primary/20 text-primary border border-primary/40 glow-blue"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? `All (${courses.length})` : `${f} (${courses.filter(c => c.lang === f).length})`}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((course, i) => (
          <CourseCard3D key={course.id} course={course} index={i} onSelect={() => onSelectCourse(course)} />
        ))}
      </div>
    </motion.section>
  );
};

export default CourseUniverse;
