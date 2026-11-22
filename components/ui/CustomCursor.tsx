"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (no touch devices)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isVisible = false;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("[data-cursor='pointer']") ||
        target?.closest("input") ||
        target?.closest("textarea")
      ) {
        if (!isHovered) {
          isHovered = true;
          ring.classList.add("cursor-hover");
          dot.classList.add("cursor-hover");
        }
      } else {
        if (isHovered) {
          isHovered = false;
          ring.classList.remove("cursor-hover");
          dot.classList.remove("cursor-hover");
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Direct 60/120fps hardware-accelerated lerp (Zero React re-render overhead)
      const ringLerp = isHovered ? 0.22 : 0.16;
      ringX += (mouseX - ringX) * ringLerp;
      ringY += (mouseY - ringY) * ringLerp;

      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      ring.style.transform = `translate3d(${ringX - (isHovered ? 24 : 15)}px, ${ringY - (isHovered ? 24 : 15)}px, 0)`;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer magnetic follower in Electric Cyber Blue */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-cyan-400/60 transition-[width,height,background-color,box-shadow,border-color] duration-200 ease-out opacity-0 w-[30px] h-[30px] will-change-transform [&.cursor-hover]:w-[48px] [&.cursor-hover]:h-[48px] [&.cursor-hover]:bg-cyan-400/15 [&.cursor-hover]:shadow-[0_0_25px_rgba(0,210,255,0.4)] [&.cursor-hover]:border-cyan-300"
      />
      {/* Center dot in Electric Cyan */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400 shadow-[0_0_10px_#00d2ff] opacity-0 w-[6px] h-[6px] will-change-transform transition-[transform,opacity] duration-150 ease-out [&.cursor-hover]:scale-0"
      />
    </>
  );
}
