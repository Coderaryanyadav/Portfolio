export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: "Core" | "Advanced" | "Hands-on";
    note: string;
    usedIn: string[];
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "PROGRAMMING LANGUAGES",
    description: "Core languages applied across production scripts, mobile frameworks, and backend servers.",
    skills: [
      { name: "Python", level: "Core", note: "Offline RAG, statutory rule engines, OCR, Flask backend", usedIn: ["FinAuditPro", "AegisAI", "LostAndFound", "SecureChat"] },
      { name: "TypeScript", level: "Core", note: "Strict type systems, Next.js 15, React Native Expo", usedIn: ["Tankr", "Opskl", "GenZThrift", "DesiLearCode"] },
      { name: "JavaScript (ES6+)", level: "Core", note: "Async runtimes, DOM manipulation, Web Crypto API", usedIn: ["AyurChain", "SgEngineering", "Temo"] },
      { name: "Dart", level: "Advanced", note: "Flutter state management, cross-platform compilation", usedIn: ["ApnaGate", "CsvToMcqApp"] },
      { name: "PHP", level: "Hands-on", note: "PDO database abstraction, Web2/Web3 bridge", usedIn: ["AyurChain"] },
      { name: "HTML5 & CSS3", level: "Core", note: "Semantic structure, responsive layouts, animations", usedIn: ["All Web Projects"] },
      { name: "SQL", level: "Core", note: "Relational modeling, indexing, spatial queries", usedIn: ["PostgreSQL", "MySQL", "SQLite"] },
    ],
  },
  {
    title: "FRONTEND & MOBILE",
    description: "Multi-platform client development across mobile operating systems and modern web frameworks.",
    skills: [
      { name: "React / Next.js", level: "Core", note: "App Router, SSR, Server Components, Turborepo", usedIn: ["Opskl Admin", "GenZThrift", "DesiLearCode"] },
      { name: "Flutter", level: "Advanced", note: "Cross-platform mobile, Riverpod, Hive offline cache", usedIn: ["ApnaGate", "CsvToMcqApp"] },
      { name: "React Native / Expo", level: "Advanced", note: "Expo Router, SDK 58, geolocation, spatial dispatch", usedIn: ["Tankr", "Opskl Worker", "Opskl Organizer"] },
      { name: "Tailwind CSS", level: "Core", note: "Design tokens, dark mode, high-density layouts", usedIn: ["Opskl", "Personal Portfolio", "DesiLearCode"] },
    ],
  },
  {
    title: "BACKEND & DATABASES",
    description: "Data architectures, relational engines, spatial indexes, and real-time streaming.",
    skills: [
      { name: "Supabase & PostgreSQL", level: "Core", note: "Row Level Security (RLS), Realtime WebSockets", usedIn: ["ApnaGate", "Tankr"] },
      { name: "PostGIS Spatial", level: "Advanced", note: "Geographic radius queries, GiST spatial indexing", usedIn: ["Tankr"] },
      { name: "Flask & Python Backends", level: "Core", note: "REST endpoints, session handling, local desktop servers", usedIn: ["LostAndFound", "FinAuditPro", "AegisAI"] },
      { name: "Firebase", level: "Hands-on", note: "Firestore, Cloud Functions, real-time sync", usedIn: ["GenZThrift", "FlashFit"] },
      { name: "MySQL / MariaDB", level: "Core", note: "Relational schemas, transactions, PDO access", usedIn: ["AyurChain"] },
      { name: "SQLite", level: "Core", note: "Zero-configuration local storage, atomic transactions", usedIn: ["FinAuditPro", "LostAndFound"] },
    ],
  },
  {
    title: "AI & OFFLINE SYSTEMS",
    description: "Air-gapped and local-first intelligent systems designed for complete data privacy.",
    skills: [
      { name: "Offline RAG Systems", level: "Advanced", note: "Local embeddings, vector search, zero external calls", usedIn: ["AegisAI", "FinAuditPro"] },
      { name: "ChromaDB & Vector Stores", level: "Hands-on", note: "Local similarity search, cosine thresholds", usedIn: ["AegisAI"] },
      { name: "Statutory Algorithmic Engines", level: "Advanced", note: "Indian Tax & GST rule verification logic", usedIn: ["FinAuditPro"] },
      { name: "OCR & Document Processing", level: "Hands-on", note: "Tesseract, multi-threaded PDF chunking", usedIn: ["AegisAI"] },
    ],
  },
  {
    title: "SECURITY & WEB3",
    description: "Defensive engineering, cryptographic hashing, access controls, and decentralized verifiability.",
    skills: [
      { name: "Cryptographic Encryption (AES-GCM / AES-256)", level: "Advanced", note: "End-to-end payload encryption & storage sealing", usedIn: ["SecureChat", "AegisAI"] },
      { name: "Client-Side Web Crypto Hashing", level: "Core", note: "SHA-256 digital fingerprinting in the browser", usedIn: ["AyurChain"] },
      { name: "Solidity & Smart Contracts", level: "Hands-on", note: "Immutable records, certificate anchoring, events", usedIn: ["AyurChain"] },
      { name: "Two-Factor Auth (PyOTP) & RBAC", level: "Advanced", note: "Role-based access partitioning & TOTP protocols", usedIn: ["AegisAI"] },
      { name: "WebSockets & Secure Channels", level: "Core", note: "Full-duplex real-time encrypted messaging", usedIn: ["SecureChat"] },
    ],
  },
  {
    title: "TOOLS & DEPLOYMENT",
    description: "Developer tooling, version control, build pipelines, and platforms.",
    skills: [
      { name: "Git & GitHub", level: "Core", note: "Branching workflows, GitHub Actions CI pipelines", usedIn: ["All Projects"] },
      { name: "Turborepo & Monorepos", level: "Advanced", note: "Shared packages, caching, multi-app coordination", usedIn: ["Opskl", "GenZThrift"] },
      { name: "Linux & Terminal", level: "Core", note: "Shell scripting, process management, development envs", usedIn: ["Daily Workflow"] },
      { name: "VS Code & Postman", level: "Core", note: "API design, debugging, testing suites", usedIn: ["Development"] },
      { name: "Vercel", level: "Core", note: "Continuous deployment, preview branches, web hosting", usedIn: ["CsvToMcqApp", "Portfolio"] },
    ],
  },
];
