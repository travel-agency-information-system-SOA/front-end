import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourPoint } from './model/tourPoints.model';
import { environment } from 'src/env/environment';
import { TourKeyPoint } from './model/tourKeyPoints.model';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }

  getTourPoint() : Observable<PagedResults<TourPoint>> {
    return this.http.get<PagedResults<TourPoint>>('https://localhost:44333/api/administration/tourPoint');
    
  }
  
  addTourPoint(tourPoint: TourPoint) : Observable<PagedResults<TourPoint>> {
    return this.http.post<PagedResults<TourPoint>>(environment.apiHost + 'administration/tourPoint', tourPoint);
  }

  updateTourPoint(tourPoint: TourPoint) : Observable<TourPoint> {
    return this.http.put<TourPoint>(environment.apiHost + 'administration/tourPoint/' + tourPoint.id, tourPoint)
  }

  deleteTourPoint(tourPoint: TourPoint) : Observable<TourPoint>{
    return this.http.delete<TourPoint>(environment.apiHost + 'administration/tourPoint/' + tourPoint.id);
  }

  addPointToTour(tourKeyPoint: TourKeyPoint) : Observable<TourKeyPoint>{
    return this.http.post<TourKeyPoint>(environment.apiHost + 'api/administration/tourkeypoint', tourKeyPoint);
  }

}
