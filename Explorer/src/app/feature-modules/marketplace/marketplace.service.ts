import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { GuideReview } from './model/guide-review.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Preferences } from "./model/preferences.model";
import { TourReview } from './model/tourReview.model';
import { Tour } from '../tour-authoring/tour/model/tour.model';
import { ReviewTour } from './tours-show/ReviewTour.model';


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


  getToursByLocation(latitude: number, longitude: number, range:number): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost+ 'administration/tour/search/' + latitude + '/' + longitude + '/' + range);
  }
  createReview(tourReview: TourReview): Observable<TourReview>{
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview', tourReview);
  }

  getAllReviews():Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(environment.apiHost+ 'tourist/tourReview');
  }

  deleteReview(tourReview: TourReview): Observable<TourReview>{
    return this.http.delete<TourReview>(environment.apiHost + 'tourist/tourReview/' + tourReview.id);
  }

  updateReview(tourReview: TourReview): Observable<TourReview>{
    return this.http.put<TourReview>(environment.apiHost + 'tourist/tourReview/' + tourReview.id, tourReview);
  }
  getAllTours():Observable<PagedResults<ReviewTour>> {
    return this.http.get<PagedResults<ReviewTour>>(environment.apiHost+ 'administration/tour/allTours');

  }
}
