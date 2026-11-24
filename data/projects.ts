export interface Project {
  id: string;
  title: string;
  category: string;
  domain: "ai" | "mobile" | "systems" | "security" | "blockchain" | "fullstack";
  shortDescription: string;
  tagline: string;
  techStack: string[];
  featured: boolean;
  githubUrl: string;
  liveUrl?: string;
  stars?: number;
  year: string;
  accentColor: string;
  caseStudy: {
    overview: string;
    problem: string;
    architecture: string[];
    technicalHighlights: string[];
    securityOrOfflineAspects: string[];
    challengesAndDecisions: string[];
    whatILearned: string[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: "finauditpro",
    title: "FinAuditPro",
    category: "AI / FinTech / Desktop",
    domain: "ai",
    tagline: "Offline-First AI-Assisted Financial Auditing Assistant",
    shortDescription:
      "A standalone, offline-first AI auditing platform engineered specifically for independent Chartered Accountants (CAs) and audit seniors in India, running local rule engines for Income Tax & GST statutory algorithms with zero external data exposure.",
    techStack: ["Python", "Local AI / RAG", "Statutory Algorithms", "Streamlit", "SQLite", "ReportLab"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/FinAuditPro",
    year: "2024",
    accentColor: "#00D2FF",
    caseStudy: {
      overview:
        "FinAuditPro is an air-gapped financial audit companion designed to assist Chartered Accountants in navigating complex Indian compliance frameworks (ICAI standards, Section 43B(h), 269ST cash thresholds, and GSTR-2B vs Books reconciliation) without transmitting sensitive client financials to external cloud LLM providers.",
      problem:
        "Chartered accountants and audit seniors handle confidential client balance sheets, bank records, and ledgers. Sending this proprietary data to public cloud AI APIs violates client confidentiality agreements and ICAI ethical standards. Furthermore, manual verification of thousands of transactional vouchers for statutory violations is prone to fatigue.",
      architecture: [
        "Local Desktop Application: Standalone Python environment with local memory persistence.",
        "Deterministic Statutory Rule Engine: Automated algorithms for checking Section 40A(3), 269ST, TDS defaults, and GST reconciliation discrepancies.",
        "Air-Gapped Embedding & Synthesis: Grounded document retrieval operating strictly on localhost without outbound HTTP connections.",
        "Automated Working Paper Generation: Direct export to standardized PDF/Excel audit working papers with timestamped verification records.",
      ],
      technicalHighlights: [
        "16-module audit workflow covering General Ledger verification, Fixed Assets, Depreciation schedules, and Statutory Compliance.",
        "Deterministic voucher sampling based on monetary unit sampling (MUS) and risk stratification.",
        "Automated cross-referencing between GSTR-2B purchase ledgers and client Tally/Excel trial balances.",
      ],
      securityOrOfflineAspects: [
        "Zero Outbound Network Traffic: Network socket isolation to guarantee zero data leakage.",
        "Local SQLite Database with AES storage encryption options.",
        "Audit Trail Logging: Immutable session logs tracking every voucher query and AI assistant output for regulatory compliance.",
      ],
      challengesAndDecisions: [
        "Challenge: Indian statutory tax calculations change annually with Union Budgets and CBDT circulars.",
        "Decision: Decoupled statutory tax rules into modular, declaratively configured rule tables rather than hardcoding formulas in the core parsing engine.",
        "Challenge: Reconciling disparate ledger export formats (Tally XML, Busy, Excel, CSV).",
        "Decision: Engineered an adaptive schema normalizer that detects column headers and validates debit/credit balance parity automatically.",
      ],
      whatILearned: [
        "Architecting software for regulated industries where compliance and confidentiality take precedence over generic cloud convenience.",
        "Designing deterministic algorithms that work hand-in-hand with probabilistic AI models, ensuring numbers are never hallucinated.",
      ],
    },
  },
  {
    id: "apnagate",
    title: "ApnaGate",
    category: "Mobile Systems / Flutter / Supabase",
    domain: "mobile",
    tagline: "Smart Society & Visitor Gatekeeper Management System",
    shortDescription:
      "A cross-platform smart society visitor management system built with Flutter and Supabase Realtime, featuring digital entry passes, multi-layer push alerts via OneSignal, guard gatekeeper mode, and emergency SOS siren protocols.",
    techStack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "OneSignal", "Hive", "Riverpod"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/ApnaGate",
    year: "2024",
    accentColor: "#3ECF8E",
    caseStudy: {
      overview:
        "ApnaGate transforms residential security and visitor verification for apartment complexes. By providing dedicated interfaces for residents and security guards at the gate, it eliminates paper entry logs and provides real-time access authorization.",
      problem:
        "Traditional society visitor logs are kept in physical paper registers, exposing phone numbers of visitors to anyone at the desk. Furthermore, security guards struggle to verify guest validity during rush hours, and residents often miss intercom phone calls when away.",
      architecture: [
        "Flutter Cross-Platform Client: Single codebase running natively on Android, iOS, and gate tablets.",
        "Supabase Realtime & PostgreSQL: Row Level Security (RLS) policies isolating society tenant records with sub-second WebSocket updates for entry requests.",
        "OneSignal Push Pipeline: Multi-tiered notification delivery with high-priority channels for gate approvals and emergency alerts.",
        "Hive Local Cache: Instant offline access to frequent resident data and pre-authorized guest passes when society Wi-Fi experiences drops.",
      ],
      technicalHighlights: [
        "Sub-second entry approvals with instant push notification action buttons directly on the resident lockscreen.",
        "Digital Pre-Passes: Residents generate QR/alphanumeric guest codes for seamless guard scanning.",
        "Daily Staff & Househelp Tracker: Live entry/exit time-stamping for domestic helpers and maintenance contractors.",
        "Audible Emergency SOS Alarm: Broadcasts high-priority alerts across guards and selected emergency contacts with acoustic sirens.",
      ],
      securityOrOfflineAspects: [
        "PostgreSQL Row Level Security ensures residents can only query visitor records for their specific flat/unit.",
        "Guard Gatekeeper PIN verification preventing unauthorized access to the security terminal.",
        "Offline-resilient queue: Guard check-ins queue locally in Hive storage and auto-sync immediately upon network restoration.",
      ],
      challengesAndDecisions: [
        "Challenge: Guard terminals frequently encounter poor Wi-Fi connectivity at community boundary gates.",
        "Decision: Implemented optimistic UI updates and local Hive caching with transactional reconciliation on reconnect.",
        "Challenge: Sounding emergency alarms reliably even when a resident's phone is in silent or do-not-disturb mode.",
        "Decision: Integrated high-priority FCM notification channels configured with critical audio channel overrides.",
      ],
      whatILearned: [
        "Mastery of real-time reactive architecture using Riverpod and Supabase broadcast streams.",
        "Designing UX for dual user cohorts: tech-savvy residents on modern smartphones vs. security guards operating rugged gatekeeper tablets in bright daylight.",
      ],
    },
  },
  {
    id: "tankr",
    title: "Tankr",
    category: "Logistics / React Native / Spatial GIS",
    domain: "systems",
    tagline: "Urban Water Deficit Logistics & Emergency Dispatch Platform",
    shortDescription:
      "Mission-critical water logistics and emergency dispatch platform calibrated for the Mumbai Metropolitan Region. Combines React Native (Expo SDK 58), strict TypeScript, Supabase, and PostGIS spatial indexing for fair telemetry and route dispatch.",
    techStack: ["React Native", "Expo SDK 58", "TypeScript Strict", "Supabase", "PostGIS", "Mapbox"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/Tankr",
    year: "2024",
    accentColor: "#38BDF8",
    caseStudy: {
      overview:
        "Tankr addresses urban water scarcity crises in high-density metropolitan ecosystems like Mumbai. It provides a structured logistics network connecting commercial housing societies, industrial hubs, and private water tanker operators with fair pricing and GPS dispatch.",
      problem:
        "During summer shortages and municipal supply pipeline bursts, residential societies face emergency water deficits. Private tanker procurement is fragmented, unmetered, plagued by price-gouging, and lacks delivery visibility or estimated time of arrival.",
      architecture: [
        "Expo SDK 58 & React Native 0.88+: High-performance mobile UI with strict TypeScript 6.0 and native map rendering.",
        "PostGIS Spatial Engine: Calculates geographic proximity, delivery radiuses, and nearest tanker fleet allocation using spatial polygon queries.",
        "Supabase Backend: PostgreSQL 15 with automated triggers for delivery status transitions (Requested → Dispatched → In-Transit → Delivered).",
        "CI/CD Pipeline: GitHub Actions workflow running typechecking, linting, and automated unit test verification.",
      ],
      technicalHighlights: [
        "Dynamic Emergency Dispatch Mode: Flags critical hospital and society water shortage requests with priority dispatch queues.",
        "Fair Metering Verification: Digital volume delivery verification preventing tanker capacity under-filling.",
        "Live Telemetry & Driver Route Tracking: Real-time route coordinate streams from driver GPS to customer dashboard.",
      ],
      securityOrOfflineAspects: [
        "Role-Based Separation: Strict boundaries between Customer Discovery, Driver Dispatch, and Admin Operations.",
        "Geofence Verification: Delivery confirmation triggers only when the tanker vehicle enters the target GPS geofence radius.",
      ],
      challengesAndDecisions: [
        "Challenge: Handling erratic GPS drift in high-rise Mumbai urban canyons.",
        "Decision: Applied Kalman filter smoothing on incoming driver coordinates before projecting onto Mapbox navigation polylines.",
        "Challenge: Complex spatial queries slowing down backend response times during peak demand spikes.",
        "Decision: Utilized PostGIS GiST spatial indexing on fleet coordinates, reducing nearest-neighbor lookup times from 420ms to under 18ms.",
      ],
      whatILearned: [
        "Architecting location-aware systems using PostGIS spatial geography primitives.",
        "Handling complex asynchronous state machines in mobile environments where network connectivity fluctuates while driving.",
      ],
    },
  },
  {
    id: "aegisai",
    title: "AegisAI",
    category: "AI / Security / Legal Tech",
    domain: "ai",
    tagline: "Enterprise 100% Offline Legal Assistant & Document Grounding RAG",
    shortDescription:
      "A self-hosted, 100% offline RAG legal assistant for law firms and legal departments. Features document-grounded citation chat, AES-256 local database encryption, eCourts CNR sync, multi-user RBAC with 2FA, and an instant panic button workspace wipe.",
    techStack: ["Python", "Offline RAG", "ChromaDB", "PyOTP (2FA)", "AES-256", "SQLAlchemy", "Tesseract OCR"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/AegisAI",
    year: "2024",
    accentColor: "#A855F7",
    caseStudy: {
      overview:
        "AegisAI is a self-hosted legal intelligence workstation. It equips litigation lawyers with local document retrieval, case analysis, and court schedule synchronization while preserving attorney-client privilege through strict air-gapped security.",
      problem:
        "Law firms operate under stringent ethical and non-disclosure obligations. Uploading sensitive litigation briefs, patent filings, or criminal defense evidence to external AI servers creates unacceptable legal liability and breach of privilege.",
      architecture: [
        "Self-Contained Offline RAG: Local vector database (ChromaDB) powered by pre-bundled embedding weights that require zero external API calls.",
        "High-Performance Ingestion Engine: Multi-threaded OCR pipeline converting scanned court filings into searchable, chunked text.",
        "eCourts CNR Sync Module: Syncs case hearing dates, court benches, and status updates directly via Indian Case Registration Number (CNR).",
        "Cryptographic Security Layer: AES-256 encrypted storage, PyOTP time-based one-time password (TOTP) two-factor authentication, and panic button wipe.",
      ],
      technicalHighlights: [
        "Citation-Aware Legal Q&A: Every AI response includes direct clickable citations referencing the exact page and paragraph of source PDFs.",
        "Panic Button Protocol: Instantly scrubs active database records, purges local vector embeddings, and creates a sealed AES-256 recovery archive.",
        "Multi-User RBAC: Granular access partitions between Senior Partners, Associate Lawyers, and External Paralegals.",
      ],
      securityOrOfflineAspects: [
        "100% Zero-Internet Operation: Tested with network interfaces physically disabled.",
        "Database Indexing & GZIP Compression: Microsecond search retrieval on massive case corpora.",
        "Two-Factor Authentication: Time-based OTP (PyOTP) for all administrative operations.",
      ],
      challengesAndDecisions: [
        "Challenge: Scanned legal briefs in Indian courts often suffer from poor scan quality, skewed pages, and watermarks.",
        "Decision: Implemented image pre-processing steps (adaptive thresholding, deskewing) prior to feeding pages to the OCR engine.",
        "Challenge: Large language models hallucinating non-existent precedents or citing incorrect sections.",
        "Decision: Strictly bound LLM response generation to retrieved context chunks with rigorous fallback prompt engineering.",
      ],
      whatILearned: [
        "Deep understanding of vector mathematics, cosine similarity thresholds, and chunking strategies for dense legal prose.",
        "Implementing security-first software where data destruction protocols (panic wipe) must be cryptographically sound.",
      ],
    },
  },
  {
    id: "opskl",
    title: "Opskl",
    category: "Two-Sided Marketplace / Monorepo",
    domain: "fullstack",
    tagline: "Two-Sided Single-Day Shift Marketplace & Attendance Platform",
    shortDescription:
      "A two-sided shift marketplace connecting event organizers and corporate hosts with flexible shift crew in Mumbai. Features dedicated React Native mobile apps for Workers and Organizers, along with a Next.js 15+ governance admin dashboard.",
    techStack: ["React Native", "Expo Router", "Next.js 15", "TypeScript", "Zod", "Turborepo"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/OpsklTest",
    year: "2024",
    accentColor: "#F59E0B",
    caseStudy: {
      overview:
        "Opskl facilitates flexible hourly and single-day event staffing for catering, security, exhibitions, and production crews. Built as a unified monorepo containing dedicated apps for both sides of the marketplace and an administrative governance platform.",
      problem:
        "Event managers frequently encounter 30-40% last-minute crew no-shows, relying on unvetted WhatsApp groups. Shift workers face delayed wage payments, lack of job clarity, and zero verified work history.",
      architecture: [
        "Monorepo Architecture (Turborepo): Shared `@opskil/shared` package containing domain types, Zod schemas, and currency formatters across all apps.",
        "Opskl Worker App: React Native (Expo Router) application focused on rapid shift discovery, clear hourly wages, and one-tap application.",
        "Opskl Organizer App: Shift creation, applicant vetting, digital roll call, and on-site attendance management.",
        "Opskl Admin Portal: Next.js 15+ dashboard for KYC verification, escrow settlement auditing, and dispute resolution.",
      ],
      technicalHighlights: [
        "Instant Wage Calculator: Computes gross earnings, statutory deductions, and net payout based on hourly shift commitments.",
        "On-Site QR Attendance: Organizers scan worker QR passes for cryptographic clock-in and clock-out timestamping.",
        "Shared Design System: Reusable tokenized UI component library across Worker and Organizer applications.",
      ],
      securityOrOfflineAspects: [
        "Strict Schema Validation: Zod schemas shared across client forms and backend endpoints, eliminating payload mismatches.",
        "Role-Specific Schemes: Custom URL schemes (`opskil-worker://`, `opskil-organizer://`) preventing credential crossover.",
      ],
      challengesAndDecisions: [
        "Challenge: Managing code duplication between two distinct mobile applications with overlapping domain logic.",
        "Decision: Re-architected into a Turborepo monorepo with centralized shared types and design system tokens.",
        "Challenge: Preventing attendance fraud where workers share screenshots of attendance QR codes.",
        "Decision: Implemented dynamic, time-rotating QR tokens backed by device location validation.",
      ],
      whatILearned: [
        "Scaling multi-client monorepo architectures with Expo Router and Turborepo.",
        "Balancing business logic across two competing user incentives in a two-sided marketplace.",
      ],
    },
  },
  {
    id: "ayurchain",
    title: "AyurChain",
    category: "Blockchain / Web3 / Supply Chain",
    domain: "blockchain",
    tagline: "Blockchain-Based Ayurvedic Medicine Storage & Quality Verification",
    shortDescription:
      "A Web2 + Web3 hybrid system recording Ayurvedic medicine quality lab test certificate hashes on an Ethereum-compatible blockchain. Features client-side Web Crypto SHA-256 hashing, smart contracts, and a zero-gas public verification portal.",
    techStack: ["Solidity", "Ethers.js", "Web Crypto API", "PHP (PDO)", "MySQL", "MetaMask"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/Ayurchain",
    year: "2024",
    accentColor: "#10B981",
    caseStudy: {
      overview:
        "AyurChain bridges traditional Ayurvedic pharmaceutical manufacturing with blockchain immutability. By calculating cryptographic hashes of government-approved quality lab certificates, it guarantees that medicine authenticity cannot be altered post-manufacturing.",
      problem:
        "The traditional medicine and herbal supplement supply chain suffers from counterfeit certificates, adulterated botanical ingredients, and expired lab quality reports that are easily manipulated using PDF editing software.",
      architecture: [
        "Hybrid Web2/Web3 Topology: Relational database (MySQL) stores verbose botanical metadata, while the Ethereum blockchain stores immutable cryptographic hashes.",
        "Solidity Smart Contract: Deployed with records mapping batch numbers to SHA-256 certificate hashes, timestamp, and manufacturer wallet address.",
        "Client-Side Web Crypto Hashing: Generates cryptographic hashes directly in the user's browser before file upload, ensuring verifiable provenance.",
        "Public Verification Engine: Zero-gas read-only smart contract queries accessible to any consumer without requiring cryptocurrency or a Web3 wallet.",
      ],
      technicalHighlights: [
        "5-Stage Supply Chain Lifecycle Tracker: Manufactured → Dispatched → Received → Distributed → Sold.",
        "One-Click MetaMask Transaction Signing: Seamless interaction between Web2 dashboard controls and Web3 contract writes via Ethers.js.",
        "Real-Time Analytics Dashboard: Chart.js visualization of batch verification pass rates and supply chain progression.",
      ],
      securityOrOfflineAspects: [
        "Client-Side Hash Calculation: Even if a malicious actor modifies the PDF on the server, the hash will fail validation against the blockchain record.",
        "Read-Only Public Contract Calls: Consumers never pay gas fees to inspect or verify medicine batch authenticity.",
      ],
      challengesAndDecisions: [
        "Challenge: Storing large PDF lab reports on-chain is prohibitively expensive in gas fees.",
        "Decision: Adopted a cryptographic hash pointer architecture: PDFs stay off-chain; only the 64-character SHA-256 hash is anchored on the blockchain.",
        "Challenge: Everyday consumers buying Ayurvedic medicines do not own cryptocurrency or MetaMask wallets.",
        "Decision: Designed the public verification portal to use read-only JSON-RPC provider calls, enabling one-tap QR verification with zero gas requirements.",
      ],
      whatILearned: [
        "Smart contract design patterns in Solidity, gas optimization, and event logging.",
        "Practical integration between legacy Web2 backend architectures (PHP/MySQL) and modern Web3 libraries (Ethers.js).",
      ],
    },
  },
  {
    id: "securechat",
    title: "SecureChat",
    category: "Cybersecurity / WebSockets",
    domain: "security",
    tagline: "End-to-End Encrypted Real-Time Messaging Platform",
    shortDescription:
      "A secure real-time messaging application featuring AES-GCM client-side encryption, WebSocket transport, typing indicators, and account recovery key architectures.",
    techStack: ["Python", "WebSockets", "AES-GCM", "JavaScript", "HTML5", "CSS3"],
    featured: false,
    githubUrl: "https://github.com/Coderaryanyadav/SecureChat",
    year: "2024",
    accentColor: "#EC4899",
    caseStudy: {
      overview: "End-to-end encrypted messaging with zero server-side plaintext storage.",
      problem: "Centralized chat platforms harvest metadata and store communication logs.",
      architecture: ["WebSocket duplex channels with client-side cryptographic message envelope wrappers."],
      technicalHighlights: ["AES-GCM encryption, emergency recovery keys, typing telemetry."],
      securityOrOfflineAspects: ["No plaintext touches the server memory."],
      challengesAndDecisions: ["Managing key rotation and session resumption."],
      whatILearned: ["Cryptographic transport security and real-time state synchronization."],
    },
  },
  {
    id: "csvtomcqapp",
    title: "CsvToMcqApp",
    category: "EdTech / Cross-Platform",
    domain: "mobile",
    tagline: "Cross-Platform MCQ Examination & Certification Simulator",
    shortDescription:
      "Cross-platform examination simulator and test preparation engine for standardized certifications (AWS, CIA, CISA). Features resilient CSV/Excel question bank import and chronological score analytics.",
    techStack: ["Flutter", "Dart", "Local Persistence", "Web / Android / iOS"],
    featured: false,
    githubUrl: "https://github.com/Coderaryanyadav/CsvToMcqApp",
    liveUrl: "https://web-sandy-five-55.vercel.app",
    year: "2024",
    accentColor: "#6366F1",
    caseStudy: {
      overview: "Cross-platform examination simulator with live web and native releases.",
      problem: "Lack of offline, customizable question-bank simulators for engineering certifications.",
      architecture: ["Flutter cross-platform client with resilient CSV parsers."],
      technicalHighlights: ["Timed/untimed test modes, per-option explanations, score analytics."],
      securityOrOfflineAspects: ["Atomic local persistence with zero cloud lock-in."],
      challengesAndDecisions: ["Handling inconsistent CSV delimiters and quote escaping."],
      whatILearned: ["Building high-performance UI across Web and Mobile with Flutter."],
    },
  },
  {
    id: "desilearcode",
    title: "DesiLearCode",
    category: "EdTech Infrastructure",
    domain: "fullstack",
    tagline: "Open Zero-Trust Education Infrastructure",
    shortDescription:
      "An open infrastructure connecting refurbished hardware, engineering mentors, and verified grassroots educational labs across India.",
    techStack: ["TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
    featured: false,
    githubUrl: "https://github.com/Coderaryanyadav/DesiLearCode",
    year: "2024",
    accentColor: "#F97316",
    caseStudy: {
      overview: "Open education infrastructure platform.",
      problem: "Bridging hardware deficits in grassroots engineering communities.",
      architecture: ["Next.js web application with multi-role user workflows."],
      technicalHighlights: ["Refurbished hardware registry, mentorship matching."],
      securityOrOfflineAspects: ["Role-based access verification."],
      challengesAndDecisions: ["Designing zero-trust verification for lab equipment."],
      whatILearned: ["Full-stack system modeling for social impact initiatives."],
    },
  },
  {
    id: "genzthrift",
    title: "GenZThrift",
    category: "E-Commerce Monorepo",
    domain: "fullstack",
    tagline: "Ultra-Fast 60-Minute Delivery E-Commerce Monorepo",
    shortDescription:
      "Modern e-commerce platform built on Turborepo with Next.js, Firebase Firestore & Cloud Functions, delivering real-time interfaces for Customers, Sellers, and Drivers.",
    techStack: ["Next.js", "Firebase", "TypeScript", "Turborepo", "Tailwind CSS"],
    featured: false,
    githubUrl: "https://github.com/Coderaryanyadav/GenZThrift",
    year: "2024",
    accentColor: "#14B8A6",
    caseStudy: {
      overview: "60-minute delivery e-commerce platform monorepo.",
      problem: "Fragmented systems for micro-delivery and vendor stock reconciliation.",
      architecture: ["Turborepo monorepo with 4 targeted applications."],
      technicalHighlights: ["Real-time order state machine, driver dispatch routing."],
      securityOrOfflineAspects: ["Firebase security rules and cloud functions validation."],
      challengesAndDecisions: ["Synchronizing multi-tenant inventory with sub-minute delivery timers."],
      whatILearned: ["Monorepo maintenance and rapid order fulfillment state handling."],
    },
  },
  {
    id: "flashfit",
    title: "FlashFit",
    category: "Quick-Commerce / Turborepo / Logistics",
    domain: "fullstack",
    tagline: "Ultra-Fast 60-Minute Fashion & Activewear Quick-Commerce Platform",
    shortDescription:
      "A 4-application Turborepo monorepo encompassing a customer storefront, admin operations command center, driver dispatch portal, and seller dashboard with sub-minute order fulfillment loops and 50/50 Jest test coverage.",
    techStack: ["Next.js 14", "TypeScript", "Turborepo", "Firebase Firestore", "Tailwind CSS", "Jest"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/FlashFit",
    liveUrl: "https://flash-fit-web-customer.vercel.app",
    year: "2024",
    accentColor: "#F59E0B",
    caseStudy: {
      overview:
        "FlashFit is an ultra-fast quick-commerce infrastructure designed to deliver activewear and fashion essentials within 60 minutes. Built as a high-velocity Turborepo monorepo, it connects customer orders directly with warehouse picking stations and hyper-local delivery partners.",
      problem:
        "Traditional e-commerce platforms struggle with sub-hour delivery logistics due to decoupled databases, latency in rider notification, and mismatched inventory between offline stores and customer apps.",
      architecture: [
        "Turborepo Monorepo Architecture: Centralized workspace coordinating Customer Web App, Admin Operations Panel, and Driver Partner Portal.",
        "Event-Driven Order State Machine: Sub-second synchronization across Firestore listeners when an order progresses from Placed → Packed → In-Transit → Delivered.",
        "Shared Core Package: Common TypeScript interfaces, validation schemas, and calculation engines shared across all 4 applications.",
        "Rigorous Test Harness: 50 passing unit and integration tests covering cart calculations, inventory locks, and dispatch handlers.",
      ],
      technicalHighlights: [
        "Multi-app Turborepo build caching cutting CI times by 65%.",
        "Reactive driver routing with automated pickup assignment.",
        "Optimistic UI updates for high-conversion instant checkouts.",
      ],
      securityOrOfflineAspects: [
        "Granular Firebase security rules enforcing tenant-level access per role.",
        "Server-side order total recalculation preventing price tampering.",
      ],
      challengesAndDecisions: [
        "Managing synchronized stock depletion during flash sale events without duplicate bookings.",
        "Architecting isolated web apps that seamlessly consume shared UI tokens and data contracts.",
      ],
      whatILearned: [
        "Turborepo dependency graph optimization, complex distributed state machines, and building mission-critical quick-commerce workflows.",
      ],
    },
  },
  {
    id: "marketmindai",
    title: "MarketMindAI",
    category: "Quantitative Finance / Algorithmic Trading",
    domain: "ai",
    tagline: "Institutional Quantitative Market Intelligence Desk for NSE India",
    shortDescription:
      "Production-grade quantitative analytics and algorithmic trading intelligence desk built for the Indian Equity Market (NSE), running multi-broker feeds, physical OHLC validation, Wilson score probabilities, and statutory STT cost modeling.",
    techStack: ["Python 3.12", "FastAPI", "React 18", "TypeScript", "Tailwind CSS", "NumPy", "Pandas"],
    featured: true,
    githubUrl: "https://github.com/Coderaryanyadav/MarketMindAI",
    liveUrl: "https://frontend-self-two-64.vercel.app",
    year: "2024",
    accentColor: "#06B6D4",
    caseStudy: {
      overview:
        "MarketMindAI is an institutional-grade quantitative trading and analytics platform purpose-built for the National Stock Exchange of India (NSE). It computes high-probability trading signals using rigorous statistical models, physical tick validation, and statutory expense simulation.",
      problem:
        "Retail and proprietary traders often rely on ungrounded technical indicators that fail in live markets due to slippage, unvalidated candle formation, and statutory tax leakage (Securities Transaction Tax, GST, Exchange turnover fees).",
      architecture: [
        "FastAPI Asynchronous Engine: High-throughput Python 3.12 microservice computing multi-timeframe OHLC indicators.",
        "Statistical Quantitative Models: Wilson score interval probability estimation, volume profile distribution, and volatility surface modeling.",
        "Real-Time NSE Data Pipeline: Multi-broker WebSocket adapters with automatic failover and tick sanity filtering.",
        "Full Statutory Ledger: Real-time simulation of STT, SEBI turnover charges, GST, and stamp duty directly in the P&L calculation.",
      ],
      technicalHighlights: [
        "Sub-15ms statistical probability generation on high-volume indices.",
        "Physical candlestick validation eliminating false breakouts from synthetic spikes.",
        "23 unit and integration test suites validating execution accuracy.",
      ],
      securityOrOfflineAspects: [
        "Strict API token isolation for broker credentials using environment encryption.",
        "Zero storage of client broker passwords or private keys.",
      ],
      challengesAndDecisions: [
        "Mitigating tick lag during high-volatility market open spikes without locking the UI event loop.",
        "Balancing mathematical precision in floating-point trade calculations with sub-second rendering.",
      ],
      whatILearned: [
        "Quantitative market microstructures, high-performance asynchronous Python systems, and real-time financial data visualization.",
      ],
    },
  },
  {
    id: "lostandfound",
    title: "LostAndFound",
    category: "Campus Systems / Flask",
    domain: "systems",
    tagline: "College Campus Item Recovery & Management System",
    shortDescription:
      "A web-based lost and found item management system for colleges built with Flask, SQLite, and an intuitive dark-themed responsive UI.",
    techStack: ["Python", "Flask", "SQLite", "HTML5", "CSS3"],
    featured: false,
    githubUrl: "https://github.com/Coderaryanyadav/LostAndFound",
    year: "2023",
    accentColor: "#64748B",
    caseStudy: {
      overview: "College lost and found management platform.",
      problem: "Inquiry delays and lost property tracking across university departments.",
      architecture: ["Python Flask MVC architecture with SQLite backing."],
      technicalHighlights: ["Claim verification, status logs, search filters."],
      securityOrOfflineAspects: ["Admin authentication and verified student claims."],
      challengesAndDecisions: ["Preventing false claim submissions."],
      whatILearned: ["Backend fundamentals, session handling, and relational query design."],
    },
  },
  {
    id: "sgengineering",
    title: "SgEngineering",
    category: "Industrial Web / Live",
    domain: "systems",
    tagline: "Corporate Portal for Heavy Industrial Lifting Solutions",
    shortDescription:
      "Official website for SG Engineering, an ISO 9001:2015 certified industrial crane and lifting solutions manufacturer based in MIDC Ambernath, Maharashtra.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    featured: false,
    githubUrl: "https://github.com/Coderaryanyadav/SgEngineering",
    liveUrl: "http://sgengineering.info",
    year: "2023",
    accentColor: "#EAB308",
    caseStudy: {
      overview: "Corporate web presence for heavy engineering manufacturer.",
      problem: "Showcasing industrial crane specifications and ISO-compliant engineering facilities.",
      architecture: ["High-speed static architecture optimized for global client inquiries."],
      technicalHighlights: ["Interactive product catalogs, inquiry routing."],
      securityOrOfflineAspects: ["Sanitized lead collection forms."],
      challengesAndDecisions: ["Fast loading times on mobile devices for factory site visits."],
      whatILearned: ["Client-facing deliverables and brand-aligned engineering presentation."],
    },
  },
];
