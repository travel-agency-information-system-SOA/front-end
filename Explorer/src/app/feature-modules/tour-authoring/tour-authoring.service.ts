import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourPoint } from './model/tourPoints.model';
import { TourObject } from './model/tourObject.model';

import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TourAuthoringService {

  constructor(private http: HttpClient) { }


  getObjects(): Observable<PagedResults<TourObject>> {
    const list = this.http.get<PagedResults<TourObject>>(environment.apiHost + 'administration/object');
    console.log('Lisf objects:', list);
    return list;
  }

  deleteObject(id: number): Observable<TourObject>{
    return this.http.delete<TourObject>(environment.apiHost + 'administration/object/' + id);
  }

  updateObject(object: TourObject): Observable<TourObject> {
    return this.http.put<TourObject>(environment.apiHost + 'administration/object/' + object.id, object);
  }

  addObject(obj: TourObject): Observable<TourObject>{
    return this.http.post<TourObject>(environment.apiHost + 'administration/object', obj);
  }

}
