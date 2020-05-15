/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { mq } from '../utils/theme';
import PlayIcon from '../../static/svg/play.svg';
// @ts-ignore
const VideoButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <button
      css={theme =>
        mq({
          width: '96px',
          height: [24, 28, 36],
          border: `1px solid ${theme.colors.primary}`,
        })
      }
      href={href}
      onClick={onClick}
      // @ts-ignore
      ref={ref}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100%',
        }}>
        {/*// @ts-ignore*/}
        <PlayIcon height="24" />
        <span>Play</span>
      </div>
    </button>
  );
});

export default VideoButton;
