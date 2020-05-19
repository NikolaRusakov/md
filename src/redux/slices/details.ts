import { createSlice } from '@reduxjs/toolkit';
import { Asset } from '../../../types';

export const detailAssetSlice = createSlice({
  name: 'detailAsset',
  initialState: <Asset>{},
  reducers: {
    setAssetDetail: (state, { payload }: { payload: Asset }) => ({ ...payload }),
  },
});

export const { setAssetDetail } = detailAssetSlice.actions;
