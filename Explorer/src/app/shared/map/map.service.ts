import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) { }
  
  private coordinateSubject = new BehaviorSubject<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
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
    return this.http.get('https://api.open-elevation.com/api/v1/lookup?locations=' + lat + ',' + lon)
  }
}
