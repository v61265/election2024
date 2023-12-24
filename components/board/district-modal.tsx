import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { breakpoint, zIndex } from '~/styles/theme';
import { districtsMapping, District } from '~/constants';
import DistrictItem from '~/components/board/district-item';
import close from '~/public/close.svg';
import Image from 'next/image';

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.66);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  z-index: ${zIndex.coverContent};
  ${breakpoint.md} {
    padding: 38px;
  }
  ${breakpoint.xl} {
    display: none;
  }
`;

const Modal = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 288px;
  border-radius: 4px;
  background: #fff;
  padding: 12px 0;
  ${breakpoint.md} {
    max-width: 688px;
    padding: 20px 0;
  }
`;

const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  ${breakpoint.md} {
    padding: 0 40px;
  }
  img:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  color: #0f2d35;
  font-size: 18px;
  font-weight: 700;
  line-height: 130%;
`;

const ItemsList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 9px;
  margin: 0 auto;
  ${breakpoint.md} {
    padding-top: 8px;
  }
`;

interface DistrictItemProps {
  onClose: () => void;
  district: District;
  setDistrict: (newDistrict: District) => void;
}

export default function DistrictModal({
  onClose,
  district,
  setDistrict,
}: DistrictItemProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOnClickItem = useCallback(
    (itemName: District) => {
      setDistrict(itemName);
    },
    [setDistrict]
  );

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as HTMLDivElement).contains(event.target as Node)
      ) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleOutSideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [ref, onClose]);

  return (
    <Wrapper>
      <Modal ref={ref}>
        <ModalTop>
          <Title>請選擇縣市</Title>
          <Image
            alt='close'
            src={close}
            width='28'
            height='28'
            onClick={() => onClose()}
          />
        </ModalTop>
        <ItemsList>
          {districtsMapping.map((item) => (
            <DistrictItem
              key={item.name}
              onClick={() => {
                handleOnClickItem(item.name);
              }}
              isActive={district === item.name}
              size='all'
              item={item}
            />
          ))}
        </ItemsList>
      </Modal>
    </Wrapper>
  );
}
