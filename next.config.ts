import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {},
  serverExternalPackages: [
    '@imgly/background-removal-node',
    'sharp',
    'onnxruntime-node'
  ]
};

export default nextConfig;
