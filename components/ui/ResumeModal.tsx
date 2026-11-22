"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, CheckCircle2, FileText, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "@/data/personal";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0e14] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07080d]">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-cyan-400" />
              <span className="font-mono text-xs text-zinc-300 font-bold uppercase tracking-wider">
                Aryan Yadav — Curriculum Vitae
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono transition-colors"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div data-lenis-prevent="true" className="p-8 sm:p-10 overflow-y-auto space-y-8 font-sans text-zinc-200">
            {/* Top Identity */}
            <div className="border-b border-white/10 pb-6 space-y-2">
              <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight">
                Aryan Yadav
              </h1>
              <p className="font-mono text-xs text-cyan-400">
                Software Engineer • Full-Stack & Offline-First AI • Mobile Systems
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-1">
                <span>Mumbai, Maharashtra, India</span>
                <span>•</span>
                <a href={`mailto:${PERSONAL.email}`} className="hover:text-cyan-400 underline">
                  {PERSONAL.email}
                </a>
                <span>•</span>
                <a href={PERSONAL.links.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 underline">
                  github.com/{PERSONAL.handle}
                </a>
                <span>•</span>
                <a href={PERSONAL.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 underline">
                  linkedin.com/in/aryanjyadav
                </a>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-2">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Profile Summary
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {PERSONAL.aboutDetailed}
              </p>
            </div>

            {/* Core Flagship Systems */}
            <div className="space-y-4">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Featured Engineering Systems
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">FinAuditPro — Offline AI Audit Assistant</h3>
                    <span className="font-mono text-xs text-zinc-500">Python • Local RAG • Statutory Rules</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Engineered standalone offline auditing desktop assistant for Indian Chartered Accountants. Implemented Section 43B(h) and 269ST statutory tax calculation engines and local RAG document search with 0% cloud data exposure.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">ApnaGate — Society Visitor Management</h3>
                    <span className="font-mono text-xs text-zinc-500">Flutter • Supabase • OneSignal • Hive</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Built multi-platform visitor gatekeeper platform with sub-second approval notifications, acoustic emergency SOS sirens, and Hive local persistence for offline-resilient gate security terminals.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">Tankr — Urban Water Deficit Logistics</h3>
                    <span className="font-mono text-xs text-zinc-500">React Native • Expo 58 • PostGIS • Supabase</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Architected mission-critical emergency water dispatch system for Mumbai Metro. Integrated PostGIS GiST spatial indexing for nearest-neighbor tanker dispatch and real-time GPS telemetry smoothing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">AegisAI — Enterprise Legal RAG Assistant</h3>
                    <span className="font-mono text-xs text-zinc-500">Python • ChromaDB • AES-256 • PyOTP</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Developed 100% offline document intelligence workstation with citation-grounded PDF query responses, eCourts CNR sync, multi-user RBAC with 2FA, and cryptographically verified panic wipe protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Technical Toolkit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div><strong className="text-white">Languages:</strong> Python, TypeScript, Dart, JavaScript, PHP, SQL</div>
                <div><strong className="text-white">Frameworks:</strong> React, Next.js, Flutter, React Native (Expo Router)</div>
                <div><strong className="text-white">Databases:</strong> PostgreSQL, PostGIS Spatial, Supabase, MySQL, SQLite</div>
                <div><strong className="text-white">Security & AI:</strong> Offline RAG, ChromaDB, AES-GCM, Solidity, Web Crypto</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
