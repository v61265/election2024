import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';

const LandingWrapper = styled.section`
  width: fit-content:
  margin: 0 auto;
  padding: 0 12px;
  background: ${color.background};
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 120%;
  padding-top: 26px;
  ${breakpoint.md} {
    padding-top: 38px;
    font-size: 32px;
  }
`;

const MobileBreak = styled.br`
  ${breakpoint.md} {
    display: none;
  }
`;

const Description = styled.p`
  color: #9f9f9f;
  text-align: center;
  font-size: 12px;
  line-height: 130%;
  margin-top: 12px;
  ${breakpoint.md} {
    margin-top: 20px;
    font-size: 12px;
  }
`;

const DescItem = styled.span`
  display: block;
  ${breakpoint.md} {
    display: inline;
    & + & {
      margin-left: 6px;
      padding-left: 6px;
      border-left: 1px solid #9f9f9f;
    }
  }
`;

export default function Landing({
  updateTime,
}: {
  updateTime: string;
}): JSX.Element {
  return (
    <LandingWrapper>
      <Title>
        2024 年中華民國總統及立法委員
        <MobileBreak />
        選舉開票專區
      </Title>
      <Description>
        <DescItem>資料來源：中央選舉委員會</DescItem>
        <DescItem>
          最後更新時間：
          {dayjs(updateTime).format('YYYY年MM月DD日 HH:mm:ss')}
        </DescItem>
      </Description>
    </LandingWrapper>
  );
}
