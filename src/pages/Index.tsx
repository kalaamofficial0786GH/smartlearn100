import ParticleField from "@/components/ParticleField";
import FloatingCodeLines from "@/components/FloatingCodeLines";
import MouseGlow from "@/components/MouseGlow";
import AiLightSweep from "@/components/AiLightSweep";
import HeroSection from "@/components/HeroSection";
import CourseCarousel from "@/components/CourseCarousel";
import StatsSection from "@/components/StatsSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-x-hidden">
      <ParticleField />
      <FloatingCodeLines />
      <MouseGlow />
      <AiLightSweep />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <CourseCarousel />
        <TeamSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
