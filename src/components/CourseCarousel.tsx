import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const courses = [
  { id: 1, title: "AI & Machine Learning", category: "Technology", rating: 4.9, price: "$49", students: "12.4K", color: "neon-blue" },
  { id: 2, title: "3D Web Development", category: "Development", rating: 4.8, price: "$39", students: "8.2K", color: "neon-violet" },
  { id: 3, title: "Quantum Computing", category: "Science", rating: 4.7, price: "$59", students: "5.1K", color: "neon-blue" },
  { id: 4, title: "Cybersecurity Pro", category: "Security", rating: 4.9, price: "$45", students: "15.7K", color: "neon-violet" },
  { id: 5, title: "Blockchain Mastery", category: "Finance", rating: 4.6, price: "$55", students: "6.8K", color: "neon-blue" },
  { id: 6, title: "UX for the Metaverse", category: "Design", rating: 4.8, price: "$35", students: "9.3K", color: "neon-violet" },
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

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  const isBlue = course.color === "neon-blue";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "600px" }}
      className="cursor-pointer"
    >
      <div className={`glass rounded-2xl p-6 h-full ${isBlue ? "glow-blue" : "glow-violet"} hover:scale-105 transition-transform duration-400`}>
        {/* Category badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
          {course.category}
        </span>

        {/* Course visual placeholder */}
        <div className={`w-full h-32 rounded-xl mb-4 flex items-center justify-center ${isBlue ? "bg-primary/5 border border-primary/10" : "bg-accent/5 border border-accent/10"}`}>
          <span className="font-display text-3xl font-bold text-gradient opacity-40">
            {course.title.charAt(0)}
          </span>
        </div>

        <h3 className="font-display text-sm font-semibold text-foreground mb-2 leading-tight">
          {course.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-xs text-primary font-semibold">{course.rating}</span>
          <span className="text-xs text-muted-foreground ml-1">({course.students})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-foreground">{course.price}</span>
          <button className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${isBlue ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-accent/10 text-accent hover:bg-accent/20"}`}>
            Enroll
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CourseCarousel = () => {
  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Explore Courses
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Dive into our futuristic curriculum, designed for the next generation of learners.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CourseCarousel;
