/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { fetchAssetsByName } from '../redux/assets.action';
import { epicMiddleware, wrapper } from '../redux/assets';
import { rootEpic } from '../redux/epics';
import { useEffectOnce } from 'react-use';
import { mq } from '../utils/theme';

const SearchSection: React.FC = props => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  useEffectOnce(() => {
    // Re-run on client epics middleware
    // @ts-ignore
    epicMiddleware.run(rootEpic);
  });

  const [value, setValue] = useState('');
  const [debouncedCallback] = useDebouncedCallback((value: string | null) => {
    value && setValue(value.toString());
    value && dispatch(fetchAssetsByName(value));
  }, 300);
  return (
    <article
      css={theme =>
        mq({
          width: ['100%', '80%', '80%'],
          height: ['100%', '7vh', '7vh'],
          backgroundColor: theme.colors.highlight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 4,
          border: ['none', '1px solid', '1px solid'],
        })
      }>
      <div css={mq({ display: 'flex', width: ['100%', '80%', '80%'], height: ['50%', '50%', '75%'] })}>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search for ..."
          css={theme =>
            mq({
              margin: [0, 'auto', 'auto'],
              width: ['100%', '80%', '80%'],
              lineHeight: '2.5rem',
              fontSize: [theme.fontSizes['3'], theme.fontSizes['4'], theme.fontSizes['5']],
              border: `1px solid ${theme.colors.grayDark}`,
              flexDirection: ['column', 'row', 'row'],
              boxShadow: [theme.shadows['lg'], theme.shadows['md'], theme.shadows['md']],
            })
          }
          defaultValue={value}
          onChange={e => debouncedCallback(e.target.value)}
        />
      </div>
    </article>
  );
};

export default wrapper.withRedux(SearchSection);
