import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const detailAssetSelector = (state: RootState) => state.detailAsset;
export const assetDetail = createSelector(detailAssetSelector, asset => asset);
