import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
};

module.exports = {
  images: {
    domains: ["cdn.shadcnstudio.com"],
  },
};

export default nextConfig;
