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
  updateAt?: string;
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
  const [district, setDistrict] = useState<District>('');
  const [data, setData] = useState<ResData>({});
  const yearKey = 2020;

  const fetchData = useCallback(
    async (subType: SubType, district: District) => {
      let resData, loader;
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
          setDistrict('');
          loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
          resData = await loader.loadLegislatorData({
            year: yearKey,
            subtype: subType,
            district: 'all',
          });
          break;
        default: {
          setDistrict('');
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
    fetchData(subType, district);
  }, [subType, fetchData, district]);

  useEffect(() => {
    if (data?.updateAt) {
      setUpdateTime(data?.updateAt);
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
