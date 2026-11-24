"use client";

import { Download, Calendar, Terminal, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

interface MobileQuickDockProps {
  onOpenTerminal?: () => void;
}

export default function MobileQuickDock({ onOpenTerminal }: MobileQuickDockProps) {
  return (
    <nav
      aria-label="Mobile quick actions"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}
      className="md:hidden fixed inset-x-4 z-40 flex items-center justify-between p-1.5 rounded-full bg-[#080912]/92 backdrop-blur-xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
    >
      {/* 1. Direct PDF Resume Download */}
      <a
        href="/resume.pdf"
        download="Aryan_Yadav_Resume.pdf"
        onClick={() => sounds.playClick()}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-cyan-400 text-black font-heading font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-transform active:scale-95"
      >
        <Download size={13} />
        <span>Resume</span>
      </a>

      {/* 2. 1-Click 15-Minute Intro Call (Cal.com) */}
      <a
        href={PERSONAL.calUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => sounds.playClick()}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:text-white transition-colors"
      >
        <Calendar size={13} className="text-cyan-400" />
        <span>Chat</span>
        <ArrowUpRight size={11} className="text-zinc-500" />
      </a>

      {/* 3. Terminal (⌘K) */}
      <button
        onClick={() => {
          sounds.playClick();
          onOpenTerminal?.();
        }}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-zinc-300 font-mono text-xs uppercase tracking-wider hover:text-white transition-colors"
      >
        <Terminal size={13} className="text-cyan-400" />
        <span>⌘K</span>
      </button>
    </nav>
  );
}
