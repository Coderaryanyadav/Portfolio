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
  AlertCircle,
  Calendar,
} from "lucide-react";
import { PERSONAL } from "@/data/personal";
import { sounds } from "@/lib/sound";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sounds.playSuccess();
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit message. Please try again.");
      }
    } catch {
      // Graceful fallback to mailto
      setStatus("error");
      setErrorMessage("Network error. You can also send an email directly using the button above.");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-10 relative overflow-hidden z-20 bg-[#06070d]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>06 — Communication & Inquiry</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white max-w-4xl">
            &ldquo;Have an interesting idea? Let&apos;s build it.&rdquo;
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed">
            I&apos;m always interested in exploring new technologies, solving meaningful problems and collaborating on high-integrity software and systems engineering.
          </p>
        </div>

        {/* Giant Interactive Email Copy CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090b12] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 group">
          <div className="space-y-1.5 min-w-0">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block">
              Direct Contact
            </span>
            <button
              onClick={handleCopyEmail}
              className="text-left group/copy block focus:outline-none"
              title="Click to copy email address"
            >
              <span className="font-heading font-bold text-xl sm:text-3xl lg:text-4xl text-white group-hover/copy:text-cyan-400 transition-colors tracking-tight select-all">
                {PERSONAL.email}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={PERSONAL.calUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all"
            >
              <Calendar size={15} />
              <span>Book 15-Min Chat</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-all border border-white/10"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-cyan-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL.email}?subject=Collaboration%20Inquiry&body=Hi%20Aryan,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding...`}
              onClick={() => sounds.playClick()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs font-semibold transition-all"
            >
              <Mail size={15} className="text-cyan-400" />
              <span>Compose Email</span>
            </a>
          </div>
        </div>

        {/* Grid: Form + Verified Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Form Wired to Backend Route */}
          <div className="lg:col-span-7 bg-[#090b12] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-heading font-bold text-xl text-white">
                Send a Direct Message
              </h3>
              <span className="font-mono text-xs text-zinc-500">Live Endpoint</span>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400">
                  <Check size={24} />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">Transmission Successful</h4>
                <p className="text-xs font-mono text-zinc-300">
                  Thank you! Your inquiry was logged and I will review it promptly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-xs text-cyan-400 underline pt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs font-mono">
                    <AlertCircle size={15} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-zinc-400">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-500/60 focus:outline-none text-sm text-white font-sans transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-500/60 focus:outline-none text-sm text-white font-sans transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-500/60 focus:outline-none text-sm text-white font-sans transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-400 hover:text-black border border-cyan-500/40 text-cyan-300 font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span>Transmitting Message...</span>
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
            <div className="p-8 rounded-3xl bg-[#090b12] border border-white/10 space-y-6">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block border-b border-white/5 pb-4">
                Verified Profiles
              </span>

              <div className="space-y-4">
                {/* 1-Click 15-Minute Intro Call (Cal.com) */}
                <a
                  href={PERSONAL.calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center justify-between p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 group transition-all shadow-[0_0_25px_rgba(0,210,255,0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <span>Schedule 15-Min Intro Call</span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                          CAL.COM
                        </span>
                      </h4>
                      <span className="font-mono text-xs text-zinc-400">Recruiter, Internship &amp; Engineering Chat</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* GitHub */}
                <a
                  href={PERSONAL.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-cyan-400 transition-colors">
                      <Github size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                        GitHub Profile
                      </h4>
                      <span className="font-mono text-xs text-zinc-400">@{PERSONAL.handle}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-cyan-400 transition-colors">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                        LinkedIn
                      </h4>
                      <span className="font-mono text-xs text-zinc-400">aryanjyadav</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

              <div className="pt-4 border-t border-white/5 text-xs font-mono text-zinc-500 space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
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
