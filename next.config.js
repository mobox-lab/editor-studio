/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        { protocol: 'https', hostname: 'cdn1.p12.games' },
        { protocol: 'https', hostname: '*.gpark.io' },
    ],
  },
};

module.exports = nextConfig;
