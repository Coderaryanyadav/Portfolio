"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, BookOpen, Search, X, Sparkles } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { sounds } from "@/lib/sound";

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void;
}

export default function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      const matchesCategory =
        activeFilter === "featured"
          ? project.featured
          : activeFilter === "all"
          ? true
          : project.domain === activeFilter;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>02 — Featured Works & Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
              "Things I've built."
            </h2>
            <p className="text-base text-zinc-400 font-sans max-w-xl">
              Experiments, ideas and engineering projects turned into working software. Resilient, offline-first, and architected for real-world utility.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="font-mono text-xs text-zinc-400 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full self-start md:self-auto">
            <span>Displaying </span>
            <strong className="text-cyan-400">{filteredProjects.length}</strong>
            <span> of </span>
            <strong className="text-white">{PROJECTS.length}</strong>
            <span> audited projects</span>
          </div>
        </div>

        {/* Live Search & Filter Bar with Complete Domain Set */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090b12] border border-white/10">
          {/* Domain Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: "featured", label: "Featured (6)" },
              { id: "all", label: "All Repos (12)" },
              { id: "ai", label: "AI & RAG" },
              { id: "mobile", label: "Mobile" },
              { id: "systems", label: "Logistics & GIS" },
              { id: "security", label: "Security" },
              { id: "fullstack", label: "Full-Stack" },
              { id: "blockchain", label: "Web3" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveFilter(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === tab.id
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500 font-bold shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                    : "bg-white/[0.02] border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full lg:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech, title, or domain..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/60 transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group relative bg-[#090b12] border border-white/10 hover:border-cyan-500/40 rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]"
              >
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: project.accentColor || "#00D2FF" }}
                      />
                      <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-600">
                      0{idx + 1} / 0{filteredProjects.length}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-400">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/5 font-mono text-[11px] text-zinc-300 group-hover:border-cyan-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenProject(project);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 hover:bg-cyan-400 hover:text-black text-cyan-400 font-mono text-xs font-semibold border border-cyan-500/30 transition-all group/btn shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                  >
                    <BookOpen size={14} />
                    <span>View Architecture & Case Study</span>
                    <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors border border-white/5"
                      aria-label={`GitHub repository for ${project.title}`}
                      title="View GitHub Repository"
                    >
                      <Github size={16} />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sounds.playClick()}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-black text-zinc-400 transition-colors border border-white/5"
                        aria-label={`Live demo for ${project.title}`}
                        title="Open Verified Live App"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 14 Repositories Verification Banner */}
        <div className="p-8 rounded-3xl bg-[#080910] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading font-bold text-lg text-white">
              All 14 open-source repositories audited & verifiable
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              Inspect test pipelines, schema migrations, and commit signatures.
            </p>
          </div>
          <a
            href="https://github.com/Coderaryanyadav"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-white font-mono text-xs transition-all shrink-0"
          >
            <Github size={15} className="text-cyan-400" />
            <span>github.com/Coderaryanyadav</span>
            <ArrowUpRight size={14} className="text-zinc-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
