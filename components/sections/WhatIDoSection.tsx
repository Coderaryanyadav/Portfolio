"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, MapPin, ArrowRight } from "lucide-react";
import { sounds } from "@/lib/sound";

const DOMAINS = [
  {
    num: "01",
    title: "Full-Stack & Mobile Architecture",
    tagline: "Cross-platform mobile apps & reactive web systems",
    description:
      "Architecting modular, type-safe software across Flutter, React Native (Expo SDK 58), Next.js 15, and Supabase. Focused on sub-second realtime synchronization, optimistic local caching with Hive, and clean monorepos with Turborepo.",
    technologies: ["React / Next.js", "Flutter", "React Native", "TypeScript", "PostgreSQL"],
    icon: <Terminal size={20} className="text-cyan-400" />,
  },
  {
    num: "02",
    title: "Offline-First AI & Grounded RAG",
    tagline: "Air-gapped intelligence with 0% data leakage",
    description:
      "Engineering local AI workstations tailored for strictly regulated industries (Chartered Accountants & Law Firms). Integrating ChromaDB, local vector embeddings, and deterministic statutory rule engines that never hallucinate compliance numbers.",
    technologies: ["Python", "Local RAG", "ChromaDB", "Statutory Rule Engines", "OCR"],
    icon: <Cpu size={20} className="text-cyan-400" />,
  },
  {
    num: "03",
    title: "Cybersecurity & Web3 Verification",
    tagline: "End-to-end encryption & decentralized immutability",
    description:
      "Building resilient defensive security pipelines: client-side Web Crypto SHA-256 digital fingerprinting, AES-GCM and AES-256 ciphers, WebSocket encryption wrappers, PyOTP 2FA/RBAC, and Ethereum Solidity smart contract verification portals.",
    technologies: ["AES-GCM", "Solidity Smart Contracts", "Web Crypto API", "PyOTP 2FA"],
    icon: <Shield size={20} className="text-cyan-400" />,
  },
  {
    num: "04",
    title: "Spatial GIS & Emergency Dispatch",
    tagline: "High-density metropolitan logistics & telemetry",
    description:
      "Implementing mission-critical geographic routing and emergency fleet dispatch using PostGIS GiST spatial indexing, Kalman-filtered GPS coordinates, and polygon boundary geofences calibrated for high-density metropolitan areas like Mumbai.",
    technologies: ["PostGIS Spatial", "Supabase", "Mapbox", "Realtime Telemetry"],
    icon: <MapPin size={20} className="text-cyan-400" />,
  },
];

export default function WhatIDoSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section id="what-i-do" className="py-24 sm:py-36 px-6 sm:px-10 border-b border-white/5 relative overflow-hidden bg-[#050609]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Signature Moncy "WHAT I DO" Giant Editorial Title */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>01 — Core Engineering Disciplines</span>
            </div>

            <h2 className="text-5xl sm:text-7xl xl:text-8xl font-heading font-extrabold tracking-tighter text-white uppercase leading-[0.9]">
              W<span className="italic font-light text-zinc-400">HAT</span>
              <br />
              I<span className="text-cyan-400 text-glow"> DO</span>
              <span className="text-cyan-400 font-sans">.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-md pt-2">
              Combining systems architecture, offline machine intelligence, and defensive security to engineer reliable software for high-stakes environments.
            </p>

            <div className="hidden lg:block pt-6 border-t border-white/5 font-mono text-xs text-zinc-500">
              Hover over each discipline to inspect architecture highlights and applied technology stacks.
            </div>
          </div>

          {/* Right Column: Signature Moncy Dashed-Border Interactive Cards */}
          <div className="lg:col-span-7 space-y-4">
            {DOMAINS.map((domain, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={domain.num}
                  onMouseEnter={() => {
                    sounds.playHover();
                    setActiveIdx(idx);
                  }}
                  onClick={() => {
                    sounds.playClick();
                    setActiveIdx(idx);
                  }}
                  className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "bg-[#090b14] border-cyan-500/50 shadow-[0_0_40px_rgba(0,210,255,0.12)] scale-[1.01]"
                      : "bg-[#07080d]/60 border-white/10 hover:border-white/25 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Decorative dashed boundary line */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none border border-dashed border-white/[0.08]" />

                  <div className="relative z-10 space-y-4">
                    {/* Top Row: Number, Icon, Title */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl sm:text-2xl font-extrabold text-cyan-400">
                          {domain.num}
                        </span>
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                          {domain.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                        {domain.icon}
                      </div>
                    </div>

                    <p className="font-mono text-xs text-cyan-400/90">
                      {domain.tagline}
                    </p>

                    {/* Expandable description body */}
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {domain.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {domain.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 font-mono text-[11px] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
