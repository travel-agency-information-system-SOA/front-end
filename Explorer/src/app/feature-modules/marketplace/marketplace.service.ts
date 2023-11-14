import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { GuideReview } from './model/guide-review.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Preferences } from "./model/preferences.model";
import { Problem } from './model/problem.model';
import { ProblemMessage } from './model/problem-message.model';
import { AdministrationService } from '../administration/administration.service';
import { Profile } from '../administration/model/profile.model';

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

  getGuideProblems(id: number): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem/byGuide/' + id);
  }

  addMessage(message: ProblemMessage): Observable<ProblemMessage> {
    return this.http.post<ProblemMessage>(environment.apiHost + 'administration/message', message);
  }

  getMessagesByProblemId(id: number): Observable<PagedResults<ProblemMessage>> {
    return this.http.get<PagedResults<ProblemMessage>>(environment.apiHost + 'administration/message/' + id);
  }

  isThereUnreadMessage(id: number): Observable<number> {
    return this.http.get<number>(environment.apiHost + 'problem/byUnreadMessages/' + id);
  }

  getTourstProblems(id: number): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem/byTourist/' + id);
  }

  updateProblemIsSolved(problem: Problem): Observable<Problem>{
    return this.http.put<Problem>(environment.apiHost + 'problem/' + problem.id, problem);
  }

  getUnsolvedProblems(): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem/unsolved');
  }

  addDeadline(problem: Problem): Observable<Problem>{
    console.log("PORUKE PROBLEMA", problem.problemMessages);
    return this.http.put<Problem>(environment.apiHost + 'problem/' + problem.id, problem);
  }

  deleteProblem(problem: Problem): Observable<Problem> {
    return this.http.delete<Problem>(environment.apiHost + 'problem/' + problem.id);
  }

  getProblemWithClosestDeadline(id: number): Observable<Problem> {
    return this.http.get<Problem>(environment.apiHost + 'problem/closestDeadline/' + id);
  }

  readMessages(message: ProblemMessage): Observable<void> {
    return this.http.put<void>(environment.apiHost + 'administration/message/' + message.id, message);
  }
}
