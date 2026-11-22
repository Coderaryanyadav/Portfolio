"use client";

import { useState } from "react";
import { sounds } from "@/lib/sound";

export default function WhatIDoSection() {
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const handleCardClick = (idx: number) => {
    sounds.playClick();
    setActiveCard((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="what-i-do" className="whatIDO relative min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 xl:px-20 z-10">
      {/* Left Column: Giant WHAT I DO Headline (Image 3) */}
      <div className="what-box">
        <h2 className="title font-heading font-black tracking-tight text-white uppercase select-none">
          W<span className="hat-h2 font-light italic text-zinc-400">HAT</span>
          <div>
            I<span className="do-h2 text-cyan-400 text-glow"> DO</span>
          </div>
        </h2>
      </div>

      {/* Right Column: Workstation Technical Cards with SVG Borders & Corners (Image 3) */}
      <div className="what-box">
        <div className="what-box-in">
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
            className={`what-content what-noTouch ${activeCard === 0 ? "what-content-active" : activeCard === 1 ? "what-sibling" : ""}`}
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
            {/* Technical corner crosshairs ⌜ ⌝ ⌞ ⌟ */}
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider">
                DEVELOP
              </h3>
              <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 my-1">
                Description
              </h4>
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Started building software with C++ and JavaScript; now I architect resilient applications with TypeScript, React, Next.js 15, Node.js, Express, Python, and Flutter — with sub-second real-time sync and offline resilience.
              </p>
              <h5 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mt-3 mb-1.5">
                Skillset & Tools
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
              <div className="what-arrow"></div>
            </div>
          </div>

          {/* Card 2: DESIGN & SYSTEMS */}
          <div
            className={`what-content what-noTouch ${activeCard === 1 ? "what-content-active" : activeCard === 0 ? "what-sibling" : ""}`}
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
            {/* Technical corner crosshairs ⌜ ⌝ ⌞ ⌟ */}
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider">
                DESIGN & ARCHITECTURE
              </h3>
              <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 my-1">
                Description
              </h4>
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Engineering zero-leakage offline AI RAG pipelines with ChromaDB, defensive cybersecurity encryption ciphers (AES-256), and mission-critical PostGIS spatial emergency dispatch.
              </p>
              <h5 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mt-3 mb-1.5">
                Skillset & Tools
              </h5>
              <div className="what-content-flex">
                <span className="what-tags">System Architecture</span>
                <span className="what-tags">Offline AI & RAG</span>
                <span className="what-tags">ChromaDB</span>
                <span className="what-tags">Cybersecurity</span>
                <span className="what-tags">AES Ciphers</span>
                <span className="what-tags">PostGIS Spatial</span>
                <span className="what-tags">Web3 Solidity</span>
                <span className="what-tags">UI/UX</span>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
