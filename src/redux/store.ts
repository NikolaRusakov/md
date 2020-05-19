import { detailAssetSlice } from './slices/details';
import { assetsSlice } from './slices/assets';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { rootEpic } from './epics';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { SearchAssetsActions, searchAssetsSlice } from './slices/searchAssets';

export const epicMiddleware = createEpicMiddleware<SearchAssetsActions, SearchAssetsActions, RootState>({
  dependencies: { getJSON: ajax.getJSON },
});

const rootReducer = combineReducers({
  assets: assetsSlice.reducer,
  searchAssets: searchAssetsSlice.reducer,
  detailAsset: detailAssetSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState: any) =>
  configureStore({
    reducer: {
      assets: assetsSlice.reducer,
      searchAssets: searchAssetsSlice.reducer,
      detailAsset: detailAssetSlice.reducer,
    },
    preloadedState,
    devTools: true,
    middleware: [/*logger,*/ epicMiddleware],
  });

export const wrapper = createWrapper<RootState>(makeStore, { debug: false });

//fixme types
// @ts-ignore
epicMiddleware.run(rootEpic);
