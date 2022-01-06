import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { mapsReducer, MapState } from './map.reducer';

export interface State {
  houses: MapState;
}

export const reducers: ActionReducerMap<State> = {
  houses: mapsReducer,
};

const getHouseFeatureState = createFeatureSelector<MapState>('houses');

export const getHouses = createSelector(
  getHouseFeatureState,
  (state) => state.houses
);

export const getError = createSelector(
  getHouseFeatureState,
  (state) => state.error
);
