import { createEntityAdapter, createSlice, configureStore, createSelector } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

export type Asset = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  tagline: number;
  popularity: number;
  poster_path?: string;
};

const assetsAdapter = createEntityAdapter<Asset>({
  // Assume IDs are stored in a field other than `asset.id`
  selectId: asset => asset.id,
  // Keep the "all IDs" array sorted based on asset vote average
  sortComparer: (a, b) => (a.vote_average === b.vote_average ? 0 : a.vote_average > b.vote_average ? 1 : -1),
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

export const store = configureStore({
  reducer: {
    assets: assetsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const makeStore = (preloadedState: any) =>
  configureStore({
    reducer: {
      assets: assetsSlice.reducer,
    },
    preloadedState,
    devTools: true,
    middleware: [logger],
  });

// const makeStore: MakeStore<RootState> = (context: Context) => createStore(assetsSlice.reducer, applyMiddleware(logger));

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

// Can create a set of memoized selectors based on the location of this entity state
export const { selectById, selectAll, selectEntities } = assetsAdapter.getSelectors<RootState>(state => state.assets);

// And then use the selectors to retrieve values
export const allAssets = createSelector(selectAll, item => item);

// TODO test if memoized ?
export const assetById = ({ assetId }: { assetId?: number }) =>
  createSelector(selectEntities, (assets): Asset | undefined => (assetId ? assets[assetId] : undefined));
