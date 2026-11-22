"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Shield, Cpu, Sparkles, FolderGit2 } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import MagneticButton from "../ui/MagneticButton";
import CharacterScene from "../character/CharacterScene";

export default function HeroSection() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % PERSONAL.rotatingTitles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 overflow-hidden cyber-grid border-b border-white/5"
    >
      {/* Top telemetry status bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400 py-2 border-b border-white/5 relative z-20"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-zinc-300 font-medium tracking-wide">
            {PERSONAL.statusText}
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-zinc-400">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Cpu size={12} className="text-cyan-400" /> Offline AI & RAG
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Shield size={12} className="text-cyan-400" /> Cybersecurity
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal size={12} className="text-cyan-400" /> Full-Stack
          </span>
        </div>
      </motion.div>

      {/* Hero Core Arena: Left Typography + Center 3D Moncy Face + Right Metadata */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 sm:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Name, Tagline & Direct CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Hello! I'm</span>
            </div>

            <div className="space-y-0">
              <h1 className="font-heading font-extrabold tracking-tighter text-6xl sm:text-7xl md:text-8xl leading-[0.88] text-white uppercase select-none">
                ARYAN
                <br />
                <span className="text-gradient">YADAV</span>
                <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,210,255,0.8)] font-sans">.</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl font-heading font-medium text-zinc-200 leading-snug">
              "{PERSONAL.roleHeadline}"
            </p>

            <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-md">
              {PERSONAL.shortBio}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton>
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all hover:shadow-[0_0_35px_rgba(0,210,255,0.45)] hover:scale-105 active:scale-95"
                >
                  <span>Explore My Work</span>
                  <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-heading font-medium text-xs uppercase tracking-wider hover:bg-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Let's Connect</span>
                  <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Center Column: The 3D Interactive Face / Character Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 h-[400px] sm:h-[480px] lg:h-[520px] w-full flex items-center justify-center relative"
          >
            <CharacterScene className="w-full h-full" />
          </motion.div>

          {/* Right Column: Rotating Specialty, Repository Counter & Key Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3 space-y-6 lg:pl-4"
          >
            {/* Rotating Specialty Pill */}
            <div className="p-5 rounded-2xl bg-[#090b14] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs">
                <Sparkles size={13} className="text-cyan-400" />
                <span>Specializing in:</span>
              </div>
              <div className="h-6 overflow-hidden relative text-cyan-400 font-heading font-bold text-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTitleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute left-0 top-0 truncate"
                  >
                    {PERSONAL.rotatingTitles[currentTitleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Audited Repositories Badge */}
            <div className="p-5 rounded-2xl bg-[#090b14] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <FolderGit2 size={13} className="text-cyan-400" />
                  Codebase Audit
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  VERIFIED
                </span>
              </div>
              <div className="space-y-1.5 text-zinc-400 text-[11px]">
                <div className="flex justify-between">
                  <span>Audited Repositories</span>
                  <strong className="text-white">14 Active</strong>
                </div>
                <div className="flex justify-between">
                  <span>Flagship Systems</span>
                  <strong className="text-cyan-400">6 Case Studies</strong>
                </div>
                <div className="flex justify-between">
                  <span>Execution Mode</span>
                  <strong className="text-zinc-300">Offline & Air-Gapped</strong>
                </div>
              </div>
            </div>

            {/* Interactive Hint */}
            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Move mouse to turn head • Hover face</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-zinc-400 pt-4 border-t border-white/5 relative z-20"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          Scroll to explore architecture & systems
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
