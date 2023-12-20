import React, { useState } from 'react';
import styled from 'styled-components';
import { color, breakpoint } from '~/styles/theme';
import SubTypeSelector from './sub-type-selector';
import { SubType } from '~/constants';

const Wrapper = styled.section`
  background: ${color.background};
`;

export default function Board(): JSX.Element {
  const [subType, setSubType] = useState<SubType>('president');
  return (
    <Wrapper>
      <SubTypeSelector subType={subType} setSubType={setSubType} />
    </Wrapper>
  );
}
