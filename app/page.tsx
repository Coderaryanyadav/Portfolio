"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CharacterScene from "@/components/character/CharacterScene";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import JourneySection from "@/components/sections/JourneySection";
import GitHubSection from "@/components/sections/GitHubSection";
import ContactSection from "@/components/sections/ContactSection";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeModal from "@/components/ui/ResumeModal";
import CaseStudyModal from "@/components/sections/CaseStudyModal";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ContinuousMarquee from "@/components/ui/ContinuousMarquee";
import { Project } from "@/data/projects";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

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
        {/* Desktop Magnetic Follower Cursor */}
        <CustomCursor />

        {/* Floating Navigation Pill */}
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Fixed 3D Character Model (Orchestrated by GSAP across Hero -> About -> WhatIDo) */}
        <CharacterScene />

        {/* Hero Section matching Image 2 (Front-facing bust, clear face/smile/cap, zero screen occlusion) */}
        <HeroSection />

        {/* Phase 01: Identity & About (Scroll transition bridge) */}
        <AboutSection />

        {/* Signature Moncy Workstation Typing & What I Do (matching Image 3) */}
        <WhatIDoSection />

        {/* Continuous Ticker Ribbon #1 */}
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

        {/* Phase 02: Featured Projects & Case Studies */}
        <ProjectsSection onOpenProject={(p) => setActiveCaseStudyProject(p)} />

        {/* Continuous Ticker Ribbon #2 */}
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
        />
      </main>
    </SmoothScroll>
  );
}
