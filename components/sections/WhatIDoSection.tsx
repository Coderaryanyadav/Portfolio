"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  Clock,
  GraduationCap,
  MapPin,
  Download,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

export default function WhatIDoSection() {
  // activeCard: 0 = DEVELOP, 1 = DESIGN & ARCHITECTURE, 2 = RECRUITER & SNAPSHOT
  const [activeCard, setActiveCard] = useState<number | null>(0);

  // Sync with #about vs #what-i-do anchor links
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#about") {
        setActiveCard(2);
      } else if (window.location.hash === "#what-i-do") {
        setActiveCard(0);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Smooth exit fade out: disappears "little by little" as user scrolls towards projects
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-marquee",
        start: "top 95%",
        end: "top 40%",
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });

    exitTl.to(".what-box-left, .what-box-right", {
      opacity: 0,
      y: -35,
      duration: 1,
      ease: "power1.inOut",
    });

    return () => {
      exitTl.kill();
    };
  }, []);

  const handleCardClick = (idx: number) => {
    sounds.playClick();
    setActiveCard(idx);
  };

  return (
    <section id="what-i-do" className="relative min-h-screen z-10 flex items-center pt-20 lg:pt-24 pb-16 scroll-mt-20">
      {/* Anchor for in-page navigation to #about */}
      <span id="about" className="absolute -top-24 pointer-events-none" />

      <div className="whatIDO relative w-full flex flex-col lg:flex-row items-start lg:items-center justify-between px-5 sm:px-10 xl:px-14 gap-10 lg:gap-0">
        {/* Left Column: Identity, Narrative & Quick CTAs */}
        <div className="what-box what-box-left flex flex-col justify-center max-w-[340px] xl:max-w-[360px] z-20">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 — Identity &amp; Craft</span>
          </div>

          <h2 className="title font-heading font-black tracking-tight text-white uppercase select-none mb-3">
            W<span className="hat-h2 font-light italic text-zinc-400">HAT</span>
            <div>
              I<span className="do-h2 text-cyan-400 text-glow"> DO</span>
            </div>
          </h2>

          <div className="space-y-3.5">
            <p className="font-heading font-bold text-sm sm:text-base text-zinc-100 italic border-l-2 border-cyan-400 pl-3 leading-snug">
              &ldquo;Curiosity drives everything I build.&rdquo;
            </p>

            <p className="font-sans text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
              I&apos;m <strong className="text-white font-medium">Aryan Yadav</strong>, an Information Technology student based in Mumbai architecting software across full-stack systems, air-gapped local AI, and defensive cybersecurity.
            </p>

            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
                Offline-First RAG
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                Spatial GIS PostGIS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                AES Ciphers
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                Flutter &amp; React Native
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="/Resume.pdf"
                download="Aryan_Yadav_Resume.pdf"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(0,210,255,0.25)]"
              >
                <Download size={12} />
                <span>Resume (PDF)</span>
              </a>

              <a
                href={PERSONAL.calUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <Calendar size={12} className="text-cyan-400" />
                <span>15-Min Chat</span>
                <ArrowUpRight size={10} className="text-zinc-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Workstation Technical Cards with SVG Borders & Corners */}
        <div className="what-box what-box-right z-20">
          <div className="what-box-in w-[440px] max-w-full">
            {/* Quick Switcher Tabs at the top */}
            <div className="flex items-center justify-between gap-1.5 p-1 rounded-xl bg-[#090b14]/80 backdrop-blur-md border border-white/10 mb-1">
              <button
                type="button"
                onClick={() => handleCardClick(0)}
                className={`flex-1 py-1 px-2 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all text-center ${
                  activeCard === 0
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Develop
              </button>
              <button
                type="button"
                onClick={() => handleCardClick(1)}
                className={`flex-1 py-1 px-2 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all text-center ${
                  activeCard === 1
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Architecture
              </button>
              <button
                type="button"
                onClick={() => handleCardClick(2)}
                className={`flex-1 py-1 px-2 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all text-center ${
                  activeCard === 2
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Snapshot
              </button>
            </div>

            {/* Vertical dashed bounding lines */}
            <div className="what-border2">
              <svg width="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  stroke="rgba(0, 210, 255, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="7,7"
                />
                <line
                  x1="100%"
                  y1="0"
                  x2="100%"
                  y2="100%"
                  stroke="rgba(0, 210, 255, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="7,7"
                />
              </svg>
            </div>

            {/* Card 1: DEVELOP */}
            <div
              className={`what-content what-noTouch ${activeCard === 0 ? "what-content-active" : "what-sibling"}`}
              onClick={() => handleCardClick(0)}
              onMouseEnter={() => sounds.playHover()}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner"></div>

              <div className="what-content-in">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-wider">
                      DEVELOP
                    </h3>
                    <span className="hidden sm:inline font-mono text-[9px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 uppercase">
                      Full-Stack
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      activeCard === 0 ? "rotate-180 border-cyan-400 text-cyan-300" : "text-zinc-400"
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </div>

                <div className="what-body mt-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 mb-1">
                    Description
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed pr-2">
                    Started building software with C++ and JavaScript; now I architect resilient applications with TypeScript, React, Next.js 15, Node.js, Express, Python, and Flutter — with sub-second real-time sync and offline resilience.
                  </p>
                  <div className="what-details">
                    <h5 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mt-2.5 mb-1.5">
                      Skillset &amp; Tools
                    </h5>
                    <div className="what-content-flex">
                      <span className="what-tags">TypeScript</span>
                      <span className="what-tags">React</span>
                      <span className="what-tags">Next.js 15</span>
                      <span className="what-tags">Node.js</span>
                      <span className="what-tags">Python</span>
                      <span className="what-tags">Flutter</span>
                      <span className="what-tags">PostgreSQL</span>
                      <span className="what-tags">Three.js</span>
                      <span className="what-tags">Express</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: DESIGN & ARCHITECTURE */}
            <div
              className={`what-content what-noTouch ${activeCard === 1 ? "what-content-active" : "what-sibling"}`}
              onClick={() => handleCardClick(1)}
              onMouseEnter={() => sounds.playHover()}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner"></div>

              <div className="what-content-in">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-wider">
                      DESIGN &amp; ARCHITECTURE
                    </h3>
                    <span className="hidden sm:inline font-mono text-[9px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 uppercase">
                      Systems
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      activeCard === 1 ? "rotate-180 border-cyan-400 text-cyan-300" : "text-zinc-400"
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </div>

                <div className="what-body mt-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 mb-1">
                    Description
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed pr-2">
                    Engineering zero-leakage offline AI RAG pipelines with ChromaDB, defensive cybersecurity encryption ciphers (AES-256), and mission-critical PostGIS spatial emergency dispatch.
                  </p>
                  <div className="what-details">
                    <h5 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mt-2.5 mb-1.5">
                      Architecture Focus
                    </h5>
                    <div className="what-content-flex">
                      <span className="what-tags">System Architecture</span>
                      <span className="what-tags">Offline AI &amp; RAG</span>
                      <span className="what-tags">ChromaDB</span>
                      <span className="what-tags">Cybersecurity</span>
                      <span className="what-tags">AES Ciphers</span>
                      <span className="what-tags">PostGIS Spatial</span>
                      <span className="what-tags">Web3 Solidity</span>
                      <span className="what-tags">UI/UX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: RECRUITER & HIRING SNAPSHOT */}
            <div
              className={`what-content what-noTouch ${activeCard === 2 ? "what-content-active" : "what-sibling"}`}
              onClick={() => handleCardClick(2)}
              onMouseEnter={() => sounds.playHover()}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                </svg>
              </div>
              <div className="what-corner"></div>

              <div className="what-content-in">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-wider">
                      RECRUITER SNAPSHOT
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>INTERVIEWING</span>
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                        activeCard === 2 ? "rotate-180 border-cyan-400 text-cyan-300" : "text-zinc-400"
                      }`}
                    >
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                <div className="what-body mt-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 mb-1">
                    Availability &amp; Qualifications
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-1.5">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[9px] tracking-wider flex items-center gap-1">
                        <Briefcase size={10} className="text-cyan-400" /> Target Roles
                      </span>
                      <p className="text-zinc-200 font-sans text-xs font-medium line-clamp-1">
                        SWE Intern / Full-Stack &amp; AI
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[9px] tracking-wider flex items-center gap-1">
                        <Clock size={10} className="text-cyan-400" /> Availability
                      </span>
                      <p className="text-zinc-200 font-sans text-xs font-medium">
                        Summer 2026 / Immediate Co-op
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[9px] tracking-wider flex items-center gap-1">
                        <GraduationCap size={10} className="text-cyan-400" /> Education
                      </span>
                      <p className="text-zinc-200 font-sans text-xs font-medium">
                        Diploma in IT • Bhagubhai Mafatlal Polytechnic (2024–2027)
                      </p>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                      <span className="text-zinc-500 uppercase text-[9px] tracking-wider flex items-center gap-1">
                        <MapPin size={10} className="text-cyan-400" /> Location
                      </span>
                      <p className="text-zinc-200 font-sans text-xs font-medium">
                        Mumbai • Remote &amp; Hybrid
                      </p>
                    </div>
                  </div>

                  <div className="what-details">
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1 text-cyan-400 font-bold">
                        <CheckCircle2 size={12} /> 14 Audited Repositories
                      </span>
                      <span className="text-emerald-400">0KB Cloud Egress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
