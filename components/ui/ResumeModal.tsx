"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, FileText, Download } from "lucide-react";
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
              <a
                href="/resume.pdf"
                download="Aryan_Yadav_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono transition-all font-bold shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                title="Download Aryan's Resume (PDF)"
              >
                <Download size={13} />
                <span>Download PDF</span>
              </a>

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

            {/* Technical Skills */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Programming</span>
                  <p className="text-zinc-300">Python • Java • C • C++ • JavaScript • TypeScript • HTML • CSS</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Data &amp; Storage</span>
                  <p className="text-zinc-300">SQLite • PostgreSQL • MySQL • Supabase • SQLAlchemy</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Specialist Topics</span>
                  <p className="text-zinc-300">Local LLM Workflows • RAG Concepts • Document Processing • Solidity</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Web &amp; Backend</span>
                  <p className="text-zinc-300">React • Next.js • FastAPI • REST APIs • WebSockets</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 sm:col-span-2">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Developer Tools</span>
                  <p className="text-zinc-300">Git • GitHub • Docker • Linux Fundamentals • pytest • Playwright</p>
                </div>
              </div>
            </div>

            {/* Core Engineering Projects */}
            <div className="space-y-4">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Engineering Projects
              </h2>

              <div className="grid grid-cols-1 gap-3.5">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">FinAuditPro</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Offline-First Financial Audit &amp; Reconciliation</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Designed an offline-first audit application to help Chartered Accountants manage audit workflows, financial records, and statutory audit processes.</li>
                    <li>Focuses on data privacy by keeping sensitive client information and audit records locally, with features for financial reconciliation and forensic analysis.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">AegisAI</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Offline Legal Assistant &amp; Document Grounding</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Developed an offline legal-assistant concept to help legal professionals search documents and retrieve relevant case information.</li>
                    <li>Uses local AI-based document retrieval to provide context-aware answers with supporting page references.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">ApnaGate</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Smart Society Security &amp; Visitor Platform</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Developed a smart society management application designed to improve residential security and visitor management.</li>
                    <li>Provides visitor tracking, gatekeeper workflows, and real-time notifications to help residents and security staff coordinate access.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">Opskl</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Short-Term Event Work Marketplace</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Designed a two-sided marketplace connecting event organizers with people seeking short-term, paid event work.</li>
                    <li>Helps organizers manage shifts and find workers while giving workers clearer visibility into wages and job opportunities.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">AyurChain</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Blockchain Medicine &amp; Lab Certificate Verification</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Developed a blockchain-based system to help verify Ayurvedic medicine records and laboratory test certificates.</li>
                    <li>Uses blockchain-stored cryptographic hashes to make unauthorized changes to registered records detectable.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">SecureChat</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Encrypted Real-Time Messaging Engine</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Built a real-time messaging application focused on protecting conversations and improving communication privacy.</li>
                    <li>Uses AES-GCM encryption and WebSockets for encrypted message handling and real-time communication.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">FlashFit</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Sportswear Quick-Commerce Platform</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Designed a fashion and sportswear quick-commerce platform focused on product discovery and fast delivery.</li>
                    <li>Built with a modern web architecture to support online shopping, product browsing, and a streamlined customer experience.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-white">Tankr</h3>
                    <span className="font-mono text-[11px] text-zinc-500">Water Logistics &amp; Geospatial Fleet Dispatch</span>
                  </div>
                  <ul className="text-xs text-zinc-300 list-disc list-inside space-y-1 pt-1">
                    <li>Developed a water management and logistics platform focused on coordinating water deliveries and supply operations.</li>
                    <li>Uses geospatial capabilities and real-time dispatch workflows to support delivery coordination and fleet management.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Certifications */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Technical Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {PERSONAL.certifications?.map((cert) => (
                  <div key={cert} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">Diploma in Information Technology</h4>
                    <p className="text-zinc-400 font-mono text-[11px]">Shri Bhagubhai Mafatlal Polytechnic, Mumbai</p>
                  </div>
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 w-fit">
                    2024 – 2027
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">Secondary School Certificate (CBSE)</h4>
                    <p className="text-zinc-400 font-mono text-[11px]">Podar International School</p>
                  </div>
                  <span className="font-mono text-xs text-zinc-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 w-fit">
                    88%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
