import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../tour-authoring/tour/model/tour.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class CompetitionServiceService {
  constructor(private http: HttpClient) {}

  getTourByGuide(
    userId: number,
    page: number,
    pageSize: number
  ): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(
      environment.apiHost +
        `administration/tour/${userId}?page=${page}&pageSize=${pageSize}`
    );
  }
}
