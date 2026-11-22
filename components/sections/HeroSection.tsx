"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Terminal, Shield, Cpu, Sparkles } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import MagneticButton from "../ui/MagneticButton";

export default function HeroSection() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % PERSONAL.rotatingTitles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setCoords({
      x: ((clientX / innerWidth) - 0.5) * 20,
      y: ((clientY / innerHeight) - 0.5) * 20,
    });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 overflow-hidden cyber-grid border-b border-white/5"
    >
      {/* Ambient background blue glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[150px] pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${coords.x * 2}px), calc(-50% + ${coords.y * 2}px))`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Top telemetry status bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400 py-2 border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
          <span className="text-zinc-300 font-medium tracking-wide">
            {PERSONAL.statusText}
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-zinc-400">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Cpu size={12} className="text-lime" /> Offline AI & RAG
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <Shield size={12} className="text-lime" /> Cybersecurity
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal size={12} className="text-lime" /> Full-Stack
          </span>
        </div>
      </motion.div>

      {/* Hero Typography & Core Content */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 sm:py-16">
        <div className="space-y-6">
          {/* Rotating Identity pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono"
          >
            <Sparkles size={13} className="text-lime" />
            <span className="text-zinc-400">Specializing in:</span>
            <div className="h-5 overflow-hidden relative w-48 text-lime font-bold">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute left-0 top-0 truncate"
                >
                  {PERSONAL.rotatingTitles[currentTitleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Oversized Name Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-0"
          >
            <h1 className="font-heading font-extrabold tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.88] text-white uppercase select-none">
              ARYAN
              <br />
              <span className="text-gradient">YADAV</span>
              <span className="text-lime text-glow font-sans">.</span>
            </h1>
          </motion.div>

          {/* Core Headline & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-end"
          >
            <div className="md:col-span-7">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-zinc-100 leading-snug">
                "{PERSONAL.roleHeadline}"
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
                {PERSONAL.shortBio}
              </p>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 pt-6"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lime text-black font-heading font-bold text-sm tracking-wide transition-all hover:shadow-[0_0_35px_rgba(198,255,77,0.4)] hover:scale-105 active:scale-95"
              >
                <span>Explore My Work</span>
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-heading font-medium text-sm tracking-wide hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Let's Connect</span>
                <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </MagneticButton>

            <div className="hidden lg:flex items-center gap-4 ml-auto font-mono text-xs text-zinc-400 border border-white/5 px-4 py-2 rounded-full bg-black/40">
              <span className="text-lime">●</span>
              <span>14 Repositories Audited</span>
              <span className="text-zinc-600">/</span>
              <span>6 Featured Systems</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-zinc-400 pt-6 border-t border-white/5"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          Scroll to explore architecture
        </span>
        <a
          href="#about"
          className="hover:text-lime transition-colors flex items-center gap-1 group"
        >
          <span>Phase 01: Identity</span>
          <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
