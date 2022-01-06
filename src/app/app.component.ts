import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { GetAllHouseListings } from './actions/map.actions';
import { getHouses } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  houseListing: any[];
  mapCoord: any;

  constructor(private primengConfig: PrimeNGConfig, private store: Store) {
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllHouseListings());
    this.store.select(getHouses).subscribe((item) => {
      this.houseListing = item;
    });
  }

  getCoordinates(item: any): void {
    this.mapCoord = item.geometry;
  }
}
