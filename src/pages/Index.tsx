import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import FloatingCodeLines from "@/components/FloatingCodeLines";
import MouseGlow from "@/components/MouseGlow";
import AiLightSweep from "@/components/AiLightSweep";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CourseUniverse, { courses } from "@/components/CourseUniverse";
import CourseDetail from "@/components/CourseDetail";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

type View = "hero" | "courses" | "detail";

const Index = () => {
  const [view, setView] = useState<View>("hero");
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  const enterUniverse = useCallback(() => setView("courses"), []);
  const selectCourse = useCallback((course: typeof courses[0]) => {
    setSelectedCourse(course);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const backToCourses = useCallback(() => {
    setView("courses");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const backToHero = useCallback(() => {
    setView("hero");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-x-hidden">
      <ParticleField />
      <FloatingCodeLines />
      <MouseGlow />
      <AiLightSweep />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === "hero" && (
            <motion.div
              key="hero"
              exit={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <HeroSection onEnter={enterUniverse} />
              <StatsSection />
              <TeamSection />
              <Footer />
            </motion.div>
          )}

          {view === "courses" && (
            <motion.div key="courses">
              <CourseUniverse onSelectCourse={selectCourse} onBack={backToHero} />
              <Footer />
            </motion.div>
          )}

          {view === "detail" && selectedCourse && (
            <motion.div key="detail">
              <CourseDetail course={selectedCourse} onBack={backToCourses} />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
