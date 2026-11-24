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
        source: "/Resume.pdf",
        destination: "/Aryan_Yadav_Resume.pdf",
      },
      {
        source: "/resume.pdf",
        destination: "/Aryan_Yadav_Resume.pdf",
      },
    ];
  },
};

export default nextConfig;
