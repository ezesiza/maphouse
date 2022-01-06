import { MapService } from '../_service/map.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { HousesLoadedSuccess, HousesLoadFailed, MapsActionTypes} from '../actions/map.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { MapModel } from '../models/map.model';

@Injectable()
export class MapsEffects {
  constructor(private actions$: Actions, private mapService: MapService) {}

  loadHouseListings$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(MapsActionTypes.GetAllHouseListings),
      mergeMap(() => {
        return this.mapService.getAllHouseListing().pipe(
          map((houses: MapModel) => new HousesLoadedSuccess(houses['features'])),
          catchError((err) => of(new HousesLoadFailed(err)))
        );
      })
    );
  });
}
