/** @type {import('next').NextConfig} */
let assetPrefixPath = '';
switch (process.env.NEXT_PUBLIC_ENV) {
  case 'prod':
    assetPrefixPath = `https://www.mnews.tw/projects/election2024`;
    break;
  case 'dev':
    assetPrefixPath = `https://dev.mnews.tw/projects/dev-election2024`;
    break;
  default:
    assetPrefixPath = 'http://localhost:3000';
    break;
}

const nextConfig = {
  assetPrefix: assetPrefixPath,
  reactStrictMode: true,
  output: 'export',
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    };
  },
};

module.exports = nextConfig;
