/** @jsx jsx */
import { jsx } from '@emotion/core';

import Router from 'next/router';
import React from 'react';

const BackButton: React.FC = ({ children }) => (
  <button css={{ border: 'none' }} onClick={() => Router.back()}>
    {children}
  </button>
);

export default BackButton;
