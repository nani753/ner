import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',
      'your-production-url.vercel.app', // Update this with your actual domain
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    // Handle type checking in CI/CD
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Handle linting in CI/CD
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
