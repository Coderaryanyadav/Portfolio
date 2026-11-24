"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const istTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050608] relative z-20 overflow-hidden">
      {/* Top micro ticker */}
      <div className="border-b border-white/5 py-3 px-6 text-xs font-mono text-zinc-400 flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-300">Mumbai, India</span>
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">{time ? `${time} IST` : "IST"}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <span>Engineered with Next.js, TypeScript & Tailwind</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center font-mono text-xs font-bold text-cyan-400">
                AY
              </span>
              <span className="font-heading font-bold text-lg text-white">Aryan Yadav</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm font-sans leading-relaxed">
              Information Technology student and developer focused on offline-first AI, cybersecurity, systems architecture, and intuitive digital tools.
            </p>
          </div>

          {/* Direct Navigation */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block mb-2">Navigation</span>
            <ul className="space-y-2">
              <li>
                <a href="#about" onClick={() => sounds.playClick()} className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  01. About & Pillars
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => sounds.playClick()} className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  02. Featured Projects
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => sounds.playClick()} className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  03. Technical Ecosystem
                </a>
              </li>
              <li>
                <a href="#journey" onClick={() => sounds.playClick()} className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  04. Engineering Journey
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => sounds.playClick()} className="text-zinc-400 hover:text-cyan-400 transition-colors">
                  05. Direct Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Social Channels: STRICTLY GitHub and LinkedIn */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block mb-2">Verified Channels</span>
            <div className="space-y-2">
              <a
                href={PERSONAL.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 text-zinc-300 hover:text-cyan-400 transition-colors group"
              >
                <Github size={15} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                <span>github.com/{PERSONAL.handle}</span>
              </a>
              <a
                href={PERSONAL.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 text-zinc-300 hover:text-cyan-400 transition-colors group"
              >
                <Linkedin size={15} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                <span>linkedin.com/in/aryanjyadav</span>
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 text-zinc-300 hover:text-cyan-400 transition-colors group"
              >
                <Mail size={15} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                <span>{PERSONAL.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} Aryan Yadav. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors group px-3 py-1.5 rounded-full border border-white/5 hover:border-cyan-500/30"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
