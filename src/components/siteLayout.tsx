import React from 'react';

type Props = {};

const SiteLayout: React.FC<Props> = props => {
  return (
    <div>
      {/* fixme Staged for page-aware header */}
      {/*<nav>*/}
      {/*  <h1>Test</h1>*/}
      {/*</nav>*/}
      <main> {props.children}</main>
    </div>
  );
};

export default SiteLayout;
