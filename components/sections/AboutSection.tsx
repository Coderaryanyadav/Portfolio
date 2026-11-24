"use client";

import { CheckCircle2, Download, Calendar, ArrowUpRight, Briefcase, GraduationCap, MapPin, Clock } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

export default function AboutSection() {
  return (
    <section id="about-archive" className="about-section min-h-screen flex items-center py-24 sm:py-32 px-6 sm:px-12 xl:px-20 border-b border-white/5 relative z-20 bg-[#06070d]">
      {/* Centered narrative & executive recruiter snapshot */}
      <div className="about-me w-full max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>02 — Identity &amp; Snapshot</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            &ldquo;Curiosity drives everything I build.&rdquo;
          </h2>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
          <p>
            I&apos;m <strong className="text-white font-medium">Aryan Yadav</strong>, an Information Technology student based in Mumbai building software across full-stack architecture, offline artificial intelligence, and defensive cybersecurity.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            I specialize in air-gapped systems—engineering local vector RAG pipelines with ChromaDB that execute 100% on consumer hardware without cloud data leakage, and statutory compliance rule engines that eliminate hallucination.
          </p>

          <div className="pt-1 flex flex-wrap gap-2.5 font-mono text-xs">
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

        {/* High-Impact Recruiter & Engineering Snapshot Card */}
        <div className="bg-[#090b14]/95 backdrop-blur-md border border-cyan-500/35 rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_0_40px_rgba(0,210,255,0.08)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs text-white font-bold tracking-wider uppercase">
              <Briefcase size={14} className="text-cyan-400" />
              <span>Recruiter &amp; Hiring Snapshot</span>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVELY INTERVIEWING</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider block flex items-center gap-1.5">
                <Briefcase size={11} className="text-cyan-400" /> Target Roles
              </span>
              <p className="text-zinc-200 font-sans font-medium">
                Software Engineering Intern / Full-Stack &amp; AI Systems
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider block flex items-center gap-1.5">
                <Clock size={11} className="text-cyan-400" /> Availability
              </span>
              <p className="text-zinc-200 font-sans font-medium">
                Summer 2026 / Immediate Co-op (Full-Time or Part-Time)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider block flex items-center gap-1.5">
                <GraduationCap size={11} className="text-cyan-400" /> Education
              </span>
              <p className="text-zinc-200 font-sans font-medium">
                Diploma in Information Technology • Bhagubhai Mafatlal Polytechnic (2024–2027)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider block flex items-center gap-1.5">
                <MapPin size={11} className="text-cyan-400" /> Location &amp; Work Mode
              </span>
              <p className="text-zinc-200 font-sans font-medium">
                Mumbai, India • Open to Remote &amp; Hybrid Relocation
              </p>
            </div>
          </div>

          {/* Direct Recruiter CTAs */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="/Resume.pdf"
                download="Aryan_Yadav_Resume.pdf"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)]"
              >
                <Download size={13} />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={PERSONAL.calUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <Calendar size={13} className="text-cyan-400" />
                <span>Book 15-Min Chat</span>
                <ArrowUpRight size={11} className="text-zinc-400" />
              </a>
            </div>

            <span className="font-mono text-[11px] text-zinc-500 hidden sm:inline">
              14 Verified Repos • 100% Code Integrity
            </span>
          </div>
        </div>

        {/* Engineering Highlights */}
        <div className="bg-[#090b14]/70 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4">
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
                <strong className="text-white font-medium">Offline Caching &amp; Sync:</strong> High-performance local persistence with Hive and SQLite for resilient mobile workflows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white font-medium">Defensive Security:</strong> Client-side SHA-256 integrity proofs and Ethereum Solidity smart contract verification.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
