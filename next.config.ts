import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v3.football.api-sports.io",
      },
    ],
  },
};

export default nextConfig;
