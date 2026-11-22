"use client";

import { useEffect, useState, useRef } from "react";
import { sounds } from "@/lib/sound";

interface MoncyLoaderProps {
  onComplete?: () => void;
}

export default function MoncyLoader({ onComplete }: MoncyLoaderProps) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const buttonWrapRef = useRef<HTMLDivElement>(null);

  // Simulated rapid smooth progress counter (0 -> 100)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < 75) {
        current += Math.floor(Math.random() * 6) + 3;
      } else if (current < 99) {
        current += Math.floor(Math.random() * 4) + 1;
      } else {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      }
      setPercent(Math.min(current, 100));
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Handle dynamic mouse tracking spotlight: sets --mouse-x and --mouse-y
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonWrapRef.current) return;
    const rect = buttonWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonWrapRef.current.style.setProperty("--mouse-x", `${x}px`);
    buttonWrapRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleEnterClick = () => {
    sounds.playClick();
    setIsClicked(true);
    setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, 900);
  };

  if (hidden) return null;

  return (
    <div
      className={`loading-screen ${isClicked ? "pointer-events-none" : ""}`}
      style={{
        opacity: isClicked ? 0 : 1,
        transition: "opacity 0.6s ease-in-out 0.4s",
      }}
    >
      {/* Top Header with Brand Title & Mini Bouncing Ball Game */}
      <div className="loading-header">
        <a href="#hero" className="loader-title" data-cursor="disable">
          ARYAN YADAV <span className="text-cyan-400 font-mono text-xs">/ 2026</span>
        </a>

        {/* The Signature moncy.dev Mini Game: Bouncing ball across rhythmic gate lines */}
        <div className={`loaderGame ${isClicked ? "loader-out" : ""}`}>
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
        onClick={handleEnterClick}
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
        <span>{isLoaded ? "CLICK PILL TO EXPLORE" : "INITIALIZING SYSTEMS"}</span>
      </div>
    </div>
  );
}
