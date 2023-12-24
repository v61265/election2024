import React from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';
import { subTypeMapping, SubType } from '~/constants';

const Wrapper = styled.div`
  padding-top: 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  ${breakpoint.md} {
    padding-top: 44px;
  }
`;

const SubTypeItemWrapper = styled.div`
  width: calc(50% - 10px);
  display: flex;
  justify-content: flex-end;
  &:nth-child(2n) {
    margin-left: 20px;
    justify-content: flex-start;
  }
  &:nth-child(5) {
    justify-content: center;
  }

  ${breakpoint.md} {
    display: block;
    width: fit-content;
    &:nth-child(2n) {
      margin-left: 0;
    }
    & + & {
      margin-left: 12px;
    }
  }
`;

const SubTypeItem = styled.button<{ isactive: string }>`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 180%;
  padding: 1.5px 8px;
  border: 2px solid #000;
  transition: 0.5s;
  margin-top: 20px;
  min-width: fit-content;
  ${breakpoint.md} {
    font-size: 18px;
    margin-top: 0;
    padding: 8px 17.5px;
  }
  &:hover {
    background: #73a4ea;
    color: #f4f5f6;
  }

  ${({ isactive }) =>
    isactive === 'true' &&
    `
    color: #fff;
    background: #014DB8;
  `}
`;

const MobileBr = styled.div`
  width: 100vw;
  height: 0;
  ${breakpoint.md} {
    display: none;
  }
`;

interface SubTypeSelectorProps {
  subType: SubType;
  setSubType: (newSubType: SubType) => void;
}

export default function subTypeSelector({
  subType = 'president',
  setSubType,
}: SubTypeSelectorProps): JSX.Element {
  return (
    <Wrapper>
      {subTypeMapping.map((item, index) => (
        <SubTypeItemWrapper key={item.name}>
          <SubTypeItem
            onClick={() => setSubType(item.name)}
            isactive={(subType === item.name).toString()}
          >
            {item.title}
          </SubTypeItem>
        </SubTypeItemWrapper>
      ))}
    </Wrapper>
  );
}
