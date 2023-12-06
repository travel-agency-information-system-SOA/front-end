import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';
import { TourExecutionPosition } from './model/tourExecutionPosition.model';
import { TourE, TourExecution, TourExecutionTourPoint, TourPoint } from './model/tourExecution.model'; 
import { map } from 'rxjs';
import { catchError } from 'rxjs';

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

  

  getById(tourExecutionId: number): Observable<TourExecution> {
    const url = `${environment.apiHost+ 'tourExecution'}/${tourExecutionId}`;
    return this.http.get<TourExecution>(url);
  }

  getByUser(userId: number): Observable<TourExecution>{
    const url = `${environment.apiHost+ 'tourExecution/user'}/${userId}`;
    
    return this.http.get<TourExecution>(url);
  }

  updatePosition(tourExecutionId: number, longitude: number, latitude: number): Observable<any> {
    const url = `${environment.apiHost}tourExecution/${tourExecutionId}/update-position/${longitude}/${latitude}`;
    return this.http.put<any>(url, {});
  }

  updateStatus(tourExecutionId: number, status: string): Observable<TourExecution> {
   
    return this.http.put<TourExecution>(
      environment.apiHost + 'tourExecution/' + tourExecutionId+'/update-status/'+status,
      tourExecutionId
    );
  }
  getPurchasedTours(touristId: number): Observable<PagedResults<TourE>> {
    const url = `${environment.apiHost}tokens/purchasedTours/${touristId}`;
    return this.http.get<PagedResults<TourE>>(url);
  }

  createTourExecution(userId: number, tourId: number | undefined): any {
    const url = `${environment.apiHost}tourExecution/create`;
    console.log(url);
    const body = {
      userId: userId,
      tourId: tourId,
    };
    return this.http.post(url, body);
  }

  getPointsByExecution(executionId: number): Observable<PagedResults<TourExecutionTourPoint>> {
    const url = `${environment.apiHost}tourExecution/getPoints/${executionId}`;
    return this.http.get<PagedResults<TourExecutionTourPoint>>(url);
  }

  getTourPointsByTourId(tourId: number): Observable<PagedResults<TourPoint>> {
    const url = `${environment.apiHost}administration/tourPoint/${tourId}`;
    return this.http.get<PagedResults<TourPoint>>(url);
  }
}