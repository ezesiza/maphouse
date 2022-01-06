import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapModel } from '../models/map.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapService {
  private LISTING_URL = `../../assets/listings.json`;

  constructor(private http: HttpClient) {}

  getAllHouseListing(): Observable<MapModel> {
    return this.http.get<MapModel>(this.LISTING_URL);
  }
}
