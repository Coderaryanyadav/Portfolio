"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import { PERSONAL } from "@/data/personal";

const pillarIcons = [
  <Terminal key="terminal" className="text-lime" size={24} />,
  <Shield key="shield" className="text-lime" size={24} />,
  <Cpu key="cpu" className="text-lime" size={24} />,
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span>01 — Identity & Focus</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white max-w-4xl">
            "Curiosity drives everything I build."
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-zinc-300 font-sans text-lg leading-relaxed">
            <p>
              I'm <strong className="text-white font-medium">Aryan Yadav</strong>, an engineering
              student interested in software development, cybersecurity, artificial intelligence and
              the systems behind modern technology.
            </p>
            <p className="text-zinc-400">
              I enjoy understanding how things work internally, experimenting with new technologies,
              solving engineering problems and building applications that address practical challenges.
            </p>
            <p className="text-zinc-400">
              My projects span financial auditing, AI-powered applications, blockchain verification,
              mobile applications, real-time systems and secure communication.
            </p>

            <div className="pt-4 flex flex-wrap gap-3 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                Offline-First RAG
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                Spatial GIS Routing
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                Symmetric Ciphers (AES)
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                Cross-Platform Flutter & React Native
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0e0e12] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                Engineering Blueprint
              </span>
              <span className="font-mono text-xs text-lime">Active Focus</span>
            </div>

            <ul className="space-y-4 font-sans text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-lime shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-medium">Zero-Leakage Local AI:</strong> Delivering intelligence on consumer hardware without sending private data to cloud endpoints.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-lime shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-medium">Resilient Mobile Architecture:</strong> Building offline-capable apps with local caching (Hive/SQLite) and optimistic sync.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-lime shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-medium">Provable Integrity:</strong> Using client-side SHA-256 signatures and smart contracts to protect certificates against fraud.
                </span>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Location: Mumbai, IN</span>
              <span className="text-lime">100% Code Verified</span>
            </div>
          </div>
        </div>

        {/* The 3 Core Identity Blocks: 01 BUILD, 02 EXPLORE, 03 SOLVE */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              Core Engineering Pillars
            </h3>
            <span className="font-mono text-xs text-zinc-500">Methodology & Practice</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERSONAL.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.number}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-[#0d0d10] hover:bg-[#121216] border border-white/5 hover:border-lime/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-extrabold text-zinc-600 group-hover:text-lime transition-colors">
                      {pillar.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-lime/30 flex items-center justify-center transition-colors">
                      {pillarIcons[idx]}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-2xl text-white tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="font-mono text-xs text-lime">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
