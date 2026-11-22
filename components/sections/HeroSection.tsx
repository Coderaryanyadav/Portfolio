"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Terminal, Shield, Cpu } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

const ROTATING_TITLES = [
  { top: "DESIGNER", bottom: "DEVELOPER" },
  { top: "ARCHITECT", bottom: "ENGINEER" },
  { top: "CYBERSECURITY", bottom: "SYSTEMS BUILDER" },
];

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="landing-section relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
    >
      {/* Top telemetry bar */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 pt-24 pb-4 flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-white/5 relative z-20 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-zinc-300 font-medium tracking-wide">
            AVAILABLE FOR PRODUCTION & HIGH-STAKES ARCHITECTURE
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px] text-zinc-400 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5">
            <Cpu size={12} className="text-cyan-400" /> Offline AI & RAG
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Shield size={12} className="text-cyan-400" /> Cybersecurity
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Terminal size={12} className="text-cyan-400" /> Full-Stack
          </span>
        </div>
      </div>

      {/* Main Landing Container (Image 2) */}
      <div className="landing-container w-full max-w-[1920px] mx-auto relative my-auto py-8">
        {/* Left Column: Hello! I'm ARYAN YADAV */}
        <div className="landing-intro pointer-events-auto">
          <h2>Hello! I'm</h2>
          <h1>
            ARYAN
            <br />
            <span>YADAV</span>
          </h1>

          <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed max-w-xs pt-3 hidden sm:block">
            Software engineer specializing in offline AI, statutory compliance engines, and resilient full-stack systems.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <MagneticButton>
              <a
                href="#what-i-do"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_25px_rgba(0,210,255,0.4)]"
              >
                <span>What I Do</span>
                <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-heading font-medium text-xs uppercase tracking-wider hover:bg-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
              >
                <span>Contact</span>
                <ArrowUpRight size={12} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: A Creative DESIGNER DEVELOPER */}
        <div className="landing-info pointer-events-auto">
          <h3>A Creative</h3>
          <h2 className="landing-info-h2 transition-all duration-500">
            {ROTATING_TITLES[titleIdx].top}
          </h2>
          <h2 className="landing-h2-info transition-all duration-500">
            {ROTATING_TITLES[titleIdx].bottom}
          </h2>

          <div className="pt-3 hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>14 Audited Repositories • 100% Code Verified</span>
          </div>

          <div className="pt-1 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>Move cursor to turn head • Hover face</span>
          </div>
        </div>
      </div>

      {/* Bottom telemetry footer */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 pb-6 pt-4 flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-white/5 relative z-20 pointer-events-none">
        <span className="flex items-center gap-2 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Scroll to view 3D workstation & What I Do
        </span>
        <a
          href="#about"
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 group pointer-events-auto"
        >
          <span>Phase 01: Identity</span>
          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
