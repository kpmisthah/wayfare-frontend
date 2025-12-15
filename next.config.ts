import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // Enable standalone output for optimized Docker production builds
  output: 'standalone',
};

export default nextConfig;
