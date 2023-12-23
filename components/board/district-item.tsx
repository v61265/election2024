import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';
import { districtsMapping, District } from '~/constants';

const SubTypeItem = styled.button<{
  isactive: string;
  size: 'all' | 'desktop' | 'mobile';
}>`
  display: block;
  color: #004dbc;
  margin-top: 13px;
  padding: 4px 16px;
  border-radius: 32px;
  border: 1px solid #004dbc;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  transition: 0.5s;
  ${breakpoint.md} {
    font-size: 16px;
    margin-top: 12px;
    padding: 8px 20px;
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

  &:not(:nth-child(3n+1)) {
    margin-left: 16px;
    ${breakpoint.md} {
      margin-left: 0;
    }
  }
  &:not(:nth-child(6n + 1)) {
    ${breakpoint.md} {
      margin-left: 16px;
    }
  }
  ${({ size }) => {
    if (size === 'mobile') {
      return `
      ${breakpoint.xl} {
        display: none;
      }
      `;
    } else if (size === 'desktop') {
      return `
      display: none;
      ${breakpoint.xl} {
        display: block;
      }
      `;
    }
  }}
`;

interface DistrictItemProps {
  size: 'all' | 'desktop' | 'mobile';
  item: { name: string; title: string };
  isActive: boolean;
  onClick: () => void;
}

export default function DistrictItem({
  item,
  size = 'all',
  isActive,
  onClick,
}: DistrictItemProps): JSX.Element {
  return (
    <SubTypeItem
      key={item.name}
      isactive={isActive.toString()}
      size={size}
      onClick={onClick}
    >
      {item.title}
    </SubTypeItem>
  );
}
