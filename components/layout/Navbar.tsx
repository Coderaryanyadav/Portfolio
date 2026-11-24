"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, FileText, Download } from "lucide-react";
import HoverLink from "../ui/HoverLink";
import { sounds } from "@/lib/sound";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "JOURNEY", href: "#journey" },
  { label: "CONTACT", href: "#contact" },
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

      // Hero section guard: when near the top, active section is strictly hero
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection("hero");
        return;
      }

      const sections = ["what-i-do", "projects", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          if (sections[i] === "what-i-do") {
            setActiveSection("about");
          } else {
            setActiveSection(sections[i]);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Signature Ambient Blurred Background Orbs (Moncy.dev) */}
      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />

      {/* Main Floating Header */}
      <header
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top, 1rem))" }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center px-4 sm:px-8"
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-7xl flex items-center justify-between gap-4 px-5 py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#080912]/90 backdrop-blur-md border-cyan-500/25 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Left: AY Monogram Logo */}
          <a
            href="#hero"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-3 group text-white font-heading font-bold text-lg tracking-wider"
          >
            <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)] transition-all">
              AY
            </span>
            <span className="hidden sm:inline text-xs font-mono text-zinc-300 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
              Aryan Yadav
            </span>
          </a>

          {/* Center: Desktop Nav Links with Moncy.dev HoverLinks Flip Effect */}
          <nav className="hidden md:flex items-center gap-1 bg-[#090b14]/80 backdrop-blur-md border border-white/10 px-2 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => sounds.playClick()}
                  className={`px-3 py-1 text-xs font-mono tracking-wider transition-all rounded-full whitespace-nowrap ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,210,255,0.15)] font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <HoverLink text={item.label} />
                </a>
              );
            })}
          </nav>

          {/* Actions: Terminal (⌘K), Direct PDF Resume, Audio, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Terminal ⌘K button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal?.();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-400 transition-all cursor-pointer"
              title="Open Terminal (⌘K)"
            >
              <Terminal size={12} className="text-cyan-400" />
              <span>⌘K</span>
            </button>

            {/* Direct Resume PDF Download Pill */}
            <a
              href="/resume.pdf"
              download="Aryan_Yadav_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:text-white transition-all cursor-pointer font-bold whitespace-nowrap"
              title="Download Resume (PDF)"
            >
              <Download size={12} className="text-cyan-400" />
              <span>RESUME</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-cyan-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-20 inset-x-4 z-40 bg-[#090b14]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    sounds.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl font-heading font-bold text-sm text-zinc-300 hover:text-cyan-400 hover:bg-white/[0.03] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href="/resume.pdf"
                download="Aryan_Yadav_Resume.pdf"
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs uppercase tracking-wider"
              >
                <Download size={13} />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                  onOpenResume?.();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-wider"
              >
                <FileText size={13} className="text-cyan-400" />
                <span>View Interactive CV</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                  onOpenTerminal?.();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider"
              >
                <Terminal size={13} />
                <span>Launch Terminal (⌘K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
