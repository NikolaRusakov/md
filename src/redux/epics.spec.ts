import { TestScheduler } from 'rxjs/testing';
import { ActionsObservable } from 'redux-observable';
import { searchAssetsEpic } from './epics';
import { composeQuery } from '../utils';
import { epicMiddleware, RootState } from './store';
import { SearchAssetsSlice } from './slices/searchAssets';
import { configureStore } from '@reduxjs/toolkit';
import { Asset } from '../../types';

const deepEqual = (actual: any, expected: any): void => {
  expect(actual).toEqual(expected);
};

describe('Testing Epics', () => {
  test('searchAssetsEpic', () => {
    const scheduler = new TestScheduler(deepEqual);
    const marbles = {
      f: '-|',
      ra: '-|',
      rn: '-(o|)',
    };

    const mockStore = configureStore({ middleware: [jest.fn()] });

    const values = {
      i: composeQuery('meme', `language=en-US&query=${'value'}&page=${1}&include_adult=false`),
      r: response,
      o: '',
    };

    scheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot(marbles.f, { payload: 'test' }) as any;
      const state$: RootState = {
        searchAssets: {
          entities: {},
          ids: [],
          exp: '',
          page: 0,
          total_pages: 0,
          total_results: 0,
          assetIds: [],
          pageLoads: [],
          assetPageRefs: {},
        },
        assets: { entities: {}, ids: [] },
        detailAsset: {
          id: 0,
          vote_average: 0,
        },
      };

      const dependencies = {
        getJSON: (url: string) => cold(marbles.rn, {}),
      };

      const output$ = searchAssetsEpic(action$, state$ as any, {
        getJSON: dependencies.getJSON<{ page: number; results: Asset[]; total_pages: number; total_results: number }>(
          '',
        ),
      });

      expectObservable(output$).toBe(marbles.rn, values);
    });
  });
});
