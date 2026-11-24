"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CharacterScene from "@/components/character/CharacterScene";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import JourneySection from "@/components/sections/JourneySection";
import ContactSection from "@/components/sections/ContactSection";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeModal from "@/components/ui/ResumeModal";
import CaseStudyModal from "@/components/sections/CaseStudyModal";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ContinuousMarquee from "@/components/ui/ContinuousMarquee";
import SocialIcons from "@/components/ui/SocialIcons";
import MoncyLoader from "@/components/ui/MoncyLoader";
import MobileQuickDock from "@/components/ui/MobileQuickDock";
import { Project } from "@/data/projects";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Responsive device detection: 3D character workstation only loads on desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global ⌘K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-background text-zinc-100 flex flex-col selection:bg-cyan-400 selection:text-black">
        {/* Cinematic Preloader (First visit in session) */}
        <MoncyLoader />

        {/* Desktop Magnetic Follower Cursor */}
        <CustomCursor />

        {/* Floating Navigation Pill */}
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Moncy Fixed Magnetic Social Icons & Resume Floating Pill */}
        <SocialIcons onOpenResume={() => setResumeOpen(true)} />

        {/* Mobile Floating Quick-Action Dock (Direct Resume, Cal.com, ⌘K) */}
        <MobileQuickDock
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Fixed 3D Character Model (Orchestrated by GSAP across Hero -> About -> WhatIDo, Desktop Only) */}
        {isDesktop && <CharacterScene />}

        {/* Hero Section matching Image 2 (Front-facing bust, clear face/smile/cap, zero screen occlusion) */}
        <HeroSection />

        {/* Phase 01: Unified Signature Workstation Typing, Identity & What I Do */}
        <WhatIDoSection />

        {/* Narrative Architectural Bridge into Audited Codebases */}
        <div id="projects-marquee" className="relative z-20 bg-[#06070d]">
          <ContinuousMarquee
            items={[
              "INITIALIZING ARCHITECTURE INDEX",
              "14 AUDITED REPOSITORIES",
              "OFFLINE-FIRST AI & RAG",
              "SUB-SECOND EVENT LOOPS",
              "AIR-GAPPED COMPLIANCE",
              "ZERO DATA LEAKAGE",
            ]}
            direction="right"
            speedSeconds={26}
            className="border-cyan-500/10"
          />
        </div>

        {/* Phase 03: Verified Repositories & Case Studies */}
        <ProjectsSection onOpenProject={(p) => setActiveCaseStudyProject(p)} />

        {/* Continuous Ticker Ribbon #1 - Clean placement between Projects and Skills */}
        <ContinuousMarquee
          items={[
            "Offline AI & RAG",
            "Statutory Rule Engines",
            "Spatial GIS Logistics",
            "Cybersecurity & AES Ciphers",
            "Cross-Platform Flutter & React Native",
            "Blockchain Solidity Verification",
          ]}
          direction="left"
          speedSeconds={32}
        />

        {/* Phase 04: Technical Capabilities */}
        <SkillsSection />

        {/* Continuous Ticker Ribbon #2 - Between Skills and Journey */}
        <ContinuousMarquee
          items={[
            "FinAuditPro Desktop",
            "ApnaGate Guard System",
            "Tankr Spatial Dispatch",
            "AegisAI Air-Gapped RAG",
            "Opskl Shift Monorepo",
            "AyurChain Web3 Verification",
          ]}
          direction="right"
          speedSeconds={28}
        />

        {/* Phase 05: Engineering Chronology */}
        <JourneySection />

        {/* Phase 06: Contact & Direct Call to Action */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Interactive Developer Terminal (⌘K) */}
        <CommandPalette
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onSelectProject={(p) => setActiveCaseStudyProject(p)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Interactive Curriculum Vitae Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Single Root Case Study Modal */}
        <CaseStudyModal
          project={activeCaseStudyProject}
          onClose={() => setActiveCaseStudyProject(null)}
          onSelectProject={(p) => setActiveCaseStudyProject(p)}
        />
      </main>
    </SmoothScroll>
  );
}
