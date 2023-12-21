import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';
import SubTypeSelector from './sub-type-selector';
import { SubType } from '~/constants';
import { env } from '~/config';
// @ts-ignore: no definition
import evc from '@readr-media/react-election-widgets/lib/votes-comparison';
const DataLoader = evc.DataLoader;
const EVCComponent = evc.EVCComponent;
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

  const fetchData = useCallback(async (subType: SubType) => {
    const loader = new DataLoader({ version: 'v2', apiUrl: gcsBaseUrl });
    const data = await loader.loadPresidentData({
      year: 2020,
    });
    setData(data);
  }, []);

  useEffect(() => {
    fetchData(subType);
  }, []);

  return (
    <Wrapper>
      <SubTypeSelector subType={subType} setSubType={setSubType} />
      {data && (
        <EVCComponent election={data} theme='mnewsElection2022' device='rwd' />
      )}
    </Wrapper>
  );
}
