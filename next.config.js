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
    assetPrefixPath = '.';
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
  // headers: {
  //   script: [
  //     {
  //       hid: 'comScore',
  //       innerHTML: `
  //         var _comscore = _comscore || [];
  //         _comscore.push({ c1: "2", c2: "35880649" });
  //         (function() {
  //           var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];
  //           s.async = true; s.src = "https://sb.scorecardresearch.com/cs/35880649/beacon.js";
  //           el.parentNode.insertBefore(s, el);
  //         })();
  //       `,
  //     },
  //   ],
  // },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    };
  },
};

module.exports = nextConfig;
