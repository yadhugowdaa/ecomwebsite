/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    CATALOG_API_URL: process.env.NEXT_PUBLIC_CATALOG_API_URL || 'http://localhost:4001',
    ORDER_API_URL: process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:4002',
  },
}

module.exports = nextConfig


