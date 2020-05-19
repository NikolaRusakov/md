/** @jsx jsx */
import { jsx } from '@emotion/core';

import React from 'react';
import dynamic from 'next/dynamic';
import { Global } from '@emotion/core';
import { useSelector } from 'react-redux';
import CloseIcon from '../../../../static/svg/close.svg';
import BackButton from '../../../../src/components/backButton';
import { assetTitleOrName, globalNoOverflow } from '../../../../src/utils';
import { wrapper } from '../../../../src/redux/store';
import { assetDetail } from '../../../../src/redux/selectors/details.selector';

const VideoPlayer = dynamic(() => import('../../../../src/components/videoPlayer'), { ssr: false });

const Index = () => {
  const asset = useSelector(assetDetail);

  return (
    <div>
      <Global styles={globalNoOverflow} />
      <nav css={{ display: 'flex', justifyContent: 'space-between' }}>
        {asset && <h1>{assetTitleOrName(asset)}</h1>}
        <BackButton>
          {
            <CloseIcon
              // @ts-ignore
              viewBox="0 0 512 512"
              css={theme => ({ width: '48px', height: '48px', fill: theme.colors.primary })}
            />
          }
        </BackButton>
      </nav>
      <VideoPlayer
        autoPlay={true}
        panelElements={['mute', 'volume', 'time_and_duration']}
        src={'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'}
      />
    </div>
  );
};
export default wrapper.withRedux(Index);
