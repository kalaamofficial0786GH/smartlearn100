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
import Navbar, { type TabId } from "@/components/Navbar";
import CoursesTab from "@/components/tabs/CoursesTab";
import DashboardTab from "@/components/tabs/DashboardTab";
import AboutTab from "@/components/tabs/AboutTab";
import ContactTab from "@/components/tabs/ContactTab";
import CollegeTab from "@/components/tabs/CollegeTab";
import AuthModal from "@/components/tabs/AuthModal";

type View = "hero" | "courses" | "detail";

const tabComponents: Record<string, React.FC<{ userEmail?: string }>> = {
  courses: CoursesTab,
  dashboard: DashboardTab,
  about: AboutTab,
  contact: ContactTab,
  college: CollegeTab,
};

const Index = () => {
  const [view, setView] = useState<View>("hero");
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);

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

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    if (tab) window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAuthSuccess = useCallback((email: string) => {
    setUser({ email });
    setAuthModal(null);
    setActiveTab("dashboard");
  }, []);

  const TabContent = activeTab ? tabComponents[activeTab] : null;

  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-x-hidden">
      <ParticleField />
      <FloatingCodeLines />
      <MouseGlow />
      <AiLightSweep />

      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSignUp={() => setAuthModal("signup")}
        onLogin={() => setAuthModal("login")}
        user={user}
        onLogout={() => { setUser(null); setActiveTab(null); }}
      />

      <div className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {activeTab && TabContent ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-6xl mx-auto px-4 md:px-8 py-8"
            >
              <TabContent userEmail={user?.email} />
            </motion.div>
          ) : (
            <>
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
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {authModal && (
          <AuthModal
            mode={authModal}
            onClose={() => setAuthModal(null)}
            onSuccess={handleAuthSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
