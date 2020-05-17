/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// import List from 'react-virtualized/dist/es/List';
import { useDispatch } from 'react-redux';
import { fetchAssetsByName } from '../redux/assets.action';
import { epicMiddleware, wrapper } from '../redux/assets';
import { rootEpic } from '../redux/epics';
import { useEffectOnce } from 'react-use';
import { mq } from '../utils/theme';

// type Props = {};

const SearchSection: React.FC = props => {
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
          height: ['100%', '5vh', '5vh'],
          backgroundColor: theme.colors.highlight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 4,
          border: ['none', '1px solid', '1px solid'],
        })
      }>
      <div css={mq({ display: 'flex', width: ['100%', '80%', '80%'], height: ['50%', '50%', '50%'] })}>
        <input
          css={theme =>
            mq({
              margin: [0, 'auto', 'auto'],
              width: ['100%', '80%', '80%'],
              border: `1px solid ${theme.colors.grayDark}`,
              flexDirection: ['column', 'row', 'row'],
              boxShadow: ['none', theme.shadows['md'], theme.shadows['md']],
            })
          }
          defaultValue={value}
          onChange={e => debouncedCallback(e.target.value)}
        />
        <button css={theme => ({ textTransform: 'uppercase', boxShadow: theme.shadows['default'], border: 'none' })}>
          Search
        </button>
      </div>
    </article>
  );
};

export default wrapper.withRedux(SearchSection);
