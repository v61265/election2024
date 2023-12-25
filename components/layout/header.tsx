import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { zIndex, color, breakpoint } from '~/styles/theme';
import { ShareButton } from '@readr-media/share-button';
import logo from '~/public/logo.svg';
import share from '~/public/share.svg';
import useWindowDimensions from '~/hooks/getWindowDimensions';

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${color.background};
  z-index: ${zIndex.header};

  ${breakpoint.md} {
    padding: 12px 12px;
  }

  /* @readr-media/share-button */
  [aria-label='點擊展開社群分享按鈕'] {
    opacity: 0;
  }
  .share-button:first-child {
    width: 24px;
    ${breakpoint.md} {
      width: 40px;
    }
  }

  .logo {
    display: block;
    width: 128px;
    height: 24px;
    position: relative;

    ${breakpoint.md} {
      width: 192px;
      height: 36px;
    }
  }
`;

const Aside = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const CustomImage = styled(Image)`
  position: absolute;
  &:hover {
    cursor: pointer;
  }
`;

export default function Header(): JSX.Element {
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = useMemo(() => windowWidth >= 768, [windowWidth]);
  const handleOnClick = () => {
    const button = document.querySelector('.share-button button');
    if (button instanceof HTMLButtonElement) {
      button.click();
    }
  };
  return (
    <HeaderWrapper>
      <Link
        href='https://www.mnews.tw?utm_source=projects&utm_medium=election2024'
        target='_blank'
        rel='noopener noreferrer nofollow'
        className='logo'
      >
        <Image src={logo} fill={true} alt='鏡電視' />
      </Link>
      <Aside>
        <ShareButton />
        <CustomImage
          alt='share'
          width={isDesktop ? '40' : '24'}
          height={isDesktop ? '40' : '24'}
          src={share}
          onClick={handleOnClick}
        />
      </Aside>
    </HeaderWrapper>
  );
}
