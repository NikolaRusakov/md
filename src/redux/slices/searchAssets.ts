import { assetsAdapter } from './assets';
import { ActionsUnion, AssetPageRef, Pagination } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';

export const searchAssetsSlice = createSlice({
  name: 'searchAssets',
  initialState: assetsAdapter.getInitialState<Pagination & { exp: string } & { assetPageRefs: AssetPageRef }>({
    exp: '',
    page: 0,
    total_pages: 0,
    total_results: 0,
    pageLoads: [],
    assetPageRefs: {},
  }),
  reducers: {
    fetchAssets: (state, { payload: exp }: { payload: string }) => {
      return { ...state, exp };
    },
    requestedNextPageFetched: (state, { payload }: { payload: Pagination }) => {
      const { assetIds, pageLoads, ...rest } = payload;
      state = { ...state, ...rest };
      state.pageLoads = [...state.pageLoads, ...payload.pageLoads];
      state.assetPageRefs = {
        ...state.assetPageRefs,
        ...(payload.assetIds && {
          [payload.page]: payload.assetIds,
        }),
      };
      return state;
    },
    requestedAssetAdded: assetsAdapter.addOne,
    searchAssetsManyAdded: assetsAdapter.upsertMany,
    requestedAssetsReceived: (state, action) => {
      state.pageLoads = [];
      state.assetPageRefs = {};
      assetsAdapter.setAll(state, action.payload);
    },
  },
});

export const {
  requestedAssetAdded,
  requestedAssetsReceived,
  requestedNextPageFetched,
  searchAssetsManyAdded,
} = searchAssetsSlice.actions;

const searchAssetsActions = searchAssetsSlice.actions;
export type SearchAssetsActions = ActionsUnion<typeof searchAssetsActions>;
