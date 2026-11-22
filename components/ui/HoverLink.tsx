"use client";

import React from "react";
import { sounds } from "@/lib/sound";

interface HoverLinkProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  cursor?: boolean;
}

export default function HoverLink({
  text,
  href,
  onClick,
  className = "",
}: HoverLinkProps) {
  const content = (
    <div className="hover-link">
      <div className="hover-in">
        <span>{text}</span>
        <div aria-hidden="true">{text}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          sounds.playHover();
          onClick?.();
        }}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={() => {
        sounds.playHover();
        onClick?.();
      }}
      className={`inline-block text-left ${className}`}
    >
      {content}
    </button>
  );
}
