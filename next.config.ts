import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'anskufail.wordpress.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
