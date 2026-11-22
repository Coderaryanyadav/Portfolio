export interface JourneyMilestone {
  year: string;
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  keyProjects: string[];
  tags: string[];
}

export const JOURNEY: JourneyMilestone[] = [
  {
    year: "Present",
    stage: "STAGE 05",
    title: "Autonomous & Offline-First Systems",
    subtitle: "Air-gapped intelligence, regulatory compliance & GIS logistics",
    description:
      "Deepened focus on mission-critical applications: developing FinAuditPro to automate statutory audit reconciliations without cloud exposure, building Tankr for Mumbai urban water routing with PostGIS, and refining AegisAI's 100% offline document RAG.",
    keyProjects: ["FinAuditPro", "Tankr", "AegisAI"],
    tags: ["Offline AI", "Spatial GIS", "Statutory Compliance", "PostgreSQL"],
  },
  {
    year: "2024",
    stage: "STAGE 04",
    title: "Mobile Architecture & Decentralized Verification",
    subtitle: "Flutter real-time systems, Expo monorepos & Solidity smart contracts",
    description:
      "Explored cross-platform mobile engineering and blockchain. Built ApnaGate with Supabase Realtime and OneSignal for residential safety, Opskl as a dual-app shift marketplace, and AyurChain anchoring lab certificate hashes on Ethereum.",
    keyProjects: ["ApnaGate", "Opskl", "AyurChain", "CsvToMcqApp"],
    tags: ["Flutter", "React Native", "Solidity", "Supabase", "Turborepo"],
  },
  {
    year: "2023 - 2024",
    stage: "STAGE 03",
    title: "Cybersecurity & Cryptographic Protocols",
    subtitle: "End-to-end encryption, secure chat & role-based authentication",
    description:
      "Delved into computer security principles, WebSockets, and symmetric cipher implementations. Engineered SecureChat utilizing AES-GCM client encryption to ensure zero-knowledge communication pipelines.",
    keyProjects: ["SecureChat", "LostAndFound"],
    tags: ["AES-GCM", "WebSockets", "Information Security", "Flask"],
  },
  {
    year: "2022 - 2023",
    stage: "STAGE 02",
    title: "Web Systems & Full-Stack Fundamentals",
    subtitle: "Relational database modeling, server routing & client delivery",
    description:
      "Transitioned from simple scripts to full-fledged database-driven web applications. Built campus management systems like LostAndFound with Python Flask and production corporate portals like SgEngineering.",
    keyProjects: ["LostAndFound", "SgEngineering"],
    tags: ["Python", "Flask", "SQL", "JavaScript", "Responsive UI"],
  },
  {
    year: "Inception",
    stage: "STAGE 01",
    title: "Engineering Education & First Lines of Code",
    subtitle: "Computer science foundations, algorithm design & terminal curiosity",
    description:
      "Began engineering studies, diving headfirst into data structures, core programming paradigms, and software internals. Fascinated by understanding how software interacts with hardware and operating systems.",
    keyProjects: ["Foundations & Command-Line Utilities"],
    tags: ["Computer Science", "Algorithms", "C / Python", "Data Structures"],
  },
];
