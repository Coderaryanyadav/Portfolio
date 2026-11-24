"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Shield, Cpu, Download } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

const ROTATING_TITLES = [
  { prefix: "Architecting", top: "AIR-GAPPED AI", bottom: "SYSTEMS & RAG" },
  { prefix: "Engineering", top: "OFFLINE-FIRST", bottom: "FULL-STACK CODE" },
  { prefix: "Deploying", top: "MISSION-CRITICAL", bottom: "SPATIAL LOGISTICS" },
];

export default function HeroSection() {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="landing-section relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
    >
      {/* Top telemetry bar */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 pt-24 pb-4 hidden md:flex items-center justify-between font-mono text-xs text-zinc-400 relative z-20 pointer-events-none">
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

      {/* Mobile & Tablet (< 1024px) Dedicated Hero Showcase (Fast, fluid, zero 3D clutter) */}
      <div className="lg:hidden w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-6 pt-28 pb-12 px-6 relative z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold tracking-wide">AVAILABLE FOR PRODUCTION ARCHITECTURE</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-[#c2a4ff] font-mono text-sm tracking-widest uppercase">Hello! I&apos;m</h2>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight uppercase">
            ARYAN YADAV
          </h1>
        </div>

        {/* Dynamic Rotating Engineering Pillars */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#090b14]/90 border border-cyan-500/25 w-full shadow-[0_0_30px_rgba(0,210,255,0.06)] min-h-[135px] flex flex-col justify-center overflow-hidden relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={titleIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 w-full"
            >
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider block">
                {ROTATING_TITLES[titleIdx].prefix}
              </span>
              <div className="text-xl sm:text-2xl font-heading font-extrabold text-[#c481ff]">
                {ROTATING_TITLES[titleIdx].top}
              </div>
              <div className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                {ROTATING_TITLES[titleIdx].bottom}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed max-w-md">
          Software engineer specializing in air-gapped AI, local vector RAG pipelines, and high-integrity full-stack systems.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#what-i-do"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-black font-heading font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,210,255,0.3)]"
          >
            <span>What I Do</span>
            <ArrowDown size={13} />
          </a>

          <a
            href="/resume.pdf"
            download="Aryan_Yadav_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-heading font-bold text-xs uppercase tracking-wider"
          >
            <Download size={13} />
            <span>Resume (PDF)</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-heading font-medium text-xs uppercase tracking-wider"
          >
            <span>Contact</span>
            <ArrowUpRight size={13} className="text-zinc-400" />
          </a>
        </div>

        <div className="pt-2 font-mono text-[11px] text-zinc-400 flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>14 Audited Repositories</span>
          <span>•</span>
          <span>0KB Cloud Egress</span>
          <span>•</span>
          <span>Sub-50ms Spatial GIS</span>
        </div>
      </div>

      {/* Desktop (>= 1024px) Main Landing Container (Side-by-side with 3D Character Corridor) */}
      <div className="hidden lg:block landing-container w-full max-w-[1920px] mx-auto relative my-auto py-8">
        {/* Left Column: Hello! I'm ARYAN YADAV */}
        <div className="landing-intro pointer-events-auto">
          <h2>Hello! I&apos;m</h2>
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
                href="/resume.pdf"
                download="Aryan_Yadav_Resume.pdf"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-heading font-bold text-xs uppercase tracking-wider hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                title="Download Aryan's Resume (PDF)"
              >
                <span>Resume</span>
                <Download size={12} className="group-hover:translate-y-0.5 transition-transform" />
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

        {/* Right Column: High-Conviction Engineering Pillars with Organic Floating Drift */}
        <motion.div
          animate={{ y: ["-50%", "calc(-50% - 6px)", "-50%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="landing-info pointer-events-auto"
        >
          <div className="min-h-[145px] flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={titleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1 w-full"
              >
                <h3 className="text-cyan-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{ROTATING_TITLES[titleIdx].prefix}</span>
                </h3>
                <h2 className="landing-info-h2">
                  {ROTATING_TITLES[titleIdx].top}
                </h2>
                <h2 className="landing-h2-info">
                  {ROTATING_TITLES[titleIdx].bottom}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-3 hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>14 Audited Repositories • 0KB Cloud Egress</span>
          </div>

          <div className="pt-1 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sub-50ms Spatial GIS • Production Flutter &amp; Next.js 15</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom telemetry footer with safe side padding to avoid floating icon collision */}
      <div className="hero-bottom-bar w-full max-w-[1920px] mx-auto px-6 sm:px-12 md:px-28 xl:px-36 pb-6 pt-4 flex items-center justify-between text-xs font-mono text-zinc-400 relative z-20 pointer-events-none transition-opacity duration-300">
        <span className="flex items-center gap-2 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Scroll to explore workstation &amp; What I Do
        </span>
        <a
          href="#what-i-do"
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 group pointer-events-auto"
        >
          <span>Phase 01: Capabilities</span>
          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
