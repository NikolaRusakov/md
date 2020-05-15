/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import SearchSection from '../../src/components/searchSection';

const Index: React.FC = props => {
  return (
    <section css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchSection />
    </section>
  );
};

export default Index;
