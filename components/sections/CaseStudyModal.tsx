"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ShieldCheck, Cpu, Code2, AlertTriangle, Lightbulb, Layers } from "lucide-react";
import { Project } from "@/data/projects";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
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
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0f] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080a]">
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                Technical Case Study / {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
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
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-lime">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors border border-white/10"
              >
                <Github size={15} />
                <span>View Repository</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime text-black font-mono text-xs font-bold transition-all hover:bg-lime/90"
                >
                  <ExternalLink size={15} />
                  <span>Verified Live App</span>
                </a>
              )}
            </div>

            {/* Overview & Problem Statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  <Cpu size={14} className="text-lime" />
                  <span>01. Project Overview</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.caseStudy.overview}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <span>02. The Problem Addressed</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.caseStudy.problem}
                </p>
              </div>
            </div>

            {/* Engineering Approach & Architecture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest">
                <Layers size={14} />
                <span>03. Architecture & System Topology</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.caseStudy.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/40 border border-white/5 flex gap-3 text-sm text-zinc-300 font-sans"
                  >
                    <span className="font-mono text-xs text-lime font-bold shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Technology Stack */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest">
                <Code2 size={14} className="text-lime" />
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
                  <Cpu size={14} className="text-lime" />
                  <span>Key Engineering Features</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {project.caseStudy.technicalHighlights.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-lime text-xs mt-1">▸</span>
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

              <div className="p-4 rounded-xl bg-lime/[0.04] border border-lime/20 text-sm text-zinc-200 space-y-2">
                <span className="font-mono text-xs text-lime uppercase tracking-wider block">
                  Core Takeaways
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {project.caseStudy.whatILearned.map((learned, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-lime">✓</span>
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
