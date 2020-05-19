import { createAction } from '@reduxjs/toolkit';
// import { createAction } from "typesafe-actions";
// export const FETCH_ASSETS = '@@searchAssets/fetchAssets';
// export const fetchAssetsByName = createAction(FETCH_ASSETS, resolve => (exp: string) => resolve({ payload: exp }));

//Fixme infer me in epics
export const fetchAssetsByName = createAction('searchAssets/fetchAssets', (exp: string) => ({ payload: exp }));

export const loadNextSearchAssets = createAction(
  'searchAssets/loadNextSearchAssets',
  (payload: { query: string; page: number }) => ({ payload }),
);

export default { fetchAssetsByName, loadNextSearchAssets };
