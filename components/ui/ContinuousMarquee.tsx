"use client";

import React from "react";

interface ContinuousMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speedSeconds?: number;
  className?: string;
}

export default function ContinuousMarquee({
  items,
  direction = "left",
  speedSeconds = 30,
  className = "",
}: ContinuousMarqueeProps) {
  // Multiply items to guarantee zero gaps across ultra-wide monitors (e.g. 4K)
  const fullItems = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none py-6 border-y border-white/5 bg-[#06070c] relative ${className}`}>
      {/* Ambient gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050608] to-transparent z-10 pointer-events-none" />

      <div
        className="flex shrink-0 items-center gap-12 font-heading font-extrabold text-2xl sm:text-4xl text-zinc-300 uppercase tracking-wider"
        style={{
          animation: `marquee-scroll-${direction} ${speedSeconds}s linear infinite`,
        }}
      >
        {fullItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-cyan-400 transition-colors">{item}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(0,210,255,0.6)]" />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="flex shrink-0 items-center gap-12 font-heading font-extrabold text-2xl sm:text-4xl text-zinc-300 uppercase tracking-wider"
        style={{
          animation: `marquee-scroll-${direction} ${speedSeconds}s linear infinite`,
        }}
      >
        {fullItems.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-8">
            <span className="hover:text-cyan-400 transition-colors">{item}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(0,210,255,0.6)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
