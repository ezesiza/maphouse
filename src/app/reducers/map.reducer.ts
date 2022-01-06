import { Map } from 'mapbox-gl';
import { MapsActions, MapsActionTypes } from '../actions/map.actions';
import { MapModel } from '../models/map.model';

export interface MapState {
  houses: MapModel[];
  error: any;
}

export const initialState: MapState = {
  houses: [],
  error: '',
};

export function mapsReducer(
  state = initialState,
  action: MapsActions
): MapState {
  switch (action.type) {
    case MapsActionTypes.HousesLoadedSuccess:
      return { ...state, houses: action.houses, error: '' };
    default:
      return state;
  }
}
