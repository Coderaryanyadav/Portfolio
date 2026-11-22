"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Shield, Database, Cpu, Wrench, Sparkles, Check } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  "PROGRAMMING LANGUAGES": <Terminal size={16} className="text-lime" />,
  "FRONTEND & MOBILE": <Code2 size={16} className="text-lime" />,
  "BACKEND & DATABASES": <Database size={16} className="text-lime" />,
  "AI & OFFLINE SYSTEMS": <Cpu size={16} className="text-lime" />,
  "SECURITY & WEB3": <Shield size={16} className="text-lime" />,
  "TOOLS & DEPLOYMENT": <Wrench size={16} className="text-lime" />,
};

export default function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];
  const [inspectedSkill, setInspectedSkill] = useState(activeCategory.skills[0]);

  const handleCategoryChange = (idx: number) => {
    setActiveCategoryIndex(idx);
    setInspectedSkill(SKILL_CATEGORIES[idx].skills[0]);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative bg-[#070709]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span>03 — Technical Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
            "My engineering toolkit."
          </h2>
          <p className="text-base text-zinc-400 font-sans max-w-xl">
            Verified technologies applied across real repositories. No artificial percentage meters or speculative claims—strictly tools deployed in production code.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => handleCategoryChange(idx)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                activeCategoryIndex === idx
                  ? "bg-white/10 text-white border border-lime/40 shadow-[0_0_20px_rgba(198,255,77,0.15)]"
                  : "bg-white/[0.02] text-zinc-400 border border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              {categoryIcons[cat.title]}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Constellation & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skill Chips */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-white">
                {activeCategory.title}
              </h3>
              <p className="font-sans text-xs text-zinc-400">
                {activeCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeCategory.skills.map((skill) => {
                const isSelected = inspectedSkill?.name === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    onClick={() => setInspectedSkill(skill)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-[#141418] border-lime/60 shadow-[0_0_25px_rgba(198,255,77,0.1)]"
                        : "bg-[#0b0b0e] border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-heading font-semibold text-sm text-white">
                        {skill.name}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                          skill.level === "Core"
                            ? "bg-lime/10 text-lime border border-lime/30"
                            : "bg-white/5 text-zinc-400 border border-white/10"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 line-clamp-1">
                      {skill.note}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Telemetry Inspector Card */}
          <div className="lg:col-span-5 bg-[#0e0e13] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={13} className="text-lime" />
                Technical Telemetry
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-lime/10 text-lime border border-lime/20">
                Verified
              </span>
            </div>

            {inspectedSkill ? (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                    Technology
                  </span>
                  <h4 className="font-heading font-extrabold text-3xl text-white">
                    {inspectedSkill.name}
                  </h4>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">
                    Engineering Context
                  </span>
                  <p className="text-sm text-zinc-200 font-sans">
                    {inspectedSkill.note}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                    Implemented In Verified Projects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {inspectedSkill.usedIn.map((proj) => (
                      <span
                        key={proj}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-zinc-200"
                      >
                        <Check size={12} className="text-lime" />
                        <span>{proj}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-xs font-mono text-zinc-500">
                  Click any skill on the left to inspect its implementation context across Aryan's repositories.
                </div>
              </div>
            ) : (
              <div className="text-sm text-zinc-500 font-mono">
                Select a skill to inspect its repository implementation.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
