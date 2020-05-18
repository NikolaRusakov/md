import { ActionsObservable, combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';

import assetsAction from './assets.action';
import { requestedAssetsReceived, requestedNextPageFetched, RootState, searchAssetsManyAdded } from './assets';
import { Action } from '@reduxjs/toolkit';

import { composeQuery } from '../../utils';
import { Asset } from '../../types';

// @ts-ignore
export const searchAssetsEpic: Epic<
  Action,
  Action,
  RootState,
  { getJSON: <T>(url: string, headers?: Object) => Observable<T> }
> = (action$: ActionsObservable<Action> /*: Observable<Action>*/, _, { getJSON }) =>
  action$.pipe(
    ofType(assetsAction.fetchAssetsByName.type),
    switchMap<{ type: string; payload: string }, any>(({ payload: value }) =>
      getJSON<{ page: number; results: Asset[]; total_pages: number; total_results: number }>(
        composeQuery(`search/multi`, `language=en-US&query=${value}&page=1&include_adult=false`),
      ).pipe(
        concatMap(anything => {
          const { results, ...pagination } = anything;
          return of(
            requestedAssetsReceived(results || []),
            requestedNextPageFetched({
              ...pagination,
              pageLoads: [anything.page],
              ...(results.length > 0 && { assetIds: results.map(({ id }) => id) }),
            }),
          );
        }),
      ),
    ),
  );

// @ts-ignore
export const loadMoreSearchAssetsEpic: Epic<
  Action,
  Action,
  RootState,
  { getJSON: <T>(url: string, headers?: Object) => Observable<T> }
> = (action$: ActionsObservable<Action> /*: Observable<Action>*/, _, { getJSON }) =>
  action$.pipe(
    ofType(assetsAction.loadNextSearchAssets.type),
    switchMap<{ type: string; payload: { query: string; page: number } }, any>(({ payload: { query, page } }) =>
      getJSON<{ page: number; results: Asset[]; total_pages: number; total_results: number }>(
        composeQuery(`search/multi`, `language=en-US&query=${query}&page=${page}&include_adult=false`),
      ).pipe(
        concatMap(anything => {
          const { results, ...pagination } = anything;
          return of(
            searchAssetsManyAdded(results),
            requestedNextPageFetched({
              ...pagination,
              pageLoads: [anything.page],
              ...(results.length > 0 && { assetIds: results.map(({ id }) => id) }),
            }),
          );
        }),
      ),
    ),
  );

export const rootEpic = combineEpics(searchAssetsEpic, loadMoreSearchAssetsEpic);
