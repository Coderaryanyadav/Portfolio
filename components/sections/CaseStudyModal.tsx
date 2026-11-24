"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ShieldCheck, Cpu, Code2, AlertTriangle, Lightbulb, Layers, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { sounds } from "@/lib/sound";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export default function CaseStudyModal({ project, onClose, onSelectProject }: CaseStudyModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  const currentIndex = project ? PROJECTS.findIndex((p) => p.id === project.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < PROJECTS.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev && onSelectProject) {
      sounds.playClick();
      onSelectProject(PROJECTS[currentIndex - 1]);
    }
  }, [hasPrev, onSelectProject, currentIndex]);

  const handleNext = useCallback(() => {
    if (hasNext && onSelectProject) {
      sounds.playClick();
      onSelectProject(PROJECTS[currentIndex + 1]);
    }
  }, [hasNext, onSelectProject, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
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
  }, [project, onClose, handlePrev, handleNext]);

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

        {/* Modal Window with data-lenis-prevent to isolate scrolling */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#090b14] border border-cyan-500/35 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(0,210,255,0.2)] flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#05060b]">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.accentColor || "#00D2FF" }}
              />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest hidden sm:inline">
                Technical Case Study / {project.category}
              </span>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest sm:hidden">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Prev / Next Case Study Navigator */}
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 bg-white/[0.04] border border-white/10 px-2 py-1 rounded-full">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className={`p-1 rounded-full transition-colors ${
                    hasPrev ? "hover:bg-white/10 text-white" : "opacity-30 cursor-not-allowed"
                  }`}
                  title="Previous project (←)"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="px-1 text-[11px] text-zinc-300">
                  {currentIndex + 1} / {PROJECTS.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className={`p-1 rounded-full transition-colors ${
                    hasNext ? "hover:bg-white/10 text-white" : "opacity-30 cursor-not-allowed"
                  }`}
                  title="Next project (→)"
                >
                  <ChevronRight size={14} />
                </button>
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
          </div>

          {/* Modal Content Scrollable Body */}
          <div data-lenis-prevent="true" className="p-6 sm:p-10 overflow-y-auto space-y-10">
            {/* Header Title & Tagline */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-400 font-bold">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-black font-mono text-xs font-bold transition-all hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                >
                  <ExternalLink size={15} />
                  <span>Open Verified Live App</span>
                </a>
              )}
            </div>

            {/* Visual Engineering Mockup & Telemetry Card */}
            <div className="rounded-2xl border border-cyan-500/25 bg-[#05060b] p-6 space-y-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400" />
                  <span className="text-zinc-300 font-bold uppercase tracking-wider">{project.title} Telemetry Log</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                  VERIFIED LOCAL EXECUTION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-zinc-400 pt-1">
                <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block">Execution Mode</span>
                  <span className="text-white font-semibold">100% Offline / Zero Cloud Leak</span>
                </div>
                <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block">State Integrity</span>
                  <span className="text-white font-semibold">Atomic Local Persistence</span>
                </div>
                <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block">Target Environment</span>
                  <span className="text-white font-semibold">Production Desktop & Mobile</span>
                </div>
              </div>
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

            {/* Interactive Architecture Topology & Flowchart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
                  <Layers size={14} />
                  <span>03. Architecture Topology &amp; Execution Pipeline</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Interactive Node Graph
                </span>
              </div>

              {/* Visual Connected Architecture Flowchart Pipeline */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#06070e] border border-cyan-500/30 space-y-5">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 overflow-x-auto pb-2">
                  {project.caseStudy.architecture.map((item, idx) => {
                    const colonIndex = item.indexOf(":");
                    const nodeLabel = colonIndex !== -1 ? item.substring(0, colonIndex).trim() : `Stage 0${idx + 1}`;
                    const isCurrent = activeStep === idx;
                    return (
                      <div key={idx} className="flex-1 flex items-center gap-2">
                        <button
                          onClick={() => {
                            sounds.playClick();
                            setActiveStep(idx);
                          }}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all relative ${
                            isCurrent
                              ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                              : "bg-white/[0.02] border-white/10 hover:border-white/20 text-zinc-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[10px] text-zinc-500">
                              NODE 0{idx + 1}
                            </span>
                            <span className={`w-2 h-2 rounded-full ${isCurrent ? "bg-cyan-400 animate-pulse" : "bg-zinc-700"}`} />
                          </div>
                          <span className={`block font-heading font-bold text-xs ${isCurrent ? "text-cyan-300" : "text-zinc-200"}`}>
                            {nodeLabel}
                          </span>
                        </button>

                        {idx < project.caseStudy.architecture.length - 1 && (
                          <div className="hidden md:flex items-center text-zinc-600 font-mono text-xs px-1">
                            →
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Active Architecture Step Deep Dive */}
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl bg-black/60 border border-white/10 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-sm text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                    0{activeStep + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <span>Node Topology Specification</span>
                      <span className="text-zinc-500 text-xs font-mono font-normal">• Verified In Production</span>
                    </h4>
                    <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                      {project.caseStudy.architecture[activeStep] || project.caseStudy.architecture[0]}
                    </p>
                  </div>
                </motion.div>
              </div>
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
