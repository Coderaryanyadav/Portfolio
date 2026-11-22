"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop / pointer fine
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
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
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer subtle follower in Electric Cyber Blue */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-cyan-400/60"
        animate={{
          x: mousePosition.x - (isHovered ? 26 : 15),
          y: mousePosition.y - (isHovered ? 26 : 15),
          width: isHovered ? 52 : 30,
          height: isHovered ? 52 : 30,
          scale: isHovered ? 1.15 : 1,
          backgroundColor: isHovered ? "rgba(0, 210, 255, 0.18)" : "transparent",
          boxShadow: isHovered ? "0 0 25px rgba(0, 210, 255, 0.3)" : "none",
        }}
        transition={{
          type: "spring",
          damping: 26,
          stiffness: 320,
          mass: 0.45,
        }}
      />
      {/* Center dot in Electric Cyan */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400 shadow-[0_0_10px_#00d2ff]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          width: 6,
          height: 6,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 500,
        }}
      />
    </>
  );
}
