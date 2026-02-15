/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Docker build optimization
  output: 'standalone',

  // Performance optimizations
  swcMinify: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
