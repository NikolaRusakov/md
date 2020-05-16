/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import SearchSection from '../../src/components/searchSection';

import { Collection, AutoSizer } from 'react-virtualized';
import { useSelector } from 'react-redux';
import { mq } from '../../src/utils/theme';
import { assetTitleOrName, imageOrPlaceholder, isImage } from '../../utils';
import Link from 'next/link';
import {
  Asset,
  searchAssetByIndex,
  searchAssetEntityList,
  selectSearchAssetEntities,
  wrapper,
} from '../../src/redux/reducers/assets';

const AssetItem: React.FC<{ index: number; asset: Asset }> = ({ index, asset }) => (
  <div
    key={`${asset.title}-${index}`}
    css={mq({
      position: 'relative',
      height: ['120px', '140px', '160px'],
      width: ['80px', '100px', '120px'],
      '&:before': {
        content: '""',
        display: 'block',
        paddingTop: '80%',
      },
      marginRight: '10px',
      // marginRight: typeof window === 'undefined' ? '10px' : null,
    })}>
    <Link
      href={{
        pathname: '/browse/detail/[id]',
        query: { type: asset?.media_type === 'movie' ? 'movie' : 'tv' },
      }}
      as={{
        pathname: `/browse/detail/${asset.id}`,
        query: { type: asset?.media_type === 'movie' ? 'movie' : 'tv' },
      }}>
      <img
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          cursor: 'pointer',
        }}
        src={imageOrPlaceholder(asset.poster_path)}
      />
    </Link>
    {!isImage(asset.poster_path) && (
      <span css={theme => ({ position: 'absolute', top: 0, fontSize: theme.fontSizes[4] })}>
        {assetTitleOrName(asset)}
      </span>
    )}
  </div>
);
const Index: React.FC = props => {
  const searchAssetItems = useSelector(searchAssetEntityList);

  // @ts-ignore
  const cellRenderer = ({ index, key, style }) => {
    const assetItem: Asset | undefined = Object.keys(searchAssetItems).length
      ? Object.values(searchAssetItems)[index]
      : undefined;
    return (
      <div key={key} style={style}>
        {assetItem && <AssetItem index={index} asset={assetItem} />}
      </div>
    );
  };

  return (
    <section css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchSection initialProps initialState />
      <div css={{ width: '90vw', height: '80vh' }}>
        <AutoSizer>
          {({ height, width }) => (
            <Collection
              cellCount={10}
              cellRenderer={cellRenderer}
              cellSizeAndPositionGetter={({ index, isScrolling }) => ({ height: 120, width: 140, x: 0, y: 100 })}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

export default wrapper.withRedux(Index);
