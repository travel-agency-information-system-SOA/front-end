import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encounter } from './model/encounter.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { SocialEncounter } from './model/social-encounter.model';
import { HiddenLocationEncounter } from './model/hidden-location-encounter.model';

@Injectable({
  providedIn: 'root'
})
export class EncountersService {

  constructor(private http: HttpClient) { }

  getEncounters(): Observable<PagedResults<Encounter>> {
    return this.http.get<PagedResults<Encounter>>(environment.apiHost + 'encounters');
  }

  getSocialEncounters(): Observable<PagedResults<SocialEncounter>> {
    return this.http.get<PagedResults<SocialEncounter>>(environment.apiHost + 'encounters/social');
  }

  getHiddenLocationEncounters(): Observable<PagedResults<HiddenLocationEncounter>> {
    return this.http.get<PagedResults<HiddenLocationEncounter>>(environment.apiHost + 'encounters/hiddenLocation');
  }

  addEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.post<Encounter>(environment.apiHost + 'encounters', encounter);
  }

  addSocialEncounter(encounter: SocialEncounter): Observable<SocialEncounter>{
    return this.http.post<SocialEncounter>(environment.apiHost + 'encounters/social', encounter);
  }

  addHiddenLocationEncounter(encounter: HiddenLocationEncounter): Observable<HiddenLocationEncounter>{
    return this.http.post<HiddenLocationEncounter>(environment.apiHost + 'encounters/hiddenLocation', encounter);
  }

  updateEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.put<Encounter>(environment.apiHost + 'encounters', encounter);
  }

  updateSocialEncounter(encounter: SocialEncounter): Observable<SocialEncounter>{
    return this.http.put<SocialEncounter>(environment.apiHost + 'encounters/social', encounter);
  }

  updateHiddenLocationEncounter(encounter: HiddenLocationEncounter): Observable<HiddenLocationEncounter>{
    return this.http.put<HiddenLocationEncounter>(environment.apiHost + 'encounters/hiddenLocation', encounter);
  }

  deleteEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.delete<Encounter>(environment.apiHost + 'encounters/' + encounter.id);
  }
    
  
}