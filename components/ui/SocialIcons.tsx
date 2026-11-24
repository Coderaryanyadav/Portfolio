"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Download } from "lucide-react";
import HoverLink from "./HoverLink";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

interface SocialIconsProps {
  onOpenResume?: () => void;
}

export default function SocialIcons(_props: SocialIconsProps = {}) {
  void _props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".magnetic-icon");
    const cleanupFns: (() => void)[] = [];

    items.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a, button") as HTMLElement;
      if (!link) return;

      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      let animId: number;

      const updatePos = () => {
        currentX += (mouseX - currentX) * 0.11;
        currentY += (mouseY - currentY) * 0.11;
        link.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        animId = requestAnimationFrame(updatePos);
      };

      const handleMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        // Magnetic pull zone (within 45px of center)
        if (dist < 45) {
          mouseX = dx * 0.45;
          mouseY = dy * 0.45;
        } else {
          mouseX = 0;
          mouseY = 0;
        }
      };

      window.addEventListener("mousemove", handleMove, { passive: true });
      animId = requestAnimationFrame(updatePos);

      cleanupFns.push(() => {
        window.removeEventListener("mousemove", handleMove);
        cancelAnimationFrame(animId);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <aside
      aria-label="Social media and resume links"
      className={`fixed bottom-0 left-0 right-0 z-30 max-w-[1920px] mx-auto px-6 sm:px-10 pb-6 hidden md:block transition-all duration-500 ease-out ${
        scrolledPastHero
          ? "opacity-0 translate-y-8 pointer-events-none"
          : "opacity-100 translate-y-0 pointer-events-none"
      }`}
    >
      <div ref={containerRef} className="relative w-full flex items-center justify-between">
        {/* Left Side: Magnetic Social Links (Permanently hovering on screen across all sections) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="magnetic-icon w-11 h-11 flex items-center justify-center">
            <a
              href="https://github.com/Coderaryanyadav"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#080912]/85 backdrop-blur-md border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-zinc-400 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              title="GitHub Profile"
            >
              <Github size={17} />
            </a>
          </div>

          <div className="magnetic-icon w-11 h-11 flex items-center justify-center">
            <a
              href={PERSONAL.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#080912]/85 backdrop-blur-md border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-zinc-400 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              title="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </div>

        {/* Right Side: Direct Resume PDF Download Pill (Permanently hovering on screen across all sections) */}
        <div className="pointer-events-auto">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Aryan_Yadav_Resume.pdf"
            onClick={() => sounds.playClick()}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#080912]/85 backdrop-blur-md border border-white/10 hover:border-cyan-400 text-zinc-300 hover:text-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.3)] cursor-pointer"
            title="Download Aryan's Resume (PDF)"
          >
            <HoverLink text="RESUME" className="text-xs font-mono font-bold tracking-[0.2em]" />
            <Download size={13} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>
      </div>
    </aside>
  );
}
