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
          width: theme.sizes['1/2'],
          background: theme.colors.indigo[7],
          height: ['1/6', '1/6', '1/5'],
          border: `${theme.borderWidths[2]} solid ${theme.colors.primary}`,
        })
      }
      href={href}
      onClick={onClick}
      // @ts-ignore
      ref={ref}>
      <div
        css={theme => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100%',
          color: theme.colors.gray[2],
          padding: theme.sizes[2],
        })}>
        <div css={{ marginRight: '0.5rem' }}>
          {/*// @ts-ignore*/}
          <PlayIcon height="24" />
        </div>
        <span css={theme => ({ fontSize: theme.fontSizes[4] })}>Play</span>
      </div>
    </button>
  );
});

export default VideoButton;
