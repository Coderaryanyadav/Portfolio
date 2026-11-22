"use client";

import { useState } from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import JourneySection from "@/components/sections/JourneySection";
import GitHubSection from "@/components/sections/GitHubSection";
import ContactSection from "@/components/sections/ContactSection";
import CommandPalette from "@/components/ui/CommandPalette";
import ResumeModal from "@/components/ui/ResumeModal";
import CaseStudyModal from "@/components/sections/CaseStudyModal";
import SmoothScroll from "@/components/layout/SmoothScroll";
import MoncyLoader from "@/components/ui/MoncyLoader";
import ContinuousMarquee from "@/components/ui/ContinuousMarquee";
import { Project } from "@/data/projects";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      {/* Signature moncy.dev Interactive Preloader with Bouncing Ball Minigame & Portal Reveal */}
      <MoncyLoader onComplete={() => setLoaderComplete(true)} />

      <main
        className={`relative min-h-screen bg-background text-zinc-100 flex flex-col selection:bg-cyan-400 selection:text-black transition-opacity duration-1000 ${
          loaderComplete ? "opacity-100" : "opacity-95"
        }`}
      >
        {/* Desktop Magnetic Follower Cursor */}
        <CustomCursor />

        {/* Floating Navigation Pill */}
        <Navbar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Hero / Landing Section */}
        <HeroSection />

        {/* Moncy-style Infinite Continuous Ticker Ribbon #1 */}
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

        {/* Moncy-style Signature "WHAT I DO" Discipline Section */}
        <WhatIDoSection />

        {/* Phase 01: Identity & About */}
        <AboutSection />

        {/* Phase 02: Featured Projects & Case Studies */}
        <ProjectsSection onOpenProject={(p) => setActiveCaseStudyProject(p)} />

        {/* Moncy-style Infinite Continuous Ticker Ribbon #2 */}
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

        {/* Phase 04: Engineering Journey & Evolution */}
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
        />

        {/* Interactive Curriculum Vitae Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Case Study Modal from Terminal or Deep Links */}
        <CaseStudyModal
          project={activeCaseStudyProject}
          onClose={() => setActiveCaseStudyProject(null)}
        />
      </main>
    </SmoothScroll>
  );
}
