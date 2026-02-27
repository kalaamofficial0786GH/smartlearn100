import ParticleField from "@/components/ParticleField";
import HeroSection from "@/components/HeroSection";
import CourseCarousel from "@/components/CourseCarousel";
import StatsSection from "@/components/StatsSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-x-hidden">
      <ParticleField />
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
