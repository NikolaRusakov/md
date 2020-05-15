import { createEntityAdapter, combineReducers, createSlice, configureStore, createSelector } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { rootEpic } from './epics';
import { ActionsUnion } from '../../../types';

export type Asset = {
  // id: number;
  // title?: string;
  name?: string;
  // overview: string;
  // release_date: string;
  // vote_average: number;
  tagline?: string;
  // popularity: number;
  // poster_path?: string;

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
  initialState: assetsAdapter.getInitialState<{ exp: any }>({ exp: '' }),
  reducers: {
    // fetchAssetsByName
    fetchAssets: (state, exp) => {
      return { ...state, exp: exp.payload };
    },
    requestedAssetAdded: assetsAdapter.addOne,
    requestedAssetsReceived: (state, action) => {
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
export const { requestedAssetAdded, requestedAssetsReceived } = searchAssetsSlice.actions;

const rootReducer = combineReducers({
  assets: assetsSlice.reducer,
  searchAssets: searchAssetsSlice.reducer,
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
export const { selectById, selectAll, selectEntities } = assetsAdapter.getSelectors<RootState>(state => state.assets);

// And then use the selectors to retrieve values
export const allAssets = createSelector(selectAll, item => item);

// TODO test if memoized ?
export const assetById = ({ assetId }: { assetId?: number }) =>
  createSelector(selectEntities, (assets): Asset | undefined => (assetId ? assets[assetId] : undefined));
