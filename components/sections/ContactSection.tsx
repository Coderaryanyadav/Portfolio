"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Github,
  Linkedin,
  Send,
  Sparkles,
} from "lucide-react";
import { PERSONAL } from "@/data/personal";
import Cyber3DCanvas from "./Cyber3DCanvas";
import MagneticButton from "../ui/MagneticButton";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Simulating verified form send
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 3D Visual Canvas Accent */}
        <Cyber3DCanvas />

        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-lime uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-lime" />
            <span>06 — Communication & Inquiry</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white max-w-4xl">
            "Have an interesting idea? Let's build it."
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed">
            I'm always interested in exploring new technologies, solving meaningful problems and collaborating on high-integrity software and systems engineering.
          </p>
        </div>

        {/* Giant Interactive Email Copy CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0d0d12] border border-white/10 hover:border-lime/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
          <div className="space-y-2">
            <span className="font-mono text-xs text-lime uppercase tracking-widest block">
              Direct Contact
            </span>
            <span className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-white group-hover:text-lime transition-colors break-all">
              {PERSONAL.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-all border border-white/10"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-lime" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-lime text-black font-heading font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(198,255,77,0.3)] transition-all"
            >
              <Mail size={16} />
              <span>Compose Email</span>
            </a>
          </div>
        </div>

        {/* Grid: Form + Social Networks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-heading font-bold text-xl text-white">
                Send a Direct Message
              </h3>
              <span className="font-mono text-xs text-zinc-500">Fast Response</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-lime/10 border border-lime/30 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center mx-auto text-lime">
                  <Check size={24} />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">Message Received</h4>
                <p className="text-xs font-mono text-zinc-300">
                  Thank you! I will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-mono text-xs text-lime underline pt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-zinc-400">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-lime/60 focus:outline-none text-sm text-white font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-zinc-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-lime/60 focus:outline-none text-sm text-white font-sans transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-400">Project or Inquiry Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-lime/60 focus:outline-none text-sm text-white font-sans transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-white/10 hover:bg-lime hover:text-black text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Verified Professional Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0b0b0e] border border-white/10 space-y-6">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block border-b border-white/5 pb-4">
                Verified Profiles
              </span>

              <div className="space-y-4">
                {/* GitHub */}
                <a
                  href={PERSONAL.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-lime/40 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-lime transition-colors">
                      <Github size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-lime transition-colors">
                        GitHub Profile
                      </h4>
                      <span className="font-mono text-xs text-zinc-400">@{PERSONAL.handle}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-lime/40 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-lime transition-colors">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-lime transition-colors">
                        LinkedIn
                      </h4>
                      <span className="font-mono text-xs text-zinc-400">aryan-yadav</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

              <div className="pt-4 border-t border-white/5 text-xs font-mono text-zinc-500 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-lime" />
                  <span>Based in Mumbai, Maharashtra, India</span>
                </div>
                <p className="text-zinc-400">
                  Available for software engineering internships, collaborative builds, and technical challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
