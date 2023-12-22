/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.p12.games' },
      { protocol: 'https', hostname: '**.gpark.io' },
      { protocol: 'https', hostname: '**.jaxine.xyz' },
      { protocol: 'https', hostname: '**.metaworld.fun' },
      { protocol: 'https', hostname: '**.233niu.cn' },
    ],
  },
  reactStrictMode: false,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules = [
      ...config.module.rules.filter((rule) => rule !== fileLoaderRule),
      { ...fileLoaderRule, exclude: /\.svg$/i },
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: {
          ...fileLoaderRule.resourceQuery,
          not: [
            ...fileLoaderRule.resourceQuery.not,
            /component/, // *.svg?component
          ],
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: '@svgr/webpack',
        resourceQuery: /component/, // *.svg?component
      },
    ];
    return config;
  },
};

module.exports = nextConfig;
