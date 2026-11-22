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
}

export default function CommandPalette({ isOpen, onClose, onSelectProject }: CommandPaletteProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: "welcome",
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-cyan-400 font-bold">Aryan Yadav — Interactive Developer Terminal [v2.4.0]</p>
          <p>Type <span className="text-white font-mono bg-white/10 px-1 rounded">help</span> to list available commands, or select any project directly.</p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        sounds.playClick();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleCommand = (cmdStr: string) => {
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
          <div><span className="text-cyan-400 font-bold">projects</span> : List all audited repositories</div>
          <div><span className="text-cyan-400 font-bold">open &lt;name&gt;</span> : View project case study</div>
          <div><span className="text-cyan-400 font-bold">skills</span> : Inspect technical ecosystem</div>
          <div><span className="text-cyan-400 font-bold">whoami</span> : Display Aryan's engineering bio</div>
          <div><span className="text-cyan-400 font-bold">contact</span> : Get direct communication channels</div>
          <div><span className="text-cyan-400 font-bold">github</span> : Open GitHub profile in new tab</div>
          <div><span className="text-cyan-400 font-bold">clear</span> : Clear terminal output</div>
        </div>
      );
    } else if (clean === "whoami") {
      resultNode = (
        <div className="space-y-1 text-xs text-zinc-300">
          <p><span className="text-cyan-400 font-bold">Aryan Yadav</span> — Mumbai, India</p>
          <p className="text-zinc-400">{PERSONAL.aboutDetailed}</p>
        </div>
      );
    } else if (clean === "projects" || clean === "ls") {
      resultNode = (
        <div className="space-y-2 text-xs font-mono">
          <p className="text-zinc-500">Audited Projects (click to inspect case study):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProject(p);
                  onClose();
                }}
                className="text-left p-2 rounded bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 border border-white/5 transition-colors flex items-center justify-between"
              >
                <span>{p.title}</span>
                <span className="text-[10px] text-zinc-500">{p.domain}</span>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (clean.startsWith("open ") || clean.startsWith("cat ")) {
      const targetName = clean.replace(/^(open|cat)\s+/, "").trim();
      const match = PROJECTS.find((p) => p.id.toLowerCase() === targetName || p.title.toLowerCase() === targetName);
      if (match) {
        onSelectProject(match);
        onClose();
        resultNode = <span className="text-emerald-400">Opening case study for {match.title}...</span>;
      } else {
        resultNode = <span className="text-rose-400">Error: Project '{targetName}' not found. Try 'projects' to see list.</span>;
      }
    } else if (clean === "skills") {
      resultNode = (
        <div className="text-xs text-zinc-300 font-mono space-y-1">
          <p><strong className="text-cyan-400">Core Languages:</strong> Python, TypeScript, Dart, JavaScript, PHP, SQL</p>
          <p><strong className="text-cyan-400">Mobile & Web:</strong> Flutter, React Native (Expo SDK 58), Next.js 15, Tailwind</p>
          <p><strong className="text-cyan-400">AI & Security:</strong> Offline RAG, ChromaDB, AES-GCM, Solidity, PostGIS</p>
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
      resultNode = <span className="text-cyan-400">Navigating to {PERSONAL.links.github}...</span>;
    } else {
      resultNode = <span className="text-zinc-500">Command not recognized: '{clean}'. Type <span className="text-cyan-400">help</span> for commands.</span>;
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

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-[#080a10] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,210,255,0.15)] flex flex-col overflow-hidden z-10 font-mono"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#05060a]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-zinc-400">aryan@terminal: ~ (Type 'help')</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Terminal Output Body */}
          <div className="p-5 max-h-80 overflow-y-auto space-y-4 text-xs">
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

          {/* Terminal Input Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="flex items-center gap-2 px-5 py-3 border-t border-white/10 bg-[#040508]"
          >
            <span className="text-cyan-400 font-bold">➜</span>
            <input
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (e.g. 'projects', 'whoami', 'skills', 'contact')..."
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
