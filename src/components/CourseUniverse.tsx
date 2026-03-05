import { useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { Star, Zap, ArrowLeft, Globe, Filter } from "lucide-react";

export const courses = [
  { id: 1, title: "Full Stack Web Development", category: "Web Dev", rating: 4.9, students: "18,540", reviews: "4,200+", color: "neon-blue", videoId: "nu_pCVPKzTk", lang: "English" },
  { id: 2, title: "Frontend (HTML, CSS, JS)", category: "Frontend", rating: 4.8, students: "22,300", reviews: "5,100+", color: "neon-violet", videoId: "HcOc7P5BMi4", lang: "Tamil" },
  { id: 3, title: "React JS Complete Course", category: "Frontend", rating: 4.7, students: "14,120", reviews: "3,400+", color: "neon-blue", videoId: "SqcY0GlETPk", lang: "English" },
  { id: 4, title: "Node.js Backend", category: "Backend", rating: 4.8, students: "11,980", reviews: "2,800+", color: "neon-violet", videoId: "Oe421EPjeBE", lang: "English" },
  { id: 5, title: "Python Masterclass", category: "Programming", rating: 4.9, students: "25,670", reviews: "6,300+", color: "neon-blue", videoId: "UrsmFxEIp5k", lang: "Tamil" },
  { id: 6, title: "Data Structures & Algorithms", category: "CS Core", rating: 4.8, students: "16,240", reviews: "3,900+", color: "neon-violet", videoId: "8hly31xKli0", lang: "English" },
  { id: 7, title: "MongoDB Essentials", category: "Database", rating: 4.6, students: "9,870", reviews: "2,100+", color: "neon-blue", videoId: "c2M-rlkkT5o", lang: "English" },
  { id: 8, title: "Flutter App Development", category: "Mobile", rating: 4.7, students: "12,110", reviews: "2,700+", color: "neon-violet", videoId: "CD1Y2DmL5JM", lang: "Tamil" },
  { id: 9, title: "Git & GitHub", category: "DevOps", rating: 4.8, students: "13,450", reviews: "3,200+", color: "neon-blue", videoId: "RGOj5yH7evk", lang: "English" },
  { id: 10, title: "UI/UX Design", category: "Design", rating: 4.7, students: "10,320", reviews: "2,500+", color: "neon-violet", videoId: "c9Wg6Cb_YlU", lang: "English" },
  { id: 11, title: "Python Full Course – Tamil", category: "Programming", rating: 4.9, students: "70,993", reviews: "8,200+", color: "neon-blue", videoId: "m67-bOpOoPU", lang: "Tamil" },
  { id: 12, title: "Frontend Web Development – Tamil", category: "Web Dev", rating: 4.8, students: "34,500", reviews: "4,800+", color: "neon-violet", videoId: "7dSJubxFWv0", lang: "Tamil" },
  { id: 13, title: "JavaScript Complete Course – Tamil", category: "Programming", rating: 4.8, students: "28,700", reviews: "3,900+", color: "neon-blue", videoId: "poo0BXryffI", lang: "Tamil" },
  { id: 14, title: "Java Full Course – Tamil", category: "Programming", rating: 4.9, students: "45,200", reviews: "5,600+", color: "neon-violet", videoId: "kGxSyqKbzsc", lang: "Tamil" },
  { id: 15, title: "Build Apps with AI – Tamil", category: "AI / ML", rating: 4.7, students: "12,400", reviews: "1,800+", color: "neon-blue", videoId: "K8LhHT0m7o0", lang: "Tamil" },
  { id: 16, title: "Data Structures & Algorithms – Tamil", category: "CS Core", rating: 4.8, students: "19,300", reviews: "2,900+", color: "neon-violet", videoId: "2bH09YEDdxE", lang: "Tamil" },
  { id: 17, title: "Python Masterclass for Data Engineers – Tamil", category: "Programming", rating: 4.9, students: "8,182", reviews: "2,100+", color: "neon-blue", videoId: "HAxm8n9QY50", lang: "Tamil" },
  { id: 18, title: "SQL Masterclass – Tamil", category: "Database", rating: 4.8, students: "15,600", reviews: "2,400+", color: "neon-violet", videoId: "JtaOmwnR6AM", lang: "Tamil" },
  { id: 19, title: "Git & GitHub – Tamil", category: "DevOps", rating: 4.8, students: "12,396", reviews: "3,000+", color: "neon-blue", videoId: "VIBWdLLq9kQ", lang: "Tamil" },
  { id: 20, title: "Vibe Coding with AI – Tamil", category: "AI / ML", rating: 4.7, students: "7,169", reviews: "1,200+", color: "neon-violet", videoId: "OOfIV5JNe9w", lang: "Tamil" },
  { id: 21, title: "Website Build & Hosting – Tamil", category: "Web Dev", rating: 4.7, students: "9,800", reviews: "1,500+", color: "neon-blue", videoId: "HuEUaia9UfE", lang: "Tamil" },
  { id: 22, title: "C Programming Complete Course – Tamil", category: "Programming", rating: 4.8, students: "18,400", reviews: "2,700+", color: "neon-violet", videoId: "fmSnLiAv-zc", lang: "Tamil" },
  { id: 23, title: "Data Science & Machine Learning – Tamil", category: "AI / ML", rating: 4.9, students: "22,100", reviews: "3,300+", color: "neon-blue", videoId: "k6HOBjkUkE4", lang: "Tamil" },
  { id: 24, title: "Microsoft Excel Masterclass – Tamil", category: "Software Tools", rating: 4.8, students: "16,700", reviews: "2,500+", color: "neon-violet", videoId: "ZmBjibf8dyQ", lang: "Tamil" },
];

const allCategories = Array.from(new Set(courses.map(c => c.category)));

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

        {/* Language Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/40 border border-muted/30">
          <Globe className="w-3 h-3 text-muted-foreground" />
          <span className="text-[9px] font-display font-semibold text-muted-foreground tracking-wider">{course.lang}</span>
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 mt-6 ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
          {course.category}
        </span>

        {/* Thumbnail */}
        <div className={`w-full h-28 rounded-xl mb-4 overflow-hidden ${isBlue ? "border border-primary/10" : "border border-accent/10"} group-hover:border-primary/30 transition-colors`}>
          <img
            src={`https://i.ytimg.com/vi/${course.videoId}/hqdefault.jpg`}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className="font-display text-sm font-semibold text-foreground mb-2 leading-tight">
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
  const [langFilter, setLangFilter] = useState<"All" | "English" | "Tamil">("All");
  const [catFilter, setCatFilter] = useState<string>("All");

  const filtered = courses.filter(c => {
    if (langFilter !== "All" && c.lang !== langFilter) return false;
    if (catFilter !== "All" && c.category !== catFilter) return false;
    return true;
  });

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
        className="text-center mb-10"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-4">
          Course Universe
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Explore {courses.length} premium courses — all 100% free, forever.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-display tracking-wider uppercase">Filters</span>
          </div>

          {/* Language filter */}
          <div className="flex gap-2">
            {(["All", "English", "Tamil"] as const).map(l => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-display tracking-wider transition-all cursor-pointer ${
                  langFilter === l
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-muted/20 text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {l === "All" ? "All Languages" : l}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-muted/30 hidden sm:block" />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCatFilter("All")}
              className={`px-3 py-1 rounded-full text-[10px] font-display tracking-wider transition-all cursor-pointer ${
                catFilter === "All"
                  ? "bg-accent/20 text-accent border border-accent/40"
                  : "bg-muted/20 text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              All Categories
            </button>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-display tracking-wider transition-all cursor-pointer ${
                  catFilter === cat
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "bg-muted/20 text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((course, i) => (
          <CourseCard3D key={course.id} course={course} index={i} onSelect={() => onSelectCourse(course)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground font-display">No courses match your filters.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CourseUniverse;