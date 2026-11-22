"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ShieldCheck, Cpu, Code2, AlertTriangle, Lightbulb, Layers, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { sounds } from "@/lib/sound";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setActiveStep(0);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0e16] border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,210,255,0.15)] flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07080f]">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.accentColor || "#00D2FF" }}
              />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                Technical Case Study / {project.category}
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content Scrollable Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
            {/* Header Title & Tagline */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-400">
                  {project.domain.toUpperCase()}
                </span>
                <span className="text-zinc-500 font-mono text-xs">Released {project.year}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-lg text-zinc-300 font-sans">
                {project.tagline}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors border border-white/10"
              >
                <Github size={15} />
                <span>View Audited Repository</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-black font-mono text-xs font-bold transition-all hover:bg-cyan-300"
                >
                  <ExternalLink size={15} />
                  <span>Open Verified Live App</span>
                </a>
              )}
            </div>

            {/* Overview & Problem Statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  <Cpu size={14} className="text-cyan-400" />
                  <span>01. Project Overview</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.caseStudy.overview}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span>02. The Problem Addressed</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.caseStudy.problem}
                </p>
              </div>
            </div>

            {/* Interactive Architecture Flow Visualizer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
                  <Layers size={14} />
                  <span>03. Architecture Topology & Execution Pipeline</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Step {activeStep + 1} of {project.caseStudy.architecture.length}
                </span>
              </div>

              {/* Step Flow Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {project.caseStudy.architecture.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sounds.playClick();
                      setActiveStep(idx);
                    }}
                    className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
                      activeStep === idx
                        ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                        : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="block text-[10px] text-zinc-500">STAGE 0{idx + 1}</span>
                    <span className="truncate block font-semibold">Node {idx + 1}</span>
                  </button>
                ))}
              </div>

              {/* Active Step Highlight Card */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-[#080910] border border-cyan-500/20 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shrink-0">
                  0{activeStep + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-sm text-white">
                    Architectural Layer 0{activeStep + 1}
                  </h4>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {project.caseStudy.architecture[activeStep]}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Verified Technology Stack */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest">
                <Code2 size={14} className="text-cyan-400" />
                <span>04. Verified Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Highlights & Security/Offline Aspects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  <Cpu size={14} className="text-cyan-400" />
                  <span>Key Engineering Features</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {project.caseStudy.technicalHighlights.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 text-xs mt-1">▸</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Security & Offline Controls</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {project.caseStudy.securityOrOfflineAspects.map((aspect, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 text-xs mt-1">▸</span>
                      <span>{aspect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Challenges, Decisions & Lessons */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                <Lightbulb size={14} className="text-amber-400" />
                <span>Challenges, Tradeoffs & Learnings</span>
              </div>

              <div className="space-y-3">
                {project.caseStudy.challengesAndDecisions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/[0.05] border border-cyan-500/20 text-sm text-zinc-200 space-y-2">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider block">
                  Core Engineering Takeaways
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {project.caseStudy.whatILearned.map((learned, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>{learned}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
