"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Terminal, FileText } from "lucide-react";
import SoundToggle from "../ui/SoundToggle";
import { sounds } from "@/lib/sound";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenTerminal, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center py-4 px-3 sm:px-6 transition-all duration-300">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#080912]/90 backdrop-blur-md border-cyan-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* AY Brand Mark */}
          <a
            href="#hero"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-2 group text-white font-heading font-bold text-lg tracking-wider"
          >
            <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
              AY
            </span>
            <span className="hidden sm:inline text-xs font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">
              Aryan Yadav
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-full">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => sounds.playClick()}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-cyan-500/15 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions: Terminal (⌘K), Resume, Sound */}
          <div className="flex items-center gap-2">
            {/* Terminal ⌘K button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal?.();
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-400 transition-all"
              title="Open Developer Terminal (⌘K)"
            >
              <Terminal size={12} className="text-cyan-400" />
              <span>⌘K</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenResume?.();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
              title="View & Download Curriculum Vitae"
            >
              <FileText size={12} className="text-cyan-400" />
              <span className="hidden sm:inline">Resume</span>
            </button>

            {/* Audio Toggle */}
            <SoundToggle />

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-[#0c0d18] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    sounds.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between text-base font-heading font-medium text-zinc-200 hover:text-cyan-400 py-2 border-b border-white/5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} className="text-zinc-500" />
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-400">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal?.();
                  }}
                  className="flex items-center gap-1.5 text-cyan-400"
                >
                  <Terminal size={13} />
                  <span>Open Terminal (⌘K)</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume?.();
                  }}
                  className="text-white underline"
                >
                  View CV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
