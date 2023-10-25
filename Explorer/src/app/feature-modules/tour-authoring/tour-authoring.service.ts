import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourPoint } from './model/tourPoints.model';
import { TourObject } from './model/tourObject.model';

import { environment } from 'src/env/environment';
import { Tour } from './tour/model/tour.model';

@Injectable({
  providedIn: 'root',
})
export class TourAuthoringService {
  constructor(private http: HttpClient) {}

  getObjects(): Observable<PagedResults<TourObject>> {
    const list = this.http.get<PagedResults<TourObject>>(
      environment.apiHost + 'administration/object'
    );
    console.log('Lisf objects:', list);
    return list;
  }

  deleteObject(id: number): Observable<TourObject> {
    return this.http.delete<TourObject>(
      environment.apiHost + 'administration/object/' + id
    );
  }

  updateObject(object: TourObject): Observable<TourObject> {
    return this.http.put<TourObject>(
      environment.apiHost + 'administration/object/' + object.id,
      object
    );
}
 
  addObject(obj: TourObject): Observable<TourObject> {
    return this.http.post<TourObject>(
      environment.apiHost + 'administration/object',
      obj
    );
  }

  getTourPoint(): Observable<PagedResults<TourPoint>> {
    return this.http.get<PagedResults<TourPoint>>(
      'https://localhost:44333/api/administration/tourPoint'
    );
  }

  addTourPoint(tourPoint: TourPoint): Observable<TourPoint> {
    return this.http.post<TourPoint>(
      environment.apiHost + 'administration/tourPoint',
      tourPoint
    );
  }

  updateTourPoint(tourPoint: TourPoint): Observable<TourPoint> {
    return this.http.put<TourPoint>(
      environment.apiHost + 'administration/tourPoint/' + tourPoint.id,
      tourPoint
    );
  }

  deleteTourPoint(tourPoint: TourPoint): Observable<TourPoint> {
    return this.http.delete<TourPoint>(
      environment.apiHost + 'administration/tourPoint/' + tourPoint.id
    );
  }

  getTourByGuide(
    userId: number,
    page: number,
    pageSize: number
  ): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      `https://localhost:44333/api/administration/tour/${userId}?page=${page}&pageSize=${pageSize}`
    );
  }

  addTour(tour: Tour): Observable<Tour> {
    console.log(tour);
    return this.http.post<Tour>(
      environment.apiHost + 'administration/tour',
      tour
    );
  }
}
