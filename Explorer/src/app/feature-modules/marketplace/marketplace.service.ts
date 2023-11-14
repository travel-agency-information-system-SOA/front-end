import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { GuideReview } from './model/guide-review.model';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/env/environment';
import { Preferences } from "./model/preferences.model";
import { TouristEquipment } from './model/touristEquipment.model';
import { Equipment } from '../tour-authoring/tour/model/equipment.model';
import { NonNullAssert } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getGuideReviews(): Observable<PagedResults<GuideReview>> {
    return this.http.get<PagedResults<GuideReview>>('https://localhost:44333/api/review/guideReview');
  }

  addGuideReview(guideReview: GuideReview):  Observable<GuideReview> {
    return this.http.post<GuideReview>(environment.apiHost + 'review/guideReview', guideReview);
  }

  updateGuideReview(guideReview: GuideReview):  Observable<GuideReview> {
    return this.http.put<GuideReview>(environment.apiHost + 'review/guideReview/' + guideReview.id, guideReview);
  }

  deleteGuideReview(guideReview: GuideReview):  Observable<GuideReview> {
    return this.http.delete<GuideReview>(environment.apiHost + 'review/guideReview/' + guideReview.id);
  }
  getPreferences(): Observable<PagedResults<Preferences>> {
    return this.http.get<PagedResults<Preferences>>(environment.apiHost + 'marketplace/preferences');
  }

  addPreferences(preferences: Preferences): Observable<Preferences> {
    return this.http.post<Preferences>(environment.apiHost + 'marketplace/preferences', preferences);
  }

  updatePreferences(preferences: Preferences): Observable<Preferences> {
    return this.http.put<Preferences>(environment.apiHost + 'marketplace/preferences/' + preferences.id, preferences);
  }

  deletePreferences(preferences: Preferences): Observable<Preferences> {
    return this.http.delete<Preferences>(environment.apiHost + 'marketplace/preferences/' + preferences.id);
  }

  getUserPreferences(id: number): Observable<Preferences> {
    return this.http.get<Preferences>(environment.apiHost + 'marketplace/preferences/' + id);
  }
  
 
  
  getAllEquipmet():Observable<PagedResults<Equipment>>{
    return this.http.get<PagedResults<Equipment>>(environment.apiHost+'administration/equipment');
  }

  updateTouristEquipment(te:TouristEquipment): Observable<Preferences> {
    return this.http.put<Preferences>(environment.apiHost + 'tourist/touristEquipment/' + te.id, te);
  }






  getTouristEquipment(id: number): Observable<TouristEquipment> {
    return this.http.get<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment/getTouristEquipment/' + id);
  }
  createTouristEquipment(id: number): Observable<TouristEquipment> {
    return this.http.post<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment/createTouristEquipment/' + id,null);
  }

  getMyEquipment(ids:number[]): Observable<Equipment[]> {
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('ids', id.toString());
    }
    
    return this.http.get<Equipment[]>(environment.apiHost + 'administration/equipment/getTouristEquipment/', { params: params });
  }

  getOtherEquipment(ids:number[]): Observable<Equipment[]> {
    let params = new HttpParams();
    for (const id of ids) {
      params = params.append('ids', id.toString());
    }
    
    return this.http.get<Equipment[]>(environment.apiHost + 'administration/equipment/getOtherEquipment', { params: params });
  }

  addToMyEquipment(touristId: number, equipmentId: number): Observable<TouristEquipment> {
    return this.http.put<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment/addToMyEquipment/' + touristId + '/' + equipmentId, null);
  }
  removeFromMyEquipment(touristId: number, equipmentId: number): Observable<TouristEquipment> {
    return this.http.put<TouristEquipment>(environment.apiHost + 'tourist/touristEquipment/deleteFromMyEquipment/' + touristId + '/' + equipmentId, null);
  }
}
  

