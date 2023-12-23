import React, { useCallback, useEffect, useState } from 'react';
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
  margin-top: 20px;
  ${breakpoint.md} {
    margin-top: 44px;
  }
`;

export default function Board(): JSX.Element {
  const [subType, setSubType] = useState<SubType>('president');
  const [district, setDistrict] = useState<District>('');
  const [data, setData] = useState(null);
  const yearKey = 2020;

  const fetchData = useCallback(async (subType: SubType) => {
    let resData, loader;
    switch (subType) {
      case 'mountainIndigenous':
      case 'plainIndigenous':
      case 'party':
        loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
        resData = await loader.loadLegislatorData({
          year: yearKey,
          subtype: subType,
          district: 'all',
        });
        setData(resData);
        break;
      default: {
        loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
        const data = await loader.loadPresidentData({
          year: yearKey,
        });
        setData(data);
      }
    }
  }, []);

  useEffect(() => {
    setDistrict('');
    fetchData(subType);
  }, [subType, fetchData]);

  return (
    <Wrapper>
      <SubTypeSelector subType={subType} setSubType={setSubType} />
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
