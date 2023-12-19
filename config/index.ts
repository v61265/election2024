// 這裡管理的是在 Build 階段就會寫死數值的環境變數。
// .env.local 中的變數，僅能在 sever-side 階段取用。但以 `NEXT_PUBLIC_` 開頭命名者，可在 client-side 階段取用。
const env: string = String(process.env.NEXT_PUBLIC_ENV);
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME);

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

switch (env) {
  case 'dev':
    protocol = 'https';
    GTM_ID = 'GTM-TVZ26W8';

    break;
  case 'staging':
    protocol = 'https';
    GTM_ID = 'GTM-NFH6FDH';
    break;

  case 'prod': {
    protocol = 'https';
    GTM_ID = 'GTM-PK7VRFX';
    break;
  }
  default: {
    staticFileDestination = `${protocol}://${host}:3000`;
    imagePrefix = '';
    GTM_ID = 'GTM-TVZ26W8';

    break;
  }
}

export { staticFileDestination, imagePrefix, GTM_ID, SITE_URL, JSON_URL };
