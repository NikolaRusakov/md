import { createAction } from '@reduxjs/toolkit';
// import { createAction } from "typesafe-actions";
// export const FETCH_ASSETS = '@@searchAssets/fetchAssets';
// export const fetchAssetsByName = createAction(FETCH_ASSETS, resolve => (exp: string) => resolve({ payload: exp }));

export const fetchAssetsByName = createAction('searchAssets/fetchAssets', (exp: string) => ({ payload: exp }));

export default { fetchAssetsByName };
