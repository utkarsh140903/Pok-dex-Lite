import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  // Fix workspace root issue
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;
