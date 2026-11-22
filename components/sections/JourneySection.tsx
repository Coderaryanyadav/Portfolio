"use client";

import { motion } from "framer-motion";
import { Calendar, GitCommit, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { JOURNEY } from "@/data/journey";
import { sounds } from "@/lib/sound";

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 sm:py-36 px-6 sm:px-10 border-b border-white/5 relative bg-[#050608]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header styled after moncy.dev's Career.css */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>04 — Chronological Evolution</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-t from-cyan-400 to-white leading-tight">
            My engineering <span>&</span><br /> experience.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            From algorithmic foundations and operating system internals to air-gapped machine intelligence and high-concurrency systems.
          </p>
        </div>

        {/* Moncy.dev Split Career / Timeline Layout */}
        <div className="space-y-16 max-w-5xl mx-auto relative">
          {/* Vertical central timeline track on desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent -translate-x-1/2 pointer-events-none" />

          {JOURNEY.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Left Side: Role & Year */}
                <div
                  className={`md:col-span-5 ${
                    isEven ? "md:text-right" : "md:order-3 md:text-left"
                  } space-y-2`}
                >
                  <div className="flex items-center gap-2 md:inline-flex font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                    <span>{item.stage}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    {item.title}
                  </h3>
                  <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wide">
                    {item.subtitle}
                  </h4>
                </div>

                {/* Central Timeline Dot */}
                <div className="hidden md:flex md:col-span-2 justify-center items-center md:order-2">
                  <div className="w-5 h-5 rounded-full bg-[#050608] border-2 border-cyan-400 shadow-[0_0_20px_#00d2ff] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                </div>

                {/* Right Side: Detailed Card */}
                <div
                  className={`md:col-span-5 ${
                    isEven ? "md:order-3" : "md:order-1"
                  } p-6 sm:p-8 rounded-2xl bg-[#090b14] border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 shadow-xl`}
                >
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[11px] text-zinc-500 mr-1">Key Systems:</span>
                      {item.keyProjects.map((p) => (
                        <span
                          key={p}
                          className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
