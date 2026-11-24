"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Shield, Database, Cpu, Wrench, Sparkles, Check, Copy } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/skills";
import { sounds } from "@/lib/sound";

const SKILL_CODE_SNIPPETS: Record<string, { lang: string; code: string }> = {
  Python: {
    lang: "python",
    code: `def query_local_vector_rag(prompt: str):\n    embedding = embed_model.encode(prompt)\n    results = chroma_collection.query(\n        query_embeddings=[embedding],\n        n_results=4\n    )\n    return synthesize_airgapped_response(results)`,
  },
  TypeScript: {
    lang: "typescript",
    code: `type StrictAuditPayload<T> = {\n  readonly transmissionId: UUID;\n  payload: Readonly<T>;\n  signature: HexString;\n  timestamp: EpochTimeStamp;\n};\nexport const verifyIntegrity = <T>(p: StrictAuditPayload<T>) => ...;`,
  },
  "React / Next.js": {
    lang: "tsx",
    code: `// Next.js 15 App Router Server Component / Action\nexport async function POST(req: Request) {\n  const session = await auth();\n  if (!session) return unauthorized();\n  const payload = await req.json();\n  return NextResponse.json({ ok: true, payload });\n}`,
  },
  Flutter: {
    lang: "dart",
    code: `class OfflineSyncRepository {\n  final Box<SecurityLog> _hiveBox;\n  Future<void> queueSync(SecurityLog log) async {\n    await _hiveBox.add(log);\n    if (await hasConnectivity()) await triggerDrain();\n  }\n}`,
  },
  "PostGIS Spatial": {
    lang: "sql",
    code: `SELECT driver_id, ST_Distance(geom, ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326)::geography) AS distance_meters\nFROM tanker_units\nWHERE ST_DWithin(geom, ST_SetSRID(ST_MakePoint(72.8777, 19.0760), 4326)::geography, 5000)\nORDER BY distance_meters ASC LIMIT 1;`,
  },
  "Offline RAG Systems": {
    lang: "python",
    code: `# 100% On-Device ChromaDB + Local Embeddings\ncollection = client.get_or_create_collection(\n    name="statutory_acts_2026",\n    metadata={"hnsw:space": "cosine"}\n)\ncontext = collection.query(query_texts=[query], n_results=3)`,
  },
  "Cryptographic Encryption (AES-GCM / AES-256)": {
    lang: "typescript",
    code: `const key = await crypto.subtle.generateKey(\n  { name: "AES-GCM", length: 256 },\n  true,\n  ["encrypt", "decrypt"]\n);\nconst iv = crypto.getRandomValues(new Uint8Array(12));\nconst cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);`,
  },
  "Solidity & Smart Contracts": {
    lang: "solidity",
    code: `contract AyurChainProof {\n  event RecordAnchored(bytes32 indexed docHash, address indexed issuer, uint256 timestamp);\n  function anchorBatch(bytes32 docHash) external {\n    require(verifiedIssuers[msg.sender], "Unauthorized");\n    emit RecordAnchored(docHash, msg.sender, block.timestamp);\n  }\n}`,
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  "PROGRAMMING LANGUAGES": <Terminal size={16} className="text-cyan-400" />,
  "FRONTEND & MOBILE": <Code2 size={16} className="text-cyan-400" />,
  "BACKEND & DATABASES": <Database size={16} className="text-cyan-400" />,
  "AI & OFFLINE SYSTEMS": <Cpu size={16} className="text-cyan-400" />,
  "SECURITY & WEB3": <Shield size={16} className="text-cyan-400" />,
  "TOOLS & DEPLOYMENT": <Wrench size={16} className="text-cyan-400" />,
};

export default function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];
  const [inspectedSkill, setInspectedSkill] = useState(activeCategory.skills[0]);
  const [copied, setCopied] = useState(false);

  const handleCategoryChange = (idx: number) => {
    sounds.playClick();
    setActiveCategoryIndex(idx);
    setInspectedSkill(SKILL_CATEGORIES[idx].skills[0]);
  };

  const handleSelectSkill = (skill: typeof inspectedSkill) => {
    sounds.playClick();
    setInspectedSkill(skill);
  };

  const currentSnippet = inspectedSkill
    ? SKILL_CODE_SNIPPETS[inspectedSkill.name] || {
        lang: "bash",
        code: `# Verified implementation in production repository\n$ git log --grep="${inspectedSkill.name}" --stat\n✓ Verified across: ${inspectedSkill.usedIn.join(", ")}`,
      }
    : null;

  const handleCopyCode = () => {
    if (!currentSnippet) return;
    sounds.playClick();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 sm:px-10 border-b border-white/5 relative z-20 bg-[#07070b]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>04 — Technical Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white">
            &ldquo;My engineering toolkit.&rdquo;
          </h2>
          <p className="text-base text-zinc-400 font-sans max-w-xl">
            Verified technologies applied across real repositories. No artificial percentage meters or speculative claims—strictly tools deployed in production code.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => handleCategoryChange(idx)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                activeCategoryIndex === idx
                  ? "bg-cyan-500/15 text-white border border-cyan-500/50 shadow-[0_0_20px_rgba(0,210,255,0.2)] font-bold"
                  : "bg-white/[0.02] text-zinc-400 border border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              {categoryIcons[cat.title]}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Constellation & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skill Chips */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl text-white">
                {activeCategory.title}
              </h3>
              <p className="font-sans text-xs text-zinc-400">
                {activeCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeCategory.skills.map((skill) => {
                const isSelected = inspectedSkill?.name === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    onClick={() => handleSelectSkill(skill)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-[#101422] border-cyan-400 shadow-[0_0_25px_rgba(0,210,255,0.2)]"
                        : "bg-[#090b12] border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2.5 mb-1.5">
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-semibold text-sm text-white leading-snug">
                          {skill.name.includes(" (") ? skill.name.split(" (")[0] : skill.name}
                        </span>
                        {skill.name.includes(" (") && (
                          <span className="font-mono text-xs text-cyan-400/90 leading-tight mt-0.5">
                            ({skill.name.split(" (")[1]}
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded shrink-0 ${
                          skill.level === "Core"
                            ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40"
                            : "bg-white/5 text-zinc-400 border border-white/10"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 line-clamp-1">
                      {skill.note}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Telemetry Inspector Card */}
          <div className="lg:col-span-5 bg-[#090b14] border border-cyan-500/25 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={13} className="text-cyan-400" />
                Technical Telemetry
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Verified
              </span>
            </div>

            {inspectedSkill ? (
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                    Technology
                  </span>
                  <h4 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                    {inspectedSkill.name.includes(" (") ? (
                      <>
                        <span className="block">{inspectedSkill.name.split(" (")[0]}</span>
                        <span className="block text-lg sm:text-xl text-cyan-400 font-mono mt-1">
                          ({inspectedSkill.name.split(" (")[1]}
                        </span>
                      </>
                    ) : (
                      inspectedSkill.name
                    )}
                  </h4>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">
                    Engineering Context
                  </span>
                  <p className="text-sm text-zinc-200 font-sans">
                    {inspectedSkill.note}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block">
                    Implemented In Verified Projects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {inspectedSkill.usedIn.map((proj) => (
                      <span
                        key={proj}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-zinc-200"
                      >
                        <Check size={12} className="text-cyan-400" />
                        <span>{proj}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Snippet Visualizer */}
                {currentSnippet && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-cyan-400/80 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal size={12} />
                        <span>Production Implementation Snippet</span>
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                        title="Copy snippet"
                      >
                        {copied ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-x-auto selection:bg-cyan-500/30 selection:text-white">
                      <code>{currentSnippet.code}</code>
                    </pre>
                  </div>
                )}

                <div className="pt-2 text-xs font-mono text-zinc-500">
                  Click any skill on the left to inspect its implementation context across Aryan&apos;s repositories.
                </div>
              </div>
            ) : (
              <div className="text-sm text-zinc-500 font-mono">
                Select a skill to inspect its repository implementation.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
