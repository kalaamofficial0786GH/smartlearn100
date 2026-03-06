import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
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
import SmartLearnChatbot from "@/components/SmartLearnChatbot";
import Navbar, { type TabId } from "@/components/Navbar";
import CoursesTab from "@/components/tabs/CoursesTab";
import DashboardTab from "@/components/tabs/DashboardTab";
import AboutTab from "@/components/tabs/AboutTab";
import ContactTab from "@/components/tabs/ContactTab";
import CollegeTab from "@/components/tabs/CollegeTab";
import AuthModal from "@/components/tabs/AuthModal";
import WelcomeNotification from "@/components/WelcomeNotification";
import EnrollmentConfetti from "@/components/EnrollmentConfetti";
import ScrollMotivation from "@/components/ScrollMotivation";

type View = "hero" | "courses" | "detail";

interface HistoryState {
  view: View;
  activeTab: TabId;
  courseId: number | null;
}

const tabComponents: Record<string, React.FC<{ userEmail?: string }>> = {
  courses: CoursesTab,
  dashboard: DashboardTab,
  about: AboutTab,
  contact: ContactTab,
  college: CollegeTab,
};

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [view, setView] = useState<View>("hero");
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showEnrollConfetti, setShowEnrollConfetti] = useState(false);
  const scrollPositions = useRef<Map<string, number>>(new Map());
  const isPoppingState = useRef(false);

  // Build a state key for scroll position tracking
  const getStateKey = useCallback((v: View, tab: TabId, courseId: number | null) => {
    if (tab) return `tab-${tab}`;
    if (v === "detail" && courseId) return `detail-${courseId}`;
    return v;
  }, []);

  // Push a new history state
  const pushHistoryState = useCallback((newView: View, newTab: TabId, courseId: number | null) => {
    const state: HistoryState = { view: newView, activeTab: newTab, courseId };
    window.history.pushState(state, "", "/");
  }, []);

  // Save current scroll position before navigating away
  const saveScrollPosition = useCallback(() => {
    const key = getStateKey(view, activeTab, selectedCourse?.id ?? null);
    scrollPositions.current.set(key, window.scrollY);
  }, [view, activeTab, selectedCourse, getStateKey]);

  // Restore scroll position for a state
  const restoreScrollPosition = useCallback((v: View, tab: TabId, courseId: number | null) => {
    const key = getStateKey(v, tab, courseId);
    const pos = scrollPositions.current.get(key) ?? 0;
    requestAnimationFrame(() => window.scrollTo({ top: pos, behavior: "smooth" }));
  }, [getStateKey]);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      isPoppingState.current = true;
      const state = e.state as HistoryState | null;
      if (state) {
        setView(state.view);
        setActiveTab(state.activeTab);
        if (state.courseId) {
          const course = courses.find(c => c.id === state.courseId) ?? null;
          setSelectedCourse(course);
        } else {
          setSelectedCourse(null);
        }
        restoreScrollPosition(state.view, state.activeTab, state.courseId);
      } else {
        // No state = initial page load state (hero, no tab)
        setView("hero");
        setActiveTab(null);
        setSelectedCourse(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTimeout(() => { isPoppingState.current = false; }, 50);
    };

    // Replace current state so we have a baseline
    const initialState: HistoryState = { view: "hero", activeTab: null, courseId: null };
    window.history.replaceState(initialState, "", "/");

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [restoreScrollPosition]);

  const enterUniverse = useCallback(() => {
    saveScrollPosition();
    setView("courses");
    pushHistoryState("courses", null, null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [saveScrollPosition, pushHistoryState]);

  const selectCourse = useCallback((course: typeof courses[0]) => {
    saveScrollPosition();
    setSelectedCourse(course);
    setView("detail");
    pushHistoryState("detail", null, course.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [saveScrollPosition, pushHistoryState]);

  const backToCourses = useCallback(() => {
    saveScrollPosition();
    setView("courses");
    if (!isPoppingState.current) {
      pushHistoryState("courses", null, null);
    }
    restoreScrollPosition("courses", null, null);
  }, [saveScrollPosition, pushHistoryState, restoreScrollPosition]);

  const backToHero = useCallback(() => {
    saveScrollPosition();
    setView("hero");
    if (!isPoppingState.current) {
      pushHistoryState("hero", null, null);
    }
    restoreScrollPosition("hero", null, null);
  }, [saveScrollPosition, pushHistoryState, restoreScrollPosition]);

  const handleTabChange = useCallback((tab: TabId) => {
    saveScrollPosition();
    setActiveTab(tab);
    if (!isPoppingState.current) {
      pushHistoryState(tab ? "hero" : "hero", tab, null);
    }
    if (tab) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      restoreScrollPosition("hero", null, null);
    }
  }, [saveScrollPosition, pushHistoryState, restoreScrollPosition]);

  const handleAuthSuccess = useCallback((email: string) => {
    setUser({ email });
    setAuthModal(null);
    setActiveTab("dashboard");
    pushHistoryState("hero", "dashboard", null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pushHistoryState]);

  const TabContent = activeTab ? tabComponents[activeTab] : null;

  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
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
                  initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="max-w-6xl mx-auto px-4 md:px-8 py-8"
                >
                  <TabContent userEmail={user?.email} />
                </motion.div>
              ) : (
                <>
                  {view === "hero" && (
                    <motion.div
                      key="hero"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
                    <motion.div
                      key="courses"
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <CourseUniverse onSelectCourse={selectCourse} onBack={backToHero} />
                      <Footer />
                    </motion.div>
                  )}

                  {view === "detail" && selectedCourse && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <CourseDetail course={selectedCourse} onBack={backToCourses} />
                      <Footer />
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {authModal && (
              <AuthModal
                mode={authModal}
                onClose={() => setAuthModal(null)}
                onSuccess={handleAuthSuccess}
              />
            )}
          </AnimatePresence>

          <SmartLearnChatbot />
        </>
      )}
    </div>
  );
};

export default Index;
