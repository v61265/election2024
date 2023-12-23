import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { cmsApiUrl } from '~/config';
import axios from 'axios';
import NewsItem from './news-item';
import { color, breakpoint } from '~/styles/theme';

const Section = styled.section`
  background: ${color.background};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
  ${breakpoint.md} {
    padding-top: 60px;
    padding-bottom: 250px;
  }
`;

const TitleWrapper = styled.div`
  width: fit-content;
  padding: 2px 10px;
  display: block;
  border: 3px solid;
  margin: 0 auto;
  border-image: linear-gradient(
      to bottom,
      #153047 35%,
      transparent 35%,
      transparent 65%,
      #153047 65%
    )
    5;
  ${breakpoint.md} {
    margin: 0;
  }
`;

const SubTitle = styled.h2`
  display: block;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #153047;
  margin: 0 auto;
  text-align: center;
`;

const Wrapper = styled.div`
  padding: 40px 0;
  overflow: hidden;
`;

const NewsItemsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 472px;
  ${breakpoint.md} {
    padding: 0;
  }
  ${breakpoint.xl} {
    max-width: calc(216px * 4 + 40px * 3);
    justify-content: flex-start;
    padding-top: 4px;
  }
`;

export default function LatestNewsList(): JSX.Element {
  const [latestNews, setLatestNews] = useState([]);
  useEffect(() => {
    axios({
      url: cmsApiUrl,
      method: 'post',
      data: {
        query: `query fetchPostsContainTagIsElection {
          allPosts(
            where: { state: published, tags_some: { name_contains: "2024大選" } }
            sortBy: publishTime_DESC
            first: 20
          ) {
            id
            name
            slug
            publishTime
            heroImage {
              id
              urlOriginal
              urlMobileSized
            }
            tags {
              id
              name
            }
          }
        }               
        `,
      },
    })
      .then(({ data }) => {
        console.log(data);
        return setLatestNews(data.data.allPosts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {latestNews && latestNews.length !== 0 && (
        <Section>
          <Wrapper>
            <TitleWrapper>
              <SubTitle>即時新聞</SubTitle>
            </TitleWrapper>
            <NewsItemsWrapper>
              {latestNews.map((item, index) => (
                <NewsItem key={index} latestNewsItem={item}></NewsItem>
              ))}
            </NewsItemsWrapper>
          </Wrapper>
        </Section>
      )}
    </>
  );
}
