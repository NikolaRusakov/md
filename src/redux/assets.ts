import { createEntityAdapter, combineReducers, createSlice, configureStore, createSelector } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { rootEpic } from './epics';
import { ActionsUnion } from '../../types';
import { detailAssetSlice } from './details';

interface AssetPageRef {
  [key: number]: number[];
}

export type Pagination = {
  page: number;
  total_pages: number;
  total_results: number;
  pageLoads: number[];
  assetIds?: number[];
};

export type Asset = {
  name?: string;
  tagline?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  media_type?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count?: number;
};

const assetsAdapter = createEntityAdapter<Asset>({
  // Assume IDs are stored in a field other than `asset.id`
  selectId: asset => asset.id,
  // Keep the "all IDs" array sorted based on asset vote average
  sortComparer: (a, b) => (a.vote_average === b.vote_average ? 0 : a.vote_average > b.vote_average ? 1 : -1),
});

const searchAssetsSlice = createSlice({
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

const assetsSlice = createSlice({
  name: 'assets',
  initialState: assetsAdapter.getInitialState(),
  reducers: {
    assetAdded: assetsAdapter.addOne,
    assetsReceived: (state, action) => {
      assetsAdapter.setAll(state, action.payload);
    },
  },
});

export const { assetAdded, assetsReceived } = assetsSlice.actions;
export const {
  requestedAssetAdded,
  requestedAssetsReceived,
  requestedNextPageFetched,
  searchAssetsManyAdded,
} = searchAssetsSlice.actions;

const rootReducer = combineReducers({
  assets: assetsSlice.reducer,
  searchAssets: searchAssetsSlice.reducer,
  detailAsset: detailAssetSlice.reducer,
});

// export type EpicActions = ActionsUnion<typeof actions>;
const searchAssetsActions = searchAssetsSlice.actions;
export type SearchAssetsActions = ActionsUnion<typeof searchAssetsActions>;

export type RootState = ReturnType<typeof rootReducer>;

export const epicMiddleware = createEpicMiddleware<SearchAssetsActions, SearchAssetsActions, RootState>({
  dependencies: { getJSON: ajax.getJSON },
});

export const makeStore = (preloadedState: any) =>
  configureStore({
    reducer: {
      assets: assetsSlice.reducer,
      searchAssets: searchAssetsSlice.reducer,
      detailAsset: detailAssetSlice.reducer,
    },
    preloadedState,
    devTools: true,
    // @ts-ignore
    middleware: [logger, epicMiddleware],
  });

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

// @ts-ignore
epicMiddleware.run(rootEpic);
// Can create a set of memoized selectors based on the location of this entity state
export const {
  selectById: selectAssetById,
  selectAll: selectAssetAll,
  selectEntities: selectAssetEntities,
} = assetsAdapter.getSelectors<RootState>(state => state.assets);

export const {
  selectById: selectSearchAssetById,
  selectAll: selectSearchAssetAll,
  selectEntities: selectSearchAssetEntities,
} = assetsAdapter.getSelectors<RootState>(state => state.searchAssets);

// And then use the selectors to retrieve values
export const allAssets = createSelector(selectAssetAll, item => item);

export const searchAssetEntityList = createSelector(selectSearchAssetEntities, state => Object.values(state));

export const searchAssetsSelector = (state: RootState) => state.searchAssets;
export const searchAssetsRefsSelector = (state: RootState) => state.searchAssets.assetPageRefs;

export const searchAssetExpression = createSelector(searchAssetsSelector, state => state.exp);

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

// TODO test if memoized ?
export const assetById = ({ assetId }: { assetId?: number }) =>
  createSelector(selectAssetEntities, (assets): Asset | undefined => (assetId ? assets[assetId] : undefined));
