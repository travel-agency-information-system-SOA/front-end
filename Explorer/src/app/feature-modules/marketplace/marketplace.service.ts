import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { GuideReview } from './model/guide-review.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';

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
}
