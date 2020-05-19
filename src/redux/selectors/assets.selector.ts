import { createSelector } from '@reduxjs/toolkit';
import { assetsAdapter } from '../slices/assets';
import { RootState } from '../store';
import { Asset } from '../../../types';

export const {
  selectById: selectAssetById,
  selectAll: selectAssetAll,
  selectEntities: selectAssetEntities,
} = assetsAdapter.getSelectors<RootState>(state => state.assets);

export const allAssetsSelector = createSelector(selectAssetAll, item => item);

// TODO test if memoized ?
export const assetById = ({ assetId }: { assetId?: number }) =>
  createSelector(selectAssetEntities, (assets): Asset | undefined => (assetId ? assets[assetId] : undefined));

