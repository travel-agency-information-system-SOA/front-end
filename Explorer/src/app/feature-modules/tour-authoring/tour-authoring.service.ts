import { HttpClient } from '@angular/common/http';

import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TourPoint } from './model/tourPoints.model';
import { TourObject } from './model/tourObject.model';

import { environment } from 'src/env/environment';
import { Tour } from './tour/model/tour.model';

import { ObjInTour } from './model/objInTour.model';

import { BehaviorSubject } from 'rxjs';
import { TourCharacteristic } from './tour/model/tourCharacteristic.model';
import { TourPointRequest } from '../administration/model/tourpoint-request.model';
import { PublicTourPoint } from './model/publicTourPoint.model';
import { Equipment } from './tour/model/equipment.model';

@Injectable({
  providedIn: 'root',
})
export class TourAuthoringService {
  private tourIdSource = new BehaviorSubject<string>('');
  currentTourId = this.tourIdSource.asObservable();

  tourPointAdded = new EventEmitter<void>();
  transportTypeChanged = new EventEmitter<void>();

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
  /*
  deleteObjInTour(id: number): Observable<TourObject> {
    return this.http.delete<TourObject>(
      environment.apiHost + 'administration/objInTour/' + id
    );
  }*/

  updateObject(object: TourObject): Observable<TourObject> {
    return this.http.put<TourObject>(
      environment.apiHost + 'administration/object/' + object.id,
      object
    );
  }
  addTourPoint(tourPoint: TourPoint): Observable<TourPoint> {
    return this.http.post<TourPoint>(
      environment.apiHost + 'administration/tourPoint',
      tourPoint
    );
  }

  addObject(obj: TourObject): Observable<TourObject> {
    return this.http.post<TourObject>(
      environment.apiHost + 'administration/object',
      obj
    );
  }

  addObjInTour(objInTour: ObjInTour): Observable<ObjInTour> {
    return this.http.post<ObjInTour>(
      environment.apiHost + 'administration/objInTour',
      objInTour
    );
  }

  getTourPoint(): Observable<PagedResults<TourPoint>> {
    return this.http.get<PagedResults<TourPoint>>(
      environment.apiHost + 'administration/tourPoint'
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
      environment.apiHost + `administration/tour/${userId}?page=${page}&pageSize=${pageSize}`
    );
  }

  addTour(tour: Tour): Observable<Tour> {
    console.log(tour);
    return this.http.post<Tour>(
      environment.apiHost + 'administration/tour',
      tour
    );
  }

  getTourPointsByTourId(tourId: number): Observable<TourPoint> {
    return this.http.get<TourPoint>(
      environment.apiHost + `administration/tourPoint/${tourId}`
    );
  }

  getObjInTourByTourId(tourId: number): Observable<TourObject[]> {
    return this.http.get<TourObject[]>(
      environment.apiHost + `administration/objInTour/${tourId}`
    );
  }
  getObjectById(id: number): Observable<TourObject> {
    return this.http.get<TourObject>(
      environment.apiHost + `administration/object/${id}`
    );
  }
  changeTourId(tourId: string) {
    this.tourIdSource.next(tourId);
  }

  deleteTour(tour: Tour): Observable<Tour> {
    return this.http.delete<Tour>(
      environment.apiHost + 'administration/tour/deleteAggregate/' + tour.id
    );
  }

  isPublished(tour: Tour): Observable<Tour> {
    console.log(tour.id);

    return this.http.put<Tour>(
      environment.apiHost + 'administration/tour/publish/' + tour.id,
      tour
    );
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(
      environment.apiHost + 'administration/tour/' + tour.id,
      tour
    );
  }

  setTourCharacteristics(
    tourId: number,
    tourCharacteristic: TourCharacteristic
  ): Observable<Tour> {
    console.log(tourId);
    return this.http.put<Tour>(
      environment.apiHost + 'administration/tour/caracteristics/' + tourId,
      tourCharacteristic
    );
  }

  getTourEquipment(id: number): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(
      environment.apiHost + `administration/tourequipment/`+id
    );
  }
  
  emitTourPointAdded(): void {
    this.tourPointAdded.emit();
  }

  emitTransportTypeChanged(): void {
    this.transportTypeChanged.emit();
  }

  getTourByTourId(id: number): Observable<Tour> {
    return this.http.get<Tour>(
      environment.apiHost+ `administration/tour/onetour/${id}`
    );}

 
  AcceptRequest(requestId:number,tourPointId:number,comment:string):Observable<PublicTourPoint>{
    
    return this.http.post<PublicTourPoint>(
      environment.apiHost + 'administration/publicTourPoint/createPublicTourPoint/' + requestId+ '/' + tourPointId+ '/' + 'comment',null);
  }
  RejectRequest(requestId:number,comment:string):Observable<PublicTourPoint>{
    return this.http.put<PublicTourPoint>(
      environment.apiHost + 'tourist/publicTourPointRequest/rejectRequest/' + requestId+'/'+'comment',null);
  }
  getPublicTourPoints(): Observable<PagedResults<PublicTourPoint>> {
    return this.http.get<PagedResults<PublicTourPoint>>(environment.apiHost + 'administration/publicTourPoint');
  }

  archiveTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(
      environment.apiHost + 'administration/tour/archive/' + tour.id,
      tour
    );
  }
}
