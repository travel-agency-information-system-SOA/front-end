import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagedResults } from "../../shared/model/paged-results.model";
import { Preferences } from "./model/preferences.model";
import { environment } from "../../../env/environment";

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

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
}
