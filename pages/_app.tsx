import type { AppProps } from 'next/app';
import { GlobalStyles } from '~/styles/global-style';
import { GTM_ID } from '~/config';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
// import { Noto_Sans_TC } from 'next/font/google';

// const notoSansTC = Noto_Sans_TC({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['cyrillic', 'latin', 'latin-ext', 'vietnamese'],
// });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID });
  }, []);
  return (
    // <main className={notoSansTC.className}>
    <main>
      <GlobalStyles />
      <Component {...pageProps} />
    </main>
  );
}
