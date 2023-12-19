import type { AppProps } from 'next/app';
import { GlobalStyles } from '~/styles/global-style';
import { GTM_ID } from '~/config';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID });
  }, []);
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
