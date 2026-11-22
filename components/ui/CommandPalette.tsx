"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, CornerDownLeft, Sparkles, FolderGit2, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { PROJECTS, Project } from "@/data/projects";
import { sounds } from "@/lib/sound";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onOpenResume?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
}: CommandPaletteProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: "system.init",
      output: (
        <div className="text-zinc-400 space-y-1.5">
          <p className="text-cyan-400 font-bold">Aryan Yadav — Interactive Developer Terminal [v2.4.0]</p>
          <p>
            Type <span className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">help</span> or click quick command chips below.
          </p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const executeCommand = (cmdStr: string) => {
    const clean = cmdStr.trim().toLowerCase();
    sounds.playClick();
    if (!clean) return;

    if (clean === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let resultNode: React.ReactNode = null;

    if (clean === "help") {
      resultNode = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 font-mono">
          <div><button onClick={() => executeCommand("projects")} className="text-cyan-400 font-bold hover:underline">projects</button> : List all 14 audited repositories</div>
          <div><button onClick={() => executeCommand("skills")} className="text-cyan-400 font-bold hover:underline">skills</button> : Inspect technical ecosystem</div>
          <div><button onClick={() => executeCommand("whoami")} className="text-cyan-400 font-bold hover:underline">whoami</button> : Display Aryan's bio</div>
          <div><button onClick={() => executeCommand("resume")} className="text-cyan-400 font-bold hover:underline">resume / cv</button> : View Curriculum Vitae</div>
          <div><button onClick={() => executeCommand("contact")} className="text-cyan-400 font-bold hover:underline">contact</button> : Direct communication channels</div>
          <div><button onClick={() => executeCommand("github")} className="text-cyan-400 font-bold hover:underline">github</button> : Open GitHub profile</div>
          <div><span className="text-cyan-400 font-bold">open &lt;name&gt;</span> : Launch project case study</div>
          <div><button onClick={() => executeCommand("clear")} className="text-cyan-400 font-bold hover:underline">clear</button> : Wipe terminal buffer</div>
        </div>
      );
    } else if (clean === "whoami") {
      resultNode = (
        <div className="space-y-1 text-xs text-zinc-300">
          <p><strong className="text-cyan-400">Aryan Yadav</strong> — Software Engineer based in Mumbai, India</p>
          <p className="text-zinc-400">{PERSONAL.aboutDetailed}</p>
        </div>
      );
    } else if (clean === "resume" || clean === "cv") {
      onOpenResume?.();
      onClose();
      resultNode = <span className="text-cyan-400">Opening Curriculum Vitae...</span>;
    } else if (clean === "projects" || clean === "ls") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono">
          <p className="text-zinc-500">All 14 Audited Projects (Click to inspect full architecture):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProject(p);
                  onClose();
                }}
                className="text-left p-2.5 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-white/5 transition-all flex items-center justify-between group"
              >
                <span className="text-zinc-200 group-hover:text-cyan-400 font-bold">{p.title}</span>
                <span className="text-[10px] text-zinc-500">{p.domain}</span>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (clean.startsWith("open ") || clean.startsWith("cat ")) {
      const targetName = clean.replace(/^(open|cat)\s+/, "").trim();
      const match = PROJECTS.find(
        (p) =>
          p.id.toLowerCase() === targetName ||
          p.title.toLowerCase() === targetName ||
          p.title.toLowerCase().startsWith(targetName)
      );
      if (match) {
        onSelectProject(match);
        onClose();
        resultNode = <span className="text-emerald-400">Opening case study for {match.title}...</span>;
      } else {
        resultNode = <span className="text-rose-400">Error: Project '{targetName}' not found. Type 'projects' to view valid list.</span>;
      }
    } else if (clean === "skills") {
      resultNode = (
        <div className="text-xs text-zinc-300 font-mono space-y-1.5">
          <p><strong className="text-cyan-400">Core Languages:</strong> Python, TypeScript, Dart, JavaScript (ES6+), PHP, SQL</p>
          <p><strong className="text-cyan-400">Mobile & Web:</strong> React, Next.js 15, Flutter, React Native (Expo SDK 58), Tailwind CSS</p>
          <p><strong className="text-cyan-400">AI & Security:</strong> Offline RAG, ChromaDB, PostGIS Spatial GIS, AES-256, Solidity, WebSockets</p>
        </div>
      );
    } else if (clean === "contact") {
      resultNode = (
        <div className="text-xs text-zinc-300 font-mono space-y-1">
          <p>Email: <a href={`mailto:${PERSONAL.email}`} className="text-cyan-400 underline">{PERSONAL.email}</a></p>
          <p>LinkedIn: <a href={PERSONAL.links.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/aryanjyadav</a></p>
          <p>GitHub: <a href={PERSONAL.links.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/{PERSONAL.handle}</a></p>
        </div>
      );
    } else if (clean === "github") {
      window.open(PERSONAL.links.github, "_blank");
      resultNode = <span className="text-cyan-400">Opening {PERSONAL.links.github}...</span>;
    } else {
      resultNode = (
        <span className="text-zinc-500">
          Command not recognized: '{clean}'. Type <span className="text-cyan-400 font-bold">help</span> to view commands.
        </span>
      );
    }

    setHistory((prev) => [...prev, { cmd: input, output: resultNode }]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Terminal Window with data-lenis-prevent */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-[#080a12] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,210,255,0.2)] flex flex-col overflow-hidden z-10 font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#05060a]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-zinc-300 font-bold">aryan@terminal: ~ (Type 'help' or click chips)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-500 hover:text-white transition-colors"
              aria-label="Close terminal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Command Chips */}
          <div className="px-5 py-2 border-b border-white/5 bg-white/[0.01] flex flex-wrap gap-1.5 text-[11px]">
            {["projects", "skills", "whoami", "resume", "contact", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 border border-white/5 text-zinc-400 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output */}
          <div data-lenis-prevent="true" className="p-5 max-h-80 overflow-y-auto space-y-4 text-xs">
            {history.map((h, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-zinc-500">➜</span>
                  <span className="font-bold">{h.cmd}</span>
                </div>
                <div className="pl-4">{h.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(input);
            }}
            className="flex items-center gap-2 px-5 py-3 border-t border-white/10 bg-[#040508]"
          >
            <span className="text-cyan-400 font-bold">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command (e.g. 'open finauditpro', 'projects', 'resume')..."
              className="w-full bg-transparent border-none text-white text-xs focus:outline-none font-mono placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] transition-colors"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
