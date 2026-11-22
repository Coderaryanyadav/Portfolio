"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import HoverLink from "./HoverLink";
import { sounds } from "@/lib/sound";

interface SocialIconsProps {
  onOpenResume?: () => void;
}

export default function SocialIcons({ onOpenResume }: SocialIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".magnetic-icon");
    items.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a, button") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = mouseX;
      let currentY = mouseY;
      let animId: number;

      const updatePos = () => {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;
        link.style.transform = `translate(${currentX - rect.width / 2}px, ${currentY - rect.height / 2}px)`;
        animId = requestAnimationFrame(updatePos);
      };

      const handleMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x > -15 && x < rect.width + 15 && y > -15 && y < rect.height + 15) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      window.addEventListener("mousemove", handleMove);
      animId = requestAnimationFrame(updatePos);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        cancelAnimationFrame(animId);
      };
    });
  }, []);

  return (
    <aside aria-label="Social media and resume links" className="fixed bottom-0 left-0 right-0 z-40 max-w-[1920px] mx-auto pointer-events-none px-6 sm:px-10 pb-6 hidden md:block">
      <div ref={containerRef} className="relative w-full flex items-center justify-between">
        {/* Left Side: Magnetic Social Links */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="magnetic-icon w-10 h-10 flex items-center justify-center">
            <a
              href="https://github.com/Coderaryanyadav"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="w-10 h-10 rounded-full bg-[#080912]/80 backdrop-blur-md border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-zinc-400 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.35)]"
              title="GitHub Profile"
            >
              <Github size={17} />
            </a>
          </div>

          <div className="magnetic-icon w-10 h-10 flex items-center justify-center">
            <a
              href="https://www.linkedin.com/in/aryany1/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="w-10 h-10 rounded-full bg-[#080912]/80 backdrop-blur-md border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-zinc-400 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.35)]"
              title="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </div>

        {/* Right Side: Signature Moncy Resume Quick Pill */}
        <div className="pointer-events-auto">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenResume?.();
            }}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#080912]/80 backdrop-blur-md border border-white/10 hover:border-cyan-400 text-zinc-300 hover:text-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.3)] cursor-pointer"
          >
            <HoverLink text="RESUME" className="text-xs font-mono font-bold tracking-[0.2em]" />
            <FileText size={14} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  );
}
