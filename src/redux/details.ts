import { RootState } from './assets';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import {Asset, Pagination} from "../../types";

export const detailAssetSlice = createSlice({
  name: 'searchAssets',
  initialState: <Asset>{},
  reducers: {
    setAssetDetail: (state, { payload }: { payload: Asset }) => ({ ...payload }),
  },
});

export const { setAssetDetail } = detailAssetSlice.actions;

export const detailAssetSelector = (state: RootState) => state.detailAsset;

export const assetDetail = createSelector(detailAssetSelector, asset => asset);
