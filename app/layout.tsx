import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryan Yadav — Software Engineer & Builder",
  description:
    "Personal portfolio of Aryan Yadav — Information Technology student, full-stack developer, cybersecurity explorer, and AI builder. Crafting offline-first systems, mobile architectures, and practical software.",
  keywords: [
    "Aryan Yadav",
    "Coderaryanyadav",
    "Software Engineer",
    "Full-Stack Developer",
    "Offline AI",
    "Cybersecurity",
    "Flutter",
    "Next.js",
    "Python",
    "Mumbai Developer",
  ],
  authors: [{ name: "Aryan Yadav", url: "https://github.com/Coderaryanyadav" }],
  creator: "Aryan Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryan-yadav-portfolio.vercel.app",
    title: "Aryan Yadav — Software Engineer & Builder",
    description:
      "Engineering ideas into real-world experiences. Full-stack development, offline-first AI, cybersecurity, and systems architecture.",
    siteName: "Aryan Yadav Portfolio",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aryan-yadav-portfolio.vercel.app/#person",
      name: "Aryan Yadav",
      alternateName: "Coderaryanyadav",
      url: "https://aryan-yadav-portfolio.vercel.app",
      sameAs: [
        "https://github.com/Coderaryanyadav",
        "https://linkedin.com/in/aryanjyadav",
      ],
      jobTitle: "Software Engineer",
      knowsAbout: [
        "Full-Stack Web Development",
        "Offline-First Artificial Intelligence",
        "Defensive Cybersecurity",
        "Flutter & React Native",
        "PostGIS & Spatial Logistics",
        "Next.js & TypeScript",
      ],
      description:
        "Software engineer and builder specializing in offline AI, statutory compliance engines, and high-stakes resilient architectures.",
    },
    {
      "@type": "WebSite",
      "@id": "https://aryan-yadav-portfolio.vercel.app/#website",
      url: "https://aryan-yadav-portfolio.vercel.app",
      name: "Aryan Yadav — Portfolio",
      publisher: {
        "@id": "https://aryan-yadav-portfolio.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-zinc-100 min-h-screen selection:bg-cyan-400 selection:text-black antialiased`}
      >
        <div className="fixed inset-0 pointer-events-none noise-overlay z-50 opacity-40" />
        {children}
      </body>
    </html>
  );
}
