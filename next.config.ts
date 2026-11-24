import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/resume.pdf",
        destination: "/Resume.pdf",
      },
      {
        source: "/Aryan_Yadav_Resume.pdf",
        destination: "/Resume.pdf",
      },
    ];
  },
};

export default nextConfig;
