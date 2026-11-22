"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/lib/sound";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(sounds.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = sounds.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] border transition-all ${
        enabled
          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
          : "bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white hover:border-white/20"
      }`}
      aria-label="Toggle Sound Effects"
      title={enabled ? "Audio Synthesizer: ON" : "Audio Synthesizer: OFF (Click to enable)"}
    >
      {enabled ? <Volume2 size={13} className="text-cyan-400 animate-pulse" /> : <VolumeX size={13} />}
      <span className="hidden lg:inline">{enabled ? "Audio: ON" : "Audio"}</span>
    </button>
  );
}
