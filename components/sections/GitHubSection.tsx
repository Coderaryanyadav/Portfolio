"use client";

import { motion } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight, FolderGit2, Terminal } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

const AUDITED_REPOSITORIES = [
  { name: "FinAuditPro", lang: "Python", type: "Offline AI / FinTech", desc: "Standalone offline AI audit assistant tailored for CAs in India." },
  { name: "ApnaGate", lang: "Dart", type: "Mobile / Security", desc: "Smart society visitor management with OneSignal & Supabase." },
  { name: "Tankr", lang: "TypeScript", type: "Logistics / GIS", desc: "Urban water deficit logistics & emergency dispatch in Mumbai." },
  { name: "AegisAI", lang: "Python", type: "Offline RAG / Legal", desc: "Enterprise offline legal assistant with local document grounding." },
  { name: "OpsklTest", lang: "TypeScript", type: "Two-Sided Marketplace", desc: "Shift marketplace connecting event organizers with crew." },
  { name: "Ayurchain", lang: "Solidity / PHP", type: "Blockchain / Web3", desc: "Ayurvedic medicine storage & certificate hash verification." },
  { name: "SecureChat", lang: "Python", type: "Cybersecurity", desc: "End-to-end encrypted messaging with AES-GCM & WebSockets." },
  { name: "CsvToMcqApp", lang: "Dart", type: "EdTech Mobile/Web", desc: "Cross-platform MCQ certification exam simulator." },
];

export default function GitHubSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative bg-[#06070a]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>05 — Open Source & Codebase</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
              Verified Repositories.
            </h2>
            <p className="text-base text-zinc-400 font-sans max-w-xl">
              All projects are backed by publicly auditable source code, comprehensive commits, and reproducible local setups.
            </p>
          </div>

          <a
            href={PERSONAL.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-black font-heading font-bold text-xs tracking-wider uppercase hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all"
          >
            <Github size={16} />
            <span>Visit @{PERSONAL.handle}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUDITED_REPOSITORIES.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/Coderaryanyadav/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-[#090b12] border border-white/5 hover:border-cyan-500/40 flex flex-col justify-between group transition-all hover:shadow-[0_10px_30px_rgba(0,210,255,0.1)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-zinc-500 group-hover:text-cyan-400 transition-colors">
                  <FolderGit2 size={18} />
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                    {repo.name}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                    {repo.type}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-sans line-clamp-2">
                  {repo.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {repo.lang}
                </span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  View Source →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
