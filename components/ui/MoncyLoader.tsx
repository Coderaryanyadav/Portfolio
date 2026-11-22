"use client";

import { useEffect, useState, useRef } from "react";
import { sounds } from "@/lib/sound";
import { ArrowRight } from "lucide-react";

interface MoncyLoaderProps {
  onComplete?: () => void;
}

export default function MoncyLoader({ onComplete }: MoncyLoaderProps) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const buttonWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll while loader is visible
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      if (current < 75) {
        current += Math.floor(Math.random() * 8) + 4;
      } else if (current < 99) {
        current += Math.floor(Math.random() * 5) + 2;
      } else {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 200);
      }
      setPercent(Math.min(current, 100));
    }, 32);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        triggerEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonWrapRef.current) return;
    const rect = buttonWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonWrapRef.current.style.setProperty("--mouse-x", `${x}px`);
    buttonWrapRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const triggerEnter = () => {
    sounds.playClick();
    setIsClicked(true);
    document.body.style.overflow = "unset";
    setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, 800);
  };

  if (hidden) return null;

  return (
    <div
      className={`loading-screen ${isClicked ? "pointer-events-none" : ""}`}
      style={{
        opacity: isClicked ? 0 : 1,
        transition: "opacity 0.5s ease-in-out 0.35s",
      }}
    >
      {/* Top Header with Brand Title & Mini Bouncing Ball Game */}
      <div className="loading-header">
        <button
          onClick={triggerEnter}
          className="loader-title flex items-center gap-2 hover:text-cyan-400 transition-colors text-left"
        >
          <span>ARYAN YADAV</span>
          <span className="hidden sm:inline text-cyan-400 font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
            PORTFOLIO 2026
          </span>
        </button>

        {/* Right side: Mini Bouncing Ball Game & Quick Skip Pill */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={triggerEnter}
            className="font-mono text-xs text-zinc-300 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/40 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 bg-white/[0.03]"
          >
            <span>Skip</span>
            <ArrowRight size={12} />
          </button>

          <div className={`loaderGame ${isClicked ? "loader-out" : ""} hidden sm:block`}>
            <div className="loaderGame-container">
              <div className="loaderGame-in">
                {[...Array(27)].map((_, i) => (
                  <div key={i} className="loaderGame-line" />
                ))}
              </div>
              <div className="loaderGame-ball" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Continuous Cinematic Marquee */}
      <div className="loading-marquee select-none pointer-events-none">
        <div className="loading-marquee-inner">
          <span>Software Engineer</span>
          <span>Offline AI & RAG</span>
          <span>Cybersecurity</span>
          <span>Mobile Systems</span>
          <span>Full-Stack Builder</span>
          <span>Software Engineer</span>
          <span>Offline AI & RAG</span>
          <span>Cybersecurity</span>
          <span>Mobile Systems</span>
          <span>Full-Stack Builder</span>
        </div>
      </div>

      {/* Centered Interactive Pill Button with Mouse Coordinate Lighting */}
      <div
        ref={buttonWrapRef}
        onMouseMove={handleMouseMove}
        onClick={triggerEnter}
        className={`loading-wrap ${isClicked ? "loading-clicked" : ""}`}
      >
        <div className="loading-hover" />
        <div className={`loading-button ${isLoaded ? "loading-complete" : ""}`}>
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-content-in">
                LOADING <span>{percent}%</span>
              </div>
            </div>
            <div className="loading-box" />
          </div>
          <div className="loading-content2">
            <span>ENTER EXPERIENCE</span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{isLoaded ? "CLICK PILL OR PRESS ENTER TO EXPLORE" : "INITIALIZING SYSTEMS"}</span>
      </div>
    </div>
  );
}
