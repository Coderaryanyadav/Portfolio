"use client";

import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, CheckCircle2 } from "lucide-react";
import { PERSONAL } from "@/data/personal";

const pillarIcons = [
  <Terminal key="terminal" className="text-cyan-400" size={24} />,
  <Shield key="shield" className="text-cyan-400" size={24} />,
  <Cpu key="cpu" className="text-cyan-400" size={24} />,
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section min-h-screen flex items-center py-24 sm:py-32 px-6 sm:px-12 xl:px-20 border-b border-white/5 relative z-10">
      {/* On desktop (lg:), this takes the right 50% of the screen while the 3D character is on the left */}
      <div className="about-me w-full lg:w-1/2 lg:ml-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>01 — Identity & Focus</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            "Curiosity drives everything I build."
          </h2>
        </div>

        {/* Narrative */}
        <div className="space-y-5 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
          <p>
            I'm <strong className="text-white font-medium">Aryan Yadav</strong>, an engineering student based in Mumbai building software across full-stack architecture, offline artificial intelligence, and defensive cybersecurity.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            I specialize in air-gapped systems—engineering local vector RAG pipelines with ChromaDB that execute 100% on consumer hardware without cloud data leakage, and statutory compliance rule engines that eliminate hallucination.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            My projects span financial auditing desktops, spatial GIS emergency fleet dispatch with PostGIS, cross-platform mobile apps with Flutter and React Native, and Web3 cryptographic verification portals.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
              Offline-First RAG
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              Spatial GIS PostGIS
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              Symmetric Ciphers (AES)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
              Flutter & React Native
            </span>
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="bg-[#090b14]/90 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              Engineering Blueprint
            </span>
            <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              100% VERIFIED
            </span>
          </div>

          <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Zero-Leakage Local AI:</strong> Delivering intelligence on local machines with ChromaDB without sending sensitive enterprise data to external APIs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Offline Caching & Sync:</strong> High-performance local persistence with Hive and SQLite for resilient mobile workflows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Defensive Security:</strong> Client-side SHA-256 integrity proofs and Ethereum Solidity smart contract verification.
              </span>
            </li>
          </ul>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Location: Mumbai, IN (UTC+5:30)</span>
            <span className="text-cyan-400 font-bold">14 Active Repos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
