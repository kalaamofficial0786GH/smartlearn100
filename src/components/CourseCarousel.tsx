import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star, Zap } from "lucide-react";

const courses = [
  { id: 1, title: "Full Stack Web Development", category: "Web Dev", rating: 4.9, students: "18,540", color: "neon-blue" },
  { id: 2, title: "Frontend (HTML, CSS, JS)", category: "Frontend", rating: 4.8, students: "22,300", color: "neon-violet" },
  { id: 3, title: "React JS Complete Course", category: "Frontend", rating: 4.7, students: "14,120", color: "neon-blue" },
  { id: 4, title: "Node.js Backend", category: "Backend", rating: 4.8, students: "11,980", color: "neon-violet" },
  { id: 5, title: "Python Masterclass", category: "Language", rating: 4.9, students: "25,670", color: "neon-blue" },
  { id: 6, title: "Data Structures & Algorithms", category: "CS Core", rating: 4.8, students: "16,240", color: "neon-violet" },
  { id: 7, title: "MongoDB Essentials", category: "Database", rating: 4.6, students: "9,870", color: "neon-blue" },
  { id: 8, title: "Flutter App Development", category: "Mobile", rating: 4.7, students: "12,110", color: "neon-violet" },
  { id: 9, title: "Git & GitHub", category: "DevOps", rating: 4.8, students: "13,450", color: "neon-blue" },
  { id: 10, title: "UI/UX Design", category: "Design", rating: 4.7, students: "10,320", color: "neon-violet" },
];

const CourseCard = ({ course, index }: { course: typeof courses[0]; index: number }) => {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "600px" }}
      className="cursor-pointer"
    >
      <div className={`glass rounded-2xl p-6 h-full ${isBlue ? "glow-blue" : "glow-violet"} hover:scale-105 transition-transform duration-400 relative overflow-hidden`}>
        {/* FREE Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 animate-pulse">
          <Zap className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-display font-bold text-primary tracking-wider">100% FREE</span>
        </div>

        {/* Category badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
          {course.category}
        </span>

        {/* Course visual */}
        <div className={`w-full h-28 rounded-xl mb-4 flex items-center justify-center ${isBlue ? "bg-primary/5 border border-primary/10" : "bg-accent/5 border border-accent/10"}`}>
          <span className="font-display text-3xl font-bold text-gradient opacity-40">
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
          <button className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${isBlue ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-accent/10 text-accent hover:bg-accent/20"}`}>
            Enroll Free
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CourseCarousel = () => {
  return (
    <section id="courses" className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Free Courses
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Master coding with our 100% free, futuristic curriculum. No paywalls, ever.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CourseCarousel;
