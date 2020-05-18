/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import { Global } from '@emotion/core';

import SearchSection from '../../src/components/searchSection';
import { assetTitleOrName, globalNoOverflow } from '../../utils';
import {
  Asset,
  searchAssetExpression,
  searchAssetPagination,
  selectSearchAssetEntities,
  wrapper,
  searchAssetsRefsSelector,
} from '../../src/redux/assets';
import { loadNextSearchAssets } from '../../src/redux/assets.action';
import AssetItem from '../../src/components/assetItem';
import { mediaQueries, mq } from '../../src/utils/theme';
import { useMedia } from 'react-use';

const Index: React.FC = props => {
  const searchAssetEntities = useSelector(selectSearchAssetEntities);
  const pagination = useSelector(searchAssetPagination);
  const searchExp = useSelector(searchAssetExpression);
  const dispatch = useDispatch();
  const pagedAssetsSlice = useSelector(searchAssetsRefsSelector);
  const isSm = useMedia(mediaQueries.sm);

  let [listRef, setRef] = useState<FixedSizeList | null>(null);
  useEffect(() => {
    if (listRef != null) {
      listRef.scrollToItem(0);
    }
  }, [searchExp]);

  // @ts-ignore
  const CellRenderer = ({ index, style }) => {
    const id = index + 1;
    const assetsSlice: (Asset | undefined)[] | undefined = Object.keys(pagedAssetsSlice).includes(String(id))
      ? pagedAssetsSlice[id].map(id => searchAssetEntities[id])
      : undefined;

    return (
      <div
        key={`page-${id}-${index}`}
        style={style}
        css={mq({
          display: 'flex',
          alignItems: 'center',
          justifyContent: ['start', 'space-evenly', 'space-evenly'],
          flexDirection: 'column',
        })}>
        {assetsSlice && (
          <div css={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
            {assetsSlice
              .slice(0, assetsSlice.length / 2) // Naive approach, if less than len. show content and fill with something else.
              .map(
                (assetItem, i) =>
                  assetItem && (
                    <AssetItem
                      cssStyles={{ flex: ['0 0 32%', '0 0 16%', '0 0 16%', '0 0 8%'] }}
                      key={`searchAsset-${assetTitleOrName(assetItem)}-${i}`}
                      index={i}
                      asset={assetItem}
                    />
                  ),
              )}
          </div>
        )}
        {/* Naive approach */}
        {assetsSlice && assetsSlice.length > 10 && (
          <div css={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
            {assetsSlice
              .slice(10, assetsSlice.length + 1)
              .map(
                (assetItem, i) =>
                  assetItem && (
                    <AssetItem
                      cssStyles={{ flex: ['0 0 32%', '0 0 16%', '0 0 16%', '0 0 8%'] }}
                      key={`searchAsset-${assetTitleOrName(assetItem)}-${i}`}
                      index={i}
                      asset={assetItem}
                    />
                  ),
              )}
          </div>
        )}
      </div>
    );
  };

  // @ts-ignore
  function isRowLoaded(index) {
    const id = index + 1;
    return pagination.pageLoads.includes(id);
  }

  async function loadMoreRows(startIndex: number, stopIndex: number) {
    return await dispatch(loadNextSearchAssets({ query: searchExp, page: stopIndex }));
  }

  return (
    <section css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Global styles={globalNoOverflow} />
      {isSm && <SearchSection initialProps initialState />}
      <div css={mq({ width: '100vw', height: ['95vh', '85vh', '80vh', '80vh'], overflow: ['hidden', null, null] })}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <InfiniteLoader
              isItemLoaded={isRowLoaded}
              itemCount={pagination.total_pages}
              loadMoreItems={loadMoreRows}
              threshold={1}
              minimumBatchSize={1}>
              {({ onItemsRendered, ref }) => {
                return (
                  <FixedSizeList
                    itemCount={pagination.total_pages}
                    onItemsRendered={onItemsRendered}
                    itemSize={!isSm ? height * 1.5 : height}
                    height={!isSm ? height * 1.5 : height}
                    ref={e => {
                      setRef(e);
                      return ref;
                    }}
                    width={width}
                    overscanCount={1}>
                    {CellRenderer}
                  </FixedSizeList>
                );
              }}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

export default wrapper.withRedux(Index);
