/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['cheerio', '@prisma/client'],
  },
};

export default nextConfig;
