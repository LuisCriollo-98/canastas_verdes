import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.DOMAIN!
      },
    ],
    //Para permitir imagenes locales
    unoptimized: true
  }
};

export default nextConfig;
