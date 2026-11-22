"use client";

import { motion } from "framer-motion";
import { Calendar, GitCommit, CheckCircle2, ChevronRight } from "lucide-react";
import { JOURNEY } from "@/data/journey";

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span>04 — Chronology</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
            "Still learning. Always building."
          </h2>
          <p className="text-base text-zinc-400 font-sans max-w-xl">
            A chronological timeline of engineering progression: from computer science fundamentals to offline AI and mission-critical logistics.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
          {JOURNEY.map((item, idx) => (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-zinc-600 group-hover:border-lime group-hover:bg-lime transition-all duration-300" />

              <div className="bg-[#0c0c0f] border border-white/5 hover:border-white/15 rounded-2xl p-6 sm:p-8 space-y-4 transition-all">
                {/* Stage & Year Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-lime font-bold">
                      {item.stage}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs">/</span>
                    <span className="font-heading font-bold text-lg text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    <Calendar size={12} className="text-zinc-500" />
                    <span>{item.year}</span>
                  </span>
                </div>

                {/* Subtitle & Narrative */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-zinc-300 uppercase tracking-wide">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Key Projects & Tags */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500">Key Projects:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keyProjects.map((p) => (
                        <span
                          key={p}
                          className="font-mono text-xs px-2.5 py-0.5 rounded bg-lime/10 text-lime border border-lime/20"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
