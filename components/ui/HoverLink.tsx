"use client";

interface HoverLinkProps {
  text: string;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  cursor?: boolean;
}

export default function HoverLink({
  text,
  className = "",
  cursor = true,
}: HoverLinkProps) {
  return (
    <span
      className={`hover-link relative inline-flex overflow-hidden select-none group cursor-pointer whitespace-nowrap ${className}`}
      data-cursor={!cursor ? "disable" : undefined}
    >
      <span className="hover-in inline-block relative transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap">
        <span className="inline-block transition-colors group-hover:text-cyan-400 whitespace-nowrap">{text}</span>
        <span className="absolute top-full left-0 inline-block text-cyan-400 font-bold whitespace-nowrap">
          {text}
        </span>
      </span>
    </span>
  );
}
