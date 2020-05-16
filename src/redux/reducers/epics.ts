import { combineEpics, ofType, Epic, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import assetsAction from './assets.action';
import { RootState, Asset, requestedAssetsReceived } from './assets';
import { Action } from '@reduxjs/toolkit';

import { composeQuery } from '../../../utils';

// @ts-ignore
export const fetchUserEpic: Epic<
  Action,
  Action,
  RootState,
  { getJSON: <T>(url: string, headers?: Object) => Observable<T> }
> = (action$: ActionsObservable<Action> /*: Observable<Action>*/, _, { getJSON }) =>
  action$.pipe(
    ofType(assetsAction.fetchAssetsByName.type),
    switchMap<{ type: string; payload: any }, any>(({ payload: value }) =>
      getJSON<{ page: number; results: Asset[]; length: number; total_pages: number; total_results: number }>(
        composeQuery(`search/multi`, `language=en-US&query=${value}&page=1&include_adult=false`),
      ).pipe(map(anything => requestedAssetsReceived(anything.results || []))),
    ),
  );

export const rootEpic = combineEpics(fetchUserEpic);
