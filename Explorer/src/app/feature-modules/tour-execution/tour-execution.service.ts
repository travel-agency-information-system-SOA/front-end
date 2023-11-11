import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { TourExecutionPosition } from './model/tourExecutionPosition.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  addTourExecutionPosition(tourExecutionPosition: TourExecutionPosition): Observable<TourExecutionPosition> {
    return this.http.post<TourExecutionPosition>(
      environment.apiHost + 'administration/tourExecutionPosition',
      tourExecutionPosition
    );
  }

  updateTourExecutionPosition(tourExecutionPosition: TourExecutionPosition): Observable<TourExecutionPosition> {
    return this.http.put<TourExecutionPosition>(
      environment.apiHost + 'administration/tourExecutionPosition/' + tourExecutionPosition.id,
      tourExecutionPosition
    );
  }

}
