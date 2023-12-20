/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  swcMinify: true,
  images: {
    loader: 'custom',
    loaderFile: './loader.ts',
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
