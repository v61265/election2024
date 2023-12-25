import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { color, breakpoint } from '~/styles/theme';
import fb from '~/public/facebook-logo.svg';
import line from '~/public/line-logo.png';
import whiteLogo from '~/public/logo-white.svg';
import twitter from '~/public/twitter-logo.svg';
import ig from '~/public/instagram-logo.svg';

const FooterTop = styled.section`
  background-color: ${color.blue};
  padding: 20px 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${breakpoint.md} {
    padding: 32px 0;
    padding-left: calc((100vw - 286px) / 2);
    padding-right: calc((100vw - 286px) / 2);
  }
  ${breakpoint.xl} {
    padding: 22px 0 30px 0;
    padding-left: calc((100vw - 1120px) / 2);
    padding-right: calc((100vw - 1120px) / 2);
    flex-direction: row;
    align-items: center;
    position: relative;
  }
`;

const TopLeft = styled.div`
  flex-direction: column;
  align-items: center;
  display: none;
  ${breakpoint.xl} {
    display: flex;
  }
`;

const Logo = styled(Image)`
  display: none;
  ${breakpoint.md} {
    display: block;
  }
`;

const SocialList = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding: 14px 8px;
  }
`;

const TopMiddle = styled.div`
  margin: 20px 0 0 0;
  ${breakpoint.xl} {
    margin: 0 0 0 48px;
    flex: 1;
  }
`;

const InfoWrapper = styled.ul`
  color: white;
  font-size: 14px;
  line-height: 2;
  letter-spacing: 0.5px;
`;

const InfoItem = styled.li`
  display: flex;
  justify-content: center;
  ${breakpoint.xl} {
    justify-content: flex-start;
  }
`;

const TopRight = styled.div`
  padding: 20px 0 0 0;
  color: white;
  font-size: 14px;
  line-height: 2;
  letter-spacing: 0.5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  position: relative;
  margin-top: 20px;
  ${breakpoint.xl} {
    margin: 0;
    padding: 0 0 0 20px;
    border-left: 1px solid white;
    max-width: inherit;
  }

  &::before {
    content: '';
    background: white;
    position: absolute;
    max-width: 254px;
    height: 1px;
    width: 100vw;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    ${breakpoint.xl} {
      display: none;
    }
  }
`;

const MobileIcons = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  ${breakpoint.md} {
    margin-top: 8px;
  }
  ${breakpoint.xl} {
    display: none;
  }
  a {
    padding: 14px 8px;
  }
`;

const FooterBottom = styled.section`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${breakpoint.md} {
    padding: 32px 0;
    padding-left: calc((100vw - 286px) / 2);
    padding-right: calc((100vw - 286px) / 2);
  }
  ${breakpoint.xl} {
    padding: 20px 0;
  }
`;

const Copyright = styled.p`
  color: ${color.blue};
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${breakpoint.xl} {
    color: ${color.blue};
    flex-direction: row;
    span + span {
      margin: 0 0 0 5px;
    }
  }
`;

const YoutubeTos = styled.p`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #4a4a4a;
  padding: 8px 21px 0 21px;
  margin: 0 0 12px;
  a {
    color: ${color.blue};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLink = styled(Link)`
  display: block;
  position: relative;
`;

export default function Header(): JSX.Element {
  const FOOTER_LEFT_LIST: {
    href: string;
    type: string;
    imgSrc: string;
    size: number;
  }[] = [
    {
      href: 'https://www.facebook.com/mnewstw',
      imgSrc: fb,
      type: 'facebook',
      size: 20,
    },
    {
      href: 'https://lin.ee/4XsO8xi',
      imgSrc: line,
      type: 'line',
      size: 22,
    },
    {
      href: 'https://www.instagram.com/mnewstw',
      imgSrc: ig,
      type: 'instagram',
      size: 20,
    },
    {
      href: 'https://twitter.com/mnews_tw',
      imgSrc: twitter,
      type: 'twitter',
      size: 22,
    },
  ];
  const FOOTER_RIGHT_LIST: { href: string; text: string }[] = [
    { href: '/schedule', text: '電視節目表' },
    {
      href: '/story/press-self-regulation',
      text: '新聞自律',
    },
    { href: '/story/channel', text: '頻道位置' },
    { href: '/story/privacy', text: '隱私權政策' },
    { href: '/story/webauthorization', text: '內容授權' },
    {
      href: '/story/announce',
      text: '公告專區',
    },
    { href: '/story/adsales', text: '整合行銷' },
  ];

  return (
    <footer>
      <FooterTop>
        <TopLeft>
          <Logo
            src={whiteLogo}
            className='logo'
            alt='MNews'
            width='150'
            height='28'
          />
          <SocialList>
            {FOOTER_LEFT_LIST.map((social) => {
              return (
                <SocialLink
                  key={social.type}
                  href={social.href}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  <Image
                    src={social.imgSrc}
                    className='social-network-service-img'
                    alt={social.type}
                    width={social.size}
                    height={social.size}
                  />
                </SocialLink>
              );
            })}
          </SocialList>
        </TopLeft>
        <TopMiddle>
          <InfoWrapper>
            <InfoItem>
              <span>客服專線:</span>
              <span>(02)7752-5678</span>
            </InfoItem>
            <InfoItem>
              <span>客服信箱 </span>
              <a href='mailto:mnews.cs@mnews.com.tw'>mnews.cs@mnews.com.tw</a>
            </InfoItem>
          </InfoWrapper>
        </TopMiddle>
        <TopRight>
          {FOOTER_RIGHT_LIST.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                target='_blank'
                rel='noreferrer noopener'
              >
                {item.text}
              </Link>
            );
          })}
        </TopRight>
        <MobileIcons>
          {FOOTER_LEFT_LIST.map((social) => {
            return (
              <SocialLink
                key={social.type}
                href={social.href}
                target='_blank'
                rel='noreferrer noopener'
              >
                <Image
                  className='social-network-service-img'
                  src={social.imgSrc}
                  alt={social.type}
                  width={social.size}
                  height={social.size}
                />
              </SocialLink>
            );
          })}
        </MobileIcons>
      </FooterTop>
      <FooterBottom>
        <Copyright>
          <span>©Mirror TV BROADCASTING LTD.</span>
          <span>All Rights Reserved.</span>
          <span>鏡電視股份有限公司 版權所有</span>
        </Copyright>
        <YoutubeTos>
          本網頁使用
          <Link
            href='https://developers.google.com/youtube/terms/developer-policies#definition-youtube-api-services'
            target='_blank'
            rel='noreferrer noopener'
          >
            YouTube API 服務{' '}
          </Link>
          ，詳見
          <Link
            href='https://www.youtube.com/t/terms'
            target='_blank'
            rel='noreferrer noopener'
          >
            YouTube 服務條款
          </Link>
          、
          <Link
            href='https://policies.google.com/privacy'
            target='_blank'
            rel='noreferrer noopener'
          >
            Google 隱私權與條款
          </Link>
        </YoutubeTos>
      </FooterBottom>
    </footer>
  );
}
