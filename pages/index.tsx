import Head from 'next/head';
import { styled } from 'styled-components';
// import { Inter } from 'next/font/google';
import Header from '~/components/layout/header';
import Footer from '~/components/layout/footer';
import LatestNewsList from '~/components/latest-news/latest-news-list';
import Landing from '~/components/landing';
import Board from '~/components/board';
import { useState } from 'react';

const Main = styled.main`
  border: 4px solid #000;
  font-family: Noto Sans TC;
`;

export default function Home() {
  const [updateTime, setUpdateTime] = useState('');
  return (
    <>
      <Head>
        <title>2024 年中華民國總統及立法委員選舉開票專區｜鏡新聞</title>
        <meta
          name='description'
          content='2024 年總統及立法委員選舉即時開票，請持續收看《鏡新聞》為您帶來最快速更新的正副總統、立法委員開票結果'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta
          property='og:image'
          content='https://dev.mnews.tw/projects/dev-election2024/hero-image.png'
        />
        <script
          data-n-head='ssr'
          data-hid='comScore'
          dangerouslySetInnerHTML={{
            __html: `
              var _comscore = _comscore || [];
              _comscore.push({ c1: "2", c2: "35880649" });
              (function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = "https://sb.scorecardresearch.com/cs/35880649/beacon.js";
                el.parentNode.insertBefore(s, el);
              })();
            `,
          }}
        />
      </Head>
      <Main>
        <Header />
        <Landing updateTime={updateTime} />
        <Board updateTime={updateTime} setUpdateTime={setUpdateTime} />
        <LatestNewsList />
        <Footer />
      </Main>
    </>
  );
}
