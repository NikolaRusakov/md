import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Asset } from '../../../types';

export const assetsAdapter = createEntityAdapter<Asset>({
  // Assume IDs are stored in a field other than `asset.id`
  selectId: asset => asset.id,
  // Keep the "all IDs" array sorted based on asset vote average
  sortComparer: (a, b) => (a.vote_average === b.vote_average ? 0 : a.vote_average > b.vote_average ? 1 : -1),
});

export const assetsSlice = createSlice({
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

// export type EpicActions = ActionsUnion<typeof actions>;

// @ts-ignore
// Can create a set of memoized selectors based on the location of this entity state
