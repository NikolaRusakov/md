/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';

import SearchSection from '../../src/components/searchSection';
import { assetTitleOrName } from '../../utils';
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

const toId = (index: number) => index + 1;

const Index: React.FC = props => {
  const searchAssetEntities = useSelector(selectSearchAssetEntities);
  const pagination = useSelector(searchAssetPagination);
  const searchExp = useSelector(searchAssetExpression);
  const dispatch = useDispatch();
  const pagedAssetsSlice = useSelector(searchAssetsRefsSelector);
  // fixme implement scroll to top on exp. change
  useEffect(() => {}, [searchExp]);
  // @ts-ignore
  const cellRenderer = ({ index, key, style }) => {
    const id = toId(index === 0 ? 0 : index - 1);

    // if even or zero, return 1. 1/2 if odd return 2. 1/2 of page range
    const onParityRange = index === 0 || index % 2 === 0 ? [0, 10] : [10, 20];
    const assetsSlice: (Asset | undefined)[] = Object.keys(pagedAssetsSlice).includes(String(id))
      ? pagedAssetsSlice[id].slice(...onParityRange).map(id => searchAssetEntities[id])
      : new Array(10 /*todo responsive skeletons Omg...*/).fill(undefined);
    return (
      <div
        key={key}
        style={style}
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        {assetsSlice &&
          assetsSlice.map(
            (assetItem, i) =>
              assetItem && (
                <AssetItem key={`searchAsset-${assetTitleOrName(assetItem)}-${i}`} index={i} asset={assetItem} />
              ),
            // : (
            //   <AssetItemSkeleton index={`search-assets-page-${id}-${i}`} />
            // ),
          )}
      </div>
    );
  };

  // @ts-ignore
  function isRowLoaded({ index }) {
    return pagination.pageLoads.includes(toId(index));
  }
  // @ts-ignore
  async function loadMoreRows({ startIndex, stopIndex }) {
    // 3rd page doesn't dispatches and render on search, investigate
    return await dispatch(loadNextSearchAssets({ query: searchExp, page: stopIndex }));
  }

  return (
    <section css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchSection initialProps initialState />
      <div css={{ width: '90vw', height: '80vh' }}>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={pagination.total_pages}
              threshold={1}
              minimumBatchSize={1}>
              {({ onRowsRendered, registerChild }) => {
                return (
                  <List
                    width={width}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    height={height}
                    rowCount={pagination.total_pages}
                    rowHeight={height / 2}
                    rowRenderer={cellRenderer}
                    overscanRowCount={1}
                    forceUpdateGrid={pagination.total_pages}
                  />
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
