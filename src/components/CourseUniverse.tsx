import { motion } from "framer-motion";
import { useRef } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { Star, Zap, ArrowLeft } from "lucide-react";

export const courses = [
  { id: 1, title: "Full Stack Web Development", category: "Web Dev", rating: 4.9, students: "18,540", reviews: "4,200+", color: "neon-blue", videoId: "nu_pCVPKzTk", lang: "English" },
  { id: 2, title: "Frontend (HTML, CSS, JS)", category: "Frontend", rating: 4.8, students: "22,300", reviews: "5,100+", color: "neon-violet", videoId: "HcOc7P5BMi4", lang: "Tamil" },
  { id: 3, title: "React JS Complete Course", category: "Frontend", rating: 4.7, students: "14,120", reviews: "3,400+", color: "neon-blue", videoId: "SqcY0GlETPk", lang: "English" },
  { id: 4, title: "Node.js Backend", category: "Backend", rating: 4.8, students: "11,980", reviews: "2,800+", color: "neon-violet", videoId: "Oe421EPjeBE", lang: "English" },
  { id: 5, title: "Python Masterclass", category: "Language", rating: 4.9, students: "25,670", reviews: "6,300+", color: "neon-blue", videoId: "UrsmFxEIp5k", lang: "Tamil" },
  { id: 6, title: "Data Structures & Algorithms", category: "CS Core", rating: 4.8, students: "16,240", reviews: "3,900+", color: "neon-violet", videoId: "8hly31xKli0", lang: "English" },
  { id: 7, title: "MongoDB Essentials", category: "Database", rating: 4.6, students: "9,870", reviews: "2,100+", color: "neon-blue", videoId: "c2M-rlkkT5o", lang: "English" },
  { id: 8, title: "Flutter App Development", category: "Mobile", rating: 4.7, students: "12,110", reviews: "2,700+", color: "neon-violet", videoId: "CD1Y2DmL5JM", lang: "Tamil" },
  { id: 9, title: "Git & GitHub", category: "DevOps", rating: 4.8, students: "13,450", reviews: "3,200+", color: "neon-blue", videoId: "RGOj5yH7evk", lang: "English" },
  { id: 10, title: "UI/UX Design", category: "Design", rating: 4.7, students: "10,320", reviews: "2,500+", color: "neon-violet", videoId: "c9Wg6Cb_YlU", lang: "English" },
];

const CourseCard3D = ({ course, index, onSelect }: { course: typeof courses[0]; index: number; onSelect: () => void }) => {
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
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          <span className="text-[10px] font-display font-bold text-primary tracking-wider">100% FREE</span>
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
          {course.category}
        </span>

        <div className={`w-full h-28 rounded-xl mb-4 flex items-center justify-center ${isBlue ? "bg-primary/5 border border-primary/10" : "bg-accent/5 border border-accent/10"} group-hover:border-primary/30 transition-colors`}>
          <span className="font-display text-3xl font-bold text-gradient opacity-40 group-hover:opacity-70 transition-opacity">
            {course.title.charAt(0)}
          </span>
        </div>

        <h3 className="font-display text-sm font-semibold text-foreground mb-2 leading-tight pr-16">
          {course.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-xs text-primary font-semibold">{course.rating}</span>
          <span className="text-xs text-muted-foreground ml-1">({course.students} students)</span>
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

const CourseUniverse = ({ onSelectCourse, onBack }: { onSelectCourse: (course: typeof courses[0]) => void; onBack: () => void }) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative min-h-screen py-24 px-6"
    >
      {/* Back button */}
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
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Course Universe
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Explore 10 premium courses — all 100% free, forever.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, i) => (
          <CourseCard3D key={course.id} course={course} index={i} onSelect={() => onSelectCourse(course)} />
        ))}
      </div>
    </motion.section>
  );
};

export default CourseUniverse;
