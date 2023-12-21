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

const SubTypeItemWrapper = styled.div``;

const SubTypeItem = styled.button<{ active: boolean }>`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 180%;
  padding: 1.5px 8px;
  border: 2px solid #000;
  transition: 0.5s;
  margin-top: 20px;
  ${breakpoint.md} {
    font-size: 18px;
    margin-top: 0;
    padding: 8px 17.5px;
    margin-left: 12px;
  }
  &:hover {
    background: #73a4ea;
    color: #f4f5f6;
  }


  ${({ active }) =>
    active &&
    `
    color: #fff;
    background: #014DB8;
  `}

  & + & {
    margin-left: 20px;
    ${breakpoint.md} {
      margin-left: 12px
  }
  &:first-child {
    margin: 0;
  }
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
            active={subType === item.name}
          >
            {item.title}
          </SubTypeItem>
          {index % 2 !== 0 && <MobileBr key={item.name} />}
        </SubTypeItemWrapper>
      ))}
    </Wrapper>
  );
}
