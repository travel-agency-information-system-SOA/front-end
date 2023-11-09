import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  map: any;
  isMapInitialized: boolean = false;

  private coordinateSubject = new BehaviorSubject<{ lat: number; lng: number }>(
    { lat: 0, lng: 0 }
  );
  public coordinate$ = this.coordinateSubject.asObservable();

  setCoordinates(coordinates: { lat: number; lng: number }) {
    this.coordinateSubject.next(coordinates);
  }

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }

  getElevation(lat: number, lon: number): Observable<any> {
    return this.http.get(
      'https://api.open-elevation.com/api/v1/lookup?locations=' +
        lat +
        ',' +
        lon
    );
  }

  initMap(): any {
    if (this.isMapInitialized) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.isMapInitialized = true;
    return this.map;
  }
}
