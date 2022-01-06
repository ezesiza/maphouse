import { Action } from '@ngrx/store';
import {MapModel} from '../models/map.model';

export enum MapsActionTypes {
  GetAllHouseListings = '[HouseList] Get All House Listings',
  HousesLoadedSuccess = '[HousesLoadedSuccess] Houses Loaded Success',
  HousesLoadedFailed = '[HousesLoadedFailed] Houses Loaded Failed',
}

export class HousesLoadedSuccess implements Action {
  readonly type = MapsActionTypes.HousesLoadedSuccess;
  constructor(public houses: MapModel[]) {}
}


export class GetAllHouseListings implements Action {
  readonly type = MapsActionTypes.GetAllHouseListings;
}

export class HousesLoadFailed implements Action {
  readonly type = MapsActionTypes.HousesLoadedFailed;
  constructor(public error: any) {}
}

export type MapsActions =
  | GetAllHouseListings
  | HousesLoadedSuccess
  | HousesLoadFailed;
