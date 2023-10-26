import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourReview } from './model/tourReview.model';
import { environment } from 'src/env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Injectable({
  providedIn: 'root'
})
export class TourReviewService {

  _observableList: BehaviorSubject<TourReview[]> = new BehaviorSubject<TourReview[]>([]);
  constructor(private http: HttpClient) { }

  create(tourReview: TourReview): Observable<TourReview>{
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview', tourReview);
  }

  getAll():Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(environment.apiHost+ 'tourist/tourReview');
  }

  delete(tourReview: TourReview): Observable<TourReview>{
    return this.http.delete<TourReview>(environment.apiHost + 'tourist/tourReview/' + tourReview.id);
  }

  update(tourReview: TourReview): Observable<TourReview>{
    return this.http.put<TourReview>(environment.apiHost + 'tourist/tourReview/' + tourReview.id, tourReview);
  }
}
