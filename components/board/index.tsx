import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';
import SubTypeSelector from './sub-type-selector';
import { SubType } from '~/constants';
import { env } from '~/config';
// @ts-ignore: no definition
import ew from '@readr-media/react-election-widgets';
const DataLoader = ew.VotesComparison.DataLoader;
const EVCComponent = ew.VotesComparison.ReactComponent;
const gcsBaseUrl =
  env === 'dev'
    ? 'https://whoareyou-gcs.readr.tw/elections-dev'
    : 'https://whoareyou-gcs.readr.tw/elections';
let ldr;

const Wrapper = styled.section`
  background: ${color.background};
`;

export default function Board(): JSX.Element {
  const [subType, setSubType] = useState<SubType>('president');
  const [data, setData] = useState(null);
  const yearKey = 2020;

  const fetchData = useCallback(async (subType: SubType) => {
    console.log({ subType });
    let resData, loader;
    switch (subType) {
      case 'mountainIndigenous':
        loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
        resData = await loader.loadMountainIndigenousLegislatorData({
          year: yearKey,
        });
        setData(resData);
        break;
      case 'plainIndigenous':
        loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
        resData = await loader.loadPlainIndigenousLegislatorData({
          year: yearKey,
        });
        setData(resData);
        break;
      case 'party':
        loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
        resData = await loader.loadLegislatorData({
          year: yearKey,
          subtype: subType,
          district: 'all',
        });
        console.log({ resData });
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
    fetchData(subType);
  }, [subType, fetchData]);

  return (
    <Wrapper>
      <SubTypeSelector subType={subType} setSubType={setSubType} />
      {data && (
        <EVCComponent election={data} theme='mnewsElection2022' device='rwd' />
      )}
    </Wrapper>
  );
}
