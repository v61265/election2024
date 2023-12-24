import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { breakpoint } from '~/styles/theme';
import { districtsMapping, District } from '~/constants';
import Arrow from '~/public/arrow.svg';
import Image from 'next/image';
import DistrictItem from './district-item';
import DistrictModal from './district-modal';
import useWindowDimensions from '~/hooks/getWindowDimensions';

const Wrapper = styled.div`
  padding-top: 20px;
  ${breakpoint.md} {
    padding-top: 55px;
  }
`;

const SelectorTitle = styled.p`
  color: #0f2d35;
  font-size: 16px;
  font-weight: 700;
  line-height: 130%;
  text-align: center;
  ${breakpoint.md} {
    font-size: 18px;
  }
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 9px;
  max-width: 300px;
  margin: 0 auto;
  ${breakpoint.md} {
    max-width: 700px;
    padding-top: 8px;
  }
`;

const MoreBtn = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  color: #014db8;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  ${breakpoint.md} {
    margin-top: 27px;
  }
  ${breakpoint.xl} {
    display: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const MoreBtnDesktop = styled(MoreBtn)`
  display: none;
  ${breakpoint.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-left: 4px;
      transition: 0.5s;
    }
    &.opened {
      img {
        transform: rotate(180deg);
      }
    }
  }
`;

interface DistrictSelectorProps {
  district: District;
  setDistrict: (newDistrict: District) => void;
}

export default function DistrictSelector({
  district,
  setDistrict,
}: DistrictSelectorProps): JSX.Element {
  const { width: windowWidth } = useWindowDimensions();
  const [isOpenAll, setIsOpenAll] = useState<boolean>(false);
  const isDesktop = useMemo(() => windowWidth >= 1200, [windowWidth]);
  return (
    <Wrapper>
      <SelectorTitle>請選擇縣市</SelectorTitle>
      <SelectorWrapper>
        {districtsMapping.slice(0, 6)?.map((item) => (
          <DistrictItem
            key={item.name}
            onClick={() => {
              setDistrict(item.name);
            }}
            isActive={district === item.name}
            size='all'
            item={item}
          />
        ))}
        {isOpenAll &&
          isDesktop &&
          districtsMapping.slice(6).map((item) => (
            <DistrictItem
              key={item.name}
              onClick={() => {
                setDistrict(item.name);
              }}
              isActive={district === item.name}
              size='desktop'
              item={item}
            />
          ))}
      </SelectorWrapper>
      <MoreBtn onClick={() => setIsOpenAll(!isOpenAll)}>展開所有縣市</MoreBtn>
      <MoreBtnDesktop
        onClick={() => setIsOpenAll(!isOpenAll)}
        className={isOpenAll ? 'opened' : ''}
      >
        {isOpenAll ? '收合所有縣市' : '展開所有縣市'}
        <Image alt='arrow' src={Arrow} width='20' height='20' />
      </MoreBtnDesktop>
      {isOpenAll && !isDesktop && (
        <DistrictModal
          district={district}
          setDistrict={setDistrict}
          onClose={() => {
            setIsOpenAll(false);
          }}
        />
      )}
    </Wrapper>
  );
}
