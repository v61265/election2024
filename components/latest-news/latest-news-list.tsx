import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { cmsApiUrl } from '~/config';
import axios from 'axios';
// import NewsItem from './news-item';
import { color, breakpoint } from '~/styles/theme';
const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
  ${breakpoint.md} {
    padding-bottom: 250px;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
  margin: 0;
  ${breakpoint.md} {
    font-size: 32px;
  }
`;

const Wrapper = styled.div`
  width: 92%;
  padding: 40px 0;
  overflow: hidden;
  max-width: 1200px;
  ${breakpoint.xl} {
    width: 95%;
  }
  ${breakpoint.xxl} {
    width: 80%;
  }
`;

const NewsItemsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px 16px;
  justify-content: center;
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
            where: { state: published, tags_some: { name_contains: "九合一選舉" } }
            sortBy: publishTime_DESC
            first: 20
          ) {
            id
            name
            slug
            publishTime
            heroImage {
              id
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
            <SubTitle>即時新聞</SubTitle>
            <NewsItemsWrapper>
              {/* {latestNews.map((item, index) => (
                // <NewsItem key={index} latestNewsItem={item}></NewsItem>
              ))} */}
            </NewsItemsWrapper>
          </Wrapper>
        </Section>
      )}
    </>
  );
}
