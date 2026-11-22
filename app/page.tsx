import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import JourneySection from "@/components/sections/JourneySection";
import GitHubSection from "@/components/sections/GitHubSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-zinc-100 flex flex-col selection:bg-lime selection:text-black">
      {/* Desktop Magnetic Follower Cursor */}
      <CustomCursor />

      {/* Floating Navigation Pill */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Phase 01: Identity & About */}
      <AboutSection />

      {/* Phase 02: Featured Projects & Case Studies */}
      <ProjectsSection />

      {/* Phase 03: Technical Ecosystem */}
      <SkillsSection />

      {/* Phase 04: Engineering Journey */}
      <JourneySection />

      {/* Phase 05: GitHub Audited Repositories */}
      <GitHubSection />

      {/* Phase 06: Contact & Direct Call to Action */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
