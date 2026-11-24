"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  BookOpen,
  Search,
  X,
  AlertCircle,
  FolderGit2,
  ShieldCheck,
  Activity,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void;
}

export default function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

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
        project.tagline.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const featuredCount = useMemo(() => PROJECTS.filter((p) => p.featured).length, []);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative z-20 bg-[#06070d]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>03 — Verified Repositories &amp; Engineering Case Studies</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
              &ldquo;Things I&apos;ve built.&rdquo;
            </h2>
            <p className="text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
              All 14 production systems and open-source codebases backed by publicly auditable repositories, comprehensive commits, and reproducible architectures. Click any card to inspect its deep-dive case study.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Quick Counter */}
            <div className="font-mono text-xs text-zinc-400 bg-white/[0.03] border border-white/10 px-4 py-2.5 rounded-full">
              <span>Displaying </span>
              <strong className="text-cyan-400">{filteredProjects.length}</strong>
              <span> of </span>
              <strong className="text-white">{PROJECTS.length}</strong>
              <span> audited repos</span>
            </div>

            <a
              href={PERSONAL.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-black font-heading font-bold text-xs tracking-wider uppercase hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all"
            >
              <Github size={14} />
              <span>Visit GitHub</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Engineering Velocity & Integrity HUD */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-cyan-500/25 space-y-1">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <FolderGit2 size={12} className="text-cyan-400" />
              <span>Audited Codebases</span>
            </span>
            <div className="text-2xl font-heading font-extrabold text-white">14 Repos</div>
            <p className="font-mono text-[11px] text-cyan-400/80">100% Publicly Auditable</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-cyan-400" />
              <span>Confidential AI</span>
            </span>
            <div className="text-2xl font-heading font-extrabold text-white">0KB Egress</div>
            <p className="font-mono text-[11px] text-zinc-400">Zero Cloud Data Leakage</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={12} className="text-cyan-400" />
              <span>Spatial PostGIS</span>
            </span>
            <div className="text-2xl font-heading font-extrabold text-white">&lt;45ms Radius</div>
            <p className="font-mono text-[11px] text-zinc-400">GiST Bounding Spatial Index</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <GitBranch size={12} className="text-cyan-400" />
              <span>Mobile State Sync</span>
            </span>
            <div className="text-2xl font-heading font-extrabold text-white">Sub-Second</div>
            <p className="font-mono text-[11px] text-zinc-400">Hive Local Cache &amp; OneSignal</p>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090b12] border border-white/10">
          {/* Domain Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: "featured", label: `Featured (${featuredCount})` },
              { id: "all", label: `All Repos (${PROJECTS.length})` },
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

        {/* High-Density Compact Project Cards Grid (Fits 4 per row on Desktop) */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#090b12] border border-white/10 space-y-4">
            <AlertCircle size={32} className="mx-auto text-zinc-500" />
            <h3 className="font-heading font-bold text-lg text-white">No repositories found</h3>
            <p className="text-xs font-mono text-zinc-400">
              No repositories match your current filter or search query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono border border-cyan-500/30 transition-all"
            >
              Reset Filters &amp; Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    onMouseMove={handleCardMouseMove}
                    onClick={() => {
                      sounds.playClick();
                      onOpenProject(project);
                    }}
                    className="group relative bg-[#090b14]/90 hover:bg-[#0c0e1a] border border-white/10 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_35px_-10px_rgba(0,210,255,0.2)] hover:-translate-y-1 cursor-pointer overflow-hidden"
                  >
                    {/* Cursor-Following Radial Spotlight Glow */}
                    <div
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(320px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 210, 255, 0.12), transparent 80%)",
                      }}
                    />

                    <div className="space-y-3.5 relative z-10">
                      {/* Top Header: Category Tag & External Links */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: project.accentColor || "#00D2FF" }}
                          />
                          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider truncate max-w-[150px]">
                            {project.category}
                          </span>
                        </div>

                        {/* Quick GitHub and Live Action Icons */}
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sounds.playClick()}
                            className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            aria-label={`GitHub repo for ${project.title}`}
                            title="GitHub Repository"
                          >
                            <Github size={13} />
                          </a>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => sounds.playClick()}
                              className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-cyan-400 hover:text-black text-cyan-400 transition-colors"
                              aria-label={`Live demo for ${project.title}`}
                              title="Live Demo"
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Title & Tagline */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg font-heading font-extrabold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="inline-flex items-center gap-1 font-mono text-[9px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30 shrink-0">
                              <Sparkles size={9} />
                              <span>FEATURED</span>
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[11px] text-zinc-400 line-clamp-1">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Short Description (2 Lines) */}
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack Pills (Compact) */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 font-mono text-[10px] text-zinc-300 group-hover:border-cyan-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-white/[0.02] font-mono text-[10px] text-zinc-500">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact Card Footer */}
                    <div className="pt-3.5 mt-3.5 border-t border-white/5 flex items-center justify-between relative z-10">
                      <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                        <FolderGit2 size={11} className="text-zinc-500" />
                        <span>{project.year}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 group-hover:bg-cyan-400 group-hover:text-black text-cyan-400 font-mono text-[11px] font-semibold transition-all border border-cyan-500/30 shadow-[0_0_10px_rgba(0,210,255,0.1)]">
                        <BookOpen size={11} />
                        <span>Case Study</span>
                        <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* 14 Repositories Verification Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#080910] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-white">
              All 14 open-source repositories audited &amp; verifiable
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              Inspect test pipelines, schema migrations, and commit signatures on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/Coderaryanyadav"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-white font-mono text-xs transition-all shrink-0"
          >
            <Github size={14} className="text-cyan-400" />
            <span>github.com/Coderaryanyadav</span>
            <ArrowUpRight size={13} className="text-zinc-500" />
          </a>
        </div>
      </div>
    </section>
  );
}
