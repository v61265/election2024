import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  Dispatch,
} from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';
import SubTypeSelector from './sub-type-selector';
import { District, SubType } from '~/constants';
import { env } from '~/config';
// @ts-ignore: no definition
import ew from '@readr-media/react-election-widgets';
const DataLoader = ew.VotesComparison.DataLoader;
const EVCComponent = ew.VotesComparison.ReactComponent;
const gcsBaseUrl =
  env === 'prod'
    ? 'https://whoareyou-gcs.readr.tw/elections'
    : 'https://whoareyou-gcs.readr.tw/elections-dev';

import DistrictSelector from './district-selector';

const Wrapper = styled.section`
  background: ${color.background};
`;

const EVCWrapper = styled.div`
  background: ${color.background};
  padding-top: 20px;
  ${breakpoint.md} {
    padding-top: 44px;
  }
`;

interface ResData {
  updatedAt?: string;
}

interface BoardProps {
  updateTime: string;
  setUpdateTime: Dispatch<SetStateAction<string>>;
}

export default function Board({
  updateTime,
  setUpdateTime,
}: BoardProps): JSX.Element {
  const [subType, setSubType] = useState<SubType>('president');
  const [district, setDistrict] = useState<District>('taipeiCity');
  const [data, setData] = useState<ResData>({});
  const yearKey = 2024;

  const fetchData = useCallback(
    async (subType: SubType, district: District) => {
      let resData, loader;
      console.log('refetch');
      switch (subType) {
        case 'district': {
          if (!district) break;
          loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
          resData = await loader.loadLegislatorData({
            year: yearKey,
            subtype: subType,
            district: district,
          });
          break;
        }
        case 'mountainIndigenous':
        case 'plainIndigenous':
        case 'party':
          setDistrict('taipeiCity');
          loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
          resData = await loader.loadLegislatorData({
            year: yearKey,
            subtype: subType,
            district: 'all',
          });
          break;
        default: {
          setDistrict('taipeiCity');
          loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
          resData = await loader.loadPresidentData({
            year: yearKey,
          });
        }
      }
      setData(resData);
    },
    []
  );

  useEffect(() => {
    let intervalId: any; // 指定 intervalId 的類型

    const fetchDataWithInterval = () => {
      fetchData(subType, district);
    };

    const restartInterval = () => {
      clearInterval(intervalId!);
      intervalId = setInterval(fetchDataWithInterval, 180000);
    };

    fetchDataWithInterval();
    restartInterval();

    return () => {
      clearInterval(intervalId!);
    };
  }, [subType, fetchData, district]);

  useEffect(() => {
    if (data?.updatedAt) {
      setUpdateTime(data?.updatedAt);
    }
  }, [data, setUpdateTime, updateTime]);

  const handleSetSubType = (type: SubType) => {
    if (type !== subType) setSubType(type);
  };

  return (
    <Wrapper>
      <SubTypeSelector subType={subType} handleSetSubType={handleSetSubType} />
      {subType === 'district' && (
        <DistrictSelector district={district} setDistrict={setDistrict} />
      )}
      <EVCWrapper>
        {data && (
          <EVCComponent
            election={data}
            theme='mnewsElection2022'
            device='rwd'
          />
        )}
      </EVCWrapper>
    </Wrapper>
  );
}
