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
      css={theme => ({
        width: '80%',
        height: '5vh',
        backgroundColor: theme.colors.highlight,
        boxShadow: theme.shadows['outline'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}>
      <div css={{ display: 'flex', width: '80%' }}>
        <input
          css={theme => ({
            margin: 'auto',
            width: '80%',
            border: `1px solid ${theme.colors.grayDark}`,
            boxShadow: theme.shadows['md'],
          })}
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
