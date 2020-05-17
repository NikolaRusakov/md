/** @jsx jsx */
import { jsx } from '@emotion/core';

import Router from 'next/router';
import React from 'react';

const BackButton: React.FC = ({ children }) => (
  <button css={{ border: 'none', '&:focus': { outline: 'thick double #32a1ce' } }} onClick={() => Router.back()}>
    {children}
  </button>
);

export default BackButton;
