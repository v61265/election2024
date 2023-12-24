import styled from 'styled-components';
import dayjs from 'dayjs';
// @ts-ignore: no definition
import Image from '@readr-media/react-image';
import Link from 'next/link';
import { color, breakpoint } from '~/styles/theme';

const CardWrapper = styled(Link)`
  padding: 0 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  ${breakpoint.md} {
    flex-direction: column;
    width: calc(50% - 20px);
    padding: 0;
    margin-top: 28px;
    align-items: flex-start;
  }
  ${breakpoint.xl} {
    width: calc((100% - 120px) / 4);
    margin-top: 36px;
  }

  &:nth-child(2n) {
    ${breakpoint.md} {
      margin-left: 40px;
    }
    ${breakpoint.xl} {
      margin-left: 0;
    }
  }
  &:not(:nth-child(4n + 1)) {
    ${breakpoint.xl} {
      margin-left: 40px;
    }
  }

  &:hover .news-title {
    text-decoration: underline;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  min-width: 132px;
  width: 132px;
  height: 74px;
  max-height: 74px;
  overflow: hidden;
  margin-right: 12px;
  ${breakpoint.md} {
    width: 100%;
    height: 121px;
    max-height: inherit;
    margin: 0;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  .date {
    color: #004dbc;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 14px;
    ${breakpoint.md} {
      margin-top: 8px;
    }
  }
`;

const TitleWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: #000;
  font-size: 14px;
  font-feature-settings: 'clig' off, 'liga' off;
  overflow: hidden;
  line-height: normal;
  ${breakpoint.md} {
    margin-top: 12px;
    font-size: 16px;
  }
`;

type Tag = {
  id: string;
  name: string;
};
type LatestNewsItem = {
  publishTime: string;
  id: string;
  name: string;
  slug: string;
  tags?: Tag[];
  heroImage: null | HeroImage;
};

type HeroImage = {
  id: string;
  urlMobileSized: string;
  urlOriginal: string;
};
type NewsItemProps = {
  latestNewsItem: LatestNewsItem;
};

export default function NewsItem({
  latestNewsItem,
}: NewsItemProps): JSX.Element {
  const { heroImage } = latestNewsItem;
  const formattedImg = {
    original: heroImage?.urlOriginal,
    w400: heroImage?.urlMobileSized,
  };
  return (
    <CardWrapper
      href={`/story/${latestNewsItem.slug}`}
      target='_blank'
      rel='noreferrer'
      key={latestNewsItem.id}
    >
      <ImgWrapper>
        <Image
          images={formattedImg}
          alt={latestNewsItem?.name}
          loadingImage='https://storage.googleapis.com/static-mnews-tw-dev/projects/dev-election2024/Pulse-1s-200px.svg'
          defaultImage='https://www.mnews.tw/image-default.jpg'
          rwd={{ default: '320px' }}
          objectFit='cover'
        />
      </ImgWrapper>
      <TextWrapper>
        <TitleWrapper className='news-title'>
          {latestNewsItem?.name}
        </TitleWrapper>
        <p className='date'>
          {dayjs(latestNewsItem.publishTime).format('YYYY/MM/DD HH:mm')}
        </p>
      </TextWrapper>
    </CardWrapper>
  );
}
