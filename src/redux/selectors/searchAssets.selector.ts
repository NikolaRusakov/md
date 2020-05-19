import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { assetsAdapter } from '../slices/assets';

export const {
  selectById: selectSearchAssetById,
  selectAll: selectSearchAssetAll,
  selectEntities: selectSearchAssetEntities,
} = assetsAdapter.getSelectors<RootState>(state => state.searchAssets);

export const searchAssetEntityListSelector = createSelector(selectSearchAssetEntities, state => Object.values(state));
export const searchAssetsSelector = (state: RootState) => state.searchAssets;
export const searchAssetsRefsSelector = (state: RootState) => state.searchAssets.assetPageRefs;
export const searchAssetExpressionSelector = createSelector(searchAssetsSelector, state => state.exp);

export const searchAssetPagination = createSelector(
  searchAssetsSelector,
  ({ pageLoads, page, total_pages, total_results }) => ({
    page,
    total_pages,
    total_results,
    pageLoads,
  }),
);

export const searchAssetsPagedEntities = (page: number) =>
  createSelector(searchAssetsSelector, selectSearchAssetEntities, ({ assetPageRefs }, entities) =>
    assetPageRefs[page].map(id => entities[id]),
  );

export const searchAssetByIndex = (index: number) =>
  createSelector(selectSearchAssetEntities, state =>
    index <= Object.keys(state).length ? Object.values(state)[index] : undefined,
  );
