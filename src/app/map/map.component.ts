import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { environment } from '../../environments/environment';
import * as houseList from '../../assets/listings.json';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnChanges {
  private style = `https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh`;
  private lat = 32.674031;
  private lng = -97.20766235809704;
  private zoom = 9;
  private url: any;
  private marker: mapboxgl.Marker;
  private map: mapboxgl.Map;

  @Input() mapCoord: any;

  private newCoordinates: any;

  constructor() {}

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'mapCoord': {
            const coords = changes.mapCoord.currentValue?.coordinates;
            this.newCoordinates =
              coords !== undefined ? coords : [this.lng, this.lat];
            this.lng = this.newCoordinates[0];
            this.lat = this.newCoordinates[1];

            this.buildMap();
            this.marker.setLngLat(this.newCoordinates);
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.url = houseList;
  }

  buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      accessToken: environment.mapbox.accessToken,
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });

    this.map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      })
    );

    this.marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.FullscreenControl());

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    this.map.on('load', () => {
      this.map.addSource('ballpoint', {
        type: 'geojson',
        data: this.url,
      });

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'ballpoint',
        paint: {
          'circle-color': 'orange',
          'circle-radius': 28,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'red',
        },
      });

      this.map.on('click', 'unclustered-point', (e) => {
        const center = e.features[0].geometry['coordinates'];
        this.map.flyTo({
          center,
        });
        this.marker.setLngLat(center);
      });
      this.map.on('mouseenter', 'unclustered-point', (e) => {
        this.map.getCanvas().style.cursor = 'pointer';
        const coordinates = e.features[0].geometry['coordinates'].slice();
        const name = e.features[0].properties.name;
        const city = e.features[0].properties.city;
        const streetAddress = e.features[0].properties.streetAddress;
        const highValueAmenities = JSON.parse(
          e.features[0].properties.highValueAmenities
        );

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const description =
          name + ' ' + city + ' ' + streetAddress + ' ' + highValueAmenities;
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      });
      this.map.on('mouseleave', 'unclustered-point', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });
  }
}
