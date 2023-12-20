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

const SubTypeItem = styled.button<{ isActive: boolean }>`
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
  }
  &:hover {
    background: #73a4ea;
    color: #f4f5f6;
  }
  & + & {
    margin-left: 20px;
    ${breakpoint.md} {
      margin-left: 12px;
    }
  }
  ${({ isActive }) =>
    isActive &&
    `
    color: #fff;
    background: #014DB8;
  `}
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
      {subTypeMapping.map((item) => (
        <SubTypeItem
          key={item.name}
          onClick={() => setSubType(item.name)}
          isActive={subType === item.name}
        >
          {item.title}
        </SubTypeItem>
      ))}
    </Wrapper>
  );
}
