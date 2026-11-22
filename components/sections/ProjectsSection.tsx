"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Code2, Layers, BookOpen } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import CaseStudyModal from "./CaseStudyModal";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("featured");
  const [showAllRepos, setShowAllRepos] = useState(false);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const filteredProjects =
    activeFilter === "featured"
      ? featuredProjects
      : activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.domain === activeFilter);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-lime" />
              <span>02 — Featured Works</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
              "Things I've built."
            </h2>
            <p className="text-base text-zinc-400 font-sans max-w-xl">
              Experiments, ideas and engineering projects turned into working software. Resilient, offline-first, and architected for real-world utility.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: "featured", label: "Featured (6)" },
              { id: "ai", label: "AI & RAG" },
              { id: "mobile", label: "Mobile" },
              { id: "systems", label: "Logistics & GIS" },
              { id: "blockchain", label: "Web3" },
              { id: "all", label: "All Repos (12)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeFilter === tab.id
                    ? "bg-lime text-black border-lime font-bold shadow-[0_0_20px_rgba(198,255,77,0.3)]"
                    : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Featured Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-[#0c0c0f] border border-white/10 hover:border-white/25 rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
            >
              {/* Top Accent line & Number */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-600">
                    0{idx + 1} / 0{filteredProjects.length}
                  </span>
                </div>

                {/* Project Title & Tagline */}
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight group-hover:text-lime transition-colors">
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

                {/* Technical Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/5 font-mono text-[11px] text-zinc-300 group-hover:border-white/15 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Case Study + GitHub */}
              <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-lime hover:text-black text-white font-mono text-xs font-medium transition-all group/btn"
                >
                  <BookOpen size={14} />
                  <span>View Case Study</span>
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
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
                      className="p-2.5 rounded-full bg-white/5 hover:bg-lime hover:text-black text-zinc-400 transition-colors"
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
        </div>

        {/* Verified GitHub Repositories Banner */}
        <div className="p-8 rounded-3xl bg-[#09090c] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading font-bold text-lg text-white">
              Looking for all 14 open-source repositories?
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              Inspect full commit histories, automated Playwright tests, and system architecture docs.
            </p>
          </div>
          <a
            href="https://github.com/Coderaryanyadav"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs hover:border-lime/40 transition-all shrink-0"
          >
            <Github size={15} className="text-lime" />
            <span>github.com/Coderaryanyadav</span>
            <ArrowUpRight size={14} className="text-zinc-500" />
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
