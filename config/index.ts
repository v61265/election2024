// 這裡管理的是在 Build 階段就會寫死數值的環境變數。
// .env.local 中的變數，僅能在 sever-side 階段取用。但以 `NEXT_PUBLIC_` 開頭命名者，可在 client-side 階段取用。
const env: string = String(process.env.NEXT_PUBLIC_ENV);

// JSON 設定
const JSON_URL: string =
  process.env.NEXT_PUBLIC_DATA_JSON ||
  'https://v3-statics.mirrormedia.mg/json/forum2023.json';

let protocol = 'http';
let host = 'localhost';
let staticFileDestination: string;
let imagePrefix: string;
let GTM_ID = '';
let SITE_URL = '';
let cmsApiUrl = '';

switch (env) {
  case 'dev':
    protocol = 'https';
    protocol = 'https';
    host = 'dev.mnews.tw';
    staticFileDestination = `${protocol}://${host}/projects/election2024`;

    break;
  case 'staging':
    protocol = 'https';
    GTM_ID = 'GTM-NFH6FDH';
    host = 'staging.mnews.tw';
    staticFileDestination = `${protocol}://${host}/projects/election2024`;
    break;

  case 'prod': {
    protocol = 'https';
    GTM_ID = 'GTM-PK7VRFX';
    host = 'www.mnews.tw';
    staticFileDestination = `${protocol}://${host}/projects/dev-election2024`;
    break;
  }
  default: {
    imagePrefix = '';
    GTM_ID = 'GTM-TVZ26W8';
    staticFileDestination = `${protocol}://${host}:3000`;
    break;
  }
}

export {
  staticFileDestination,
  imagePrefix,
  GTM_ID,
  SITE_URL,
  JSON_URL,
  cmsApiUrl,
  env,
};
