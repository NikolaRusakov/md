/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';

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
import { mediaQueries, mq } from '../../src/utils/theme';
import { useMedia } from 'react-use';

const toId = (index: number) => index + 1;

// if <2 return page 1, else on odd -1 to have same ID page
const idByParity = (index: number) => (isEven: boolean) => {
  if (index < 2) {
    return index === 0 ? 1 : index;
  } else {
    return isEven ? index : index - 1;
  }
};

const Index: React.FC = props => {
  const searchAssetEntities = useSelector(selectSearchAssetEntities);
  const pagination = useSelector(searchAssetPagination);
  const searchExp = useSelector(searchAssetExpression);
  const dispatch = useDispatch();
  const pagedAssetsSlice = useSelector(searchAssetsRefsSelector);
  const isSm = useMedia(mediaQueries.sm);
  const isMd = useMedia(mediaQueries.md);
  const isLg = useMedia(mediaQueries.lg);

  console.log({
    isSm,
    isMd,
    isLg,
  });

  let [listRef, setRef] = useState<FixedSizeList | null>(null);
  useEffect(() => {
    if (listRef != null) {
      listRef.scrollToItem(0);
    }
  }, [searchExp]);

  // @ts-ignore
  const CellRenderer = ({ index, style }) => {
    const isEven = index % 2 === 0;
    const id = idByParity(index)(isEven);
    // if even return 1. 1/2 if odd return 2. 1/2 of page range per list (page consists of 2 lists)
    const onParityRange = isEven || index === 0 ? [0, 10] : [10, 20];
    const assetsSlice: (Asset | undefined)[] = Object.keys(pagedAssetsSlice).includes(String(id))
      ? pagedAssetsSlice[id].slice(...onParityRange).map(id => searchAssetEntities[id])
      : new Array(10 /*todo responsive skeletons Omg...*/).fill(undefined);

    return (
      <div
        key={`page-${id}-${index}`}
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
  function isRowLoaded(index) {
    const isEven = index % 2 === 0;
    const id = idByParity(index)(isEven);
    return pagination.pageLoads.includes(id);
  }
  // @ts-ignore
  async function loadMoreRows(startIndex, stopIndex) {
    // 3rd page doesn't dispatches and render on search, investigate
    console.log({ startIndex, stopIndex });
    return await Promise.all([
      dispatch(loadNextSearchAssets({ query: searchExp, page: startIndex })),
      dispatch(loadNextSearchAssets({ query: searchExp, page: stopIndex })),
    ]);
  }

  return (
    <section css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchSection initialProps initialState />
      <div css={{ width: '90vw', height: '80vh' }}>
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
                    itemSize={height / 2}
                    height={height}
                    ref={e => {
                      setRef(e);
                      return ref;
                    }}
                    width={width}>
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
