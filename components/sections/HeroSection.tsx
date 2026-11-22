"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Shield, Cpu, Sparkles, FolderGit2 } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import MagneticButton from "../ui/MagneticButton";

const ROTATING_TITLES = [
  { top: "ENGINEER", bottom: "DEVELOPER" },
  { top: "ARCHITECT", bottom: "SYSTEMS BUILDER" },
  { top: "CYBERSECURITY", bottom: "OFFLINE AI DEV" },
  { top: "DESIGNER", bottom: "FULL-STACK ENG" },
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
      className="landing-section relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 xl:px-20 overflow-hidden"
    >
      {/* Top telemetry bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-zinc-400 py-3 border-b border-white/5 relative z-20"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-zinc-300 font-medium tracking-wide">
            AVAILABLE FOR PRODUCTION & HIGH-STAKES ARCHITECTURE
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px] text-zinc-400">
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
      </motion.div>

      {/* Main Hero Container matching Image 2 Layout */}
      <div className="landing-container w-full max-w-7xl mx-auto my-auto py-12 relative z-20 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* Left Column (Image 2: "Hello! I'm / ARYAN / YADAV") */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-6 pointer-events-auto"
          >
            <div className="landing-intro">
              <h2 className="text-[#c2a4ff] font-mono text-sm sm:text-base tracking-[0.2em] uppercase font-light">
                Hello! I'm
              </h2>
              <h1 className="font-heading font-black tracking-tight text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white uppercase leading-[0.88] mt-2">
                ARYAN
                <br />
                <span className="text-white">YADAV</span>
                <span className="text-cyan-400 font-sans">.</span>
              </h1>
            </div>

            <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed max-w-sm pt-2">
              Software engineer specializing in offline-first AI, statutory compliance engines, and resilient full-stack systems.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton>
                <a
                  href="#what-i-do"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:scale-105 active:scale-95"
                >
                  <span>Explore What I Do</span>
                  <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-heading font-medium text-xs uppercase tracking-wider hover:bg-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Let's Connect</span>
                  <ArrowUpRight size={13} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Center Column: Open viewport for the 3D Character Bust (Image 2) */}
          <div className="lg:col-span-4 h-32 lg:h-full flex items-center justify-center pointer-events-none select-none">
            {/* Kept open for fixed CharacterScene canvas */}
          </div>

          {/* Right Column (Image 2: "A Creative / DEVELOPER / DESIGNER") */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 space-y-6 lg:pl-6 pointer-events-auto"
          >
            <div className="landing-info space-y-2">
              <h3 className="text-[#c2a4ff] font-mono text-sm sm:text-base tracking-[0.2em] uppercase font-light">
                A Creative
              </h3>

              {/* Stacked Animated Typography matching moncy.dev */}
              <div className="relative h-28 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={titleIdx}
                    initial={{ y: 35, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -35, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="space-y-0"
                  >
                    <h2 className="landing-info-h2 font-heading font-black text-4xl sm:text-5xl xl:text-6xl text-[#c481ff] uppercase tracking-tight leading-none drop-shadow-[0_0_25px_rgba(196,129,255,0.45)]">
                      {ROTATING_TITLES[titleIdx].top}
                    </h2>
                    <h2 className="landing-h2-info font-heading font-black text-4xl sm:text-5xl xl:text-6xl text-white uppercase tracking-tight leading-none mt-1">
                      {ROTATING_TITLES[titleIdx].bottom}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Audited Repositories Badge */}
            <div className="p-4 rounded-xl bg-[#090b14]/80 backdrop-blur-md border border-white/10 space-y-2 font-mono text-xs max-w-sm">
              <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <FolderGit2 size={13} className="text-cyan-400" />
                  Codebase Audit
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  100% VERIFIED
                </span>
              </div>
              <div className="space-y-1 text-zinc-400 text-[11px]">
                <div className="flex justify-between">
                  <span>Audited Repositories</span>
                  <strong className="text-white">14 Active</strong>
                </div>
                <div className="flex justify-between">
                  <span>Flagship Systems</span>
                  <strong className="text-cyan-400">6 Case Studies</strong>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Move mouse to turn head • Hover face to smile</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom telemetry footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-zinc-400 pt-4 border-t border-white/5 relative z-20"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Scroll to trigger workstation typing & architecture
        </span>
        <a
          href="#about"
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 group"
        >
          <span>Phase 01: Identity</span>
          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
