import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encounter } from './model/encounter.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { EncounterExecution } from './model/encounter-execution.model';

@Injectable({
  providedIn: 'root'
})
export class EncountersService {

  constructor(private http: HttpClient) { }

  getEncounters(): Observable<PagedResults<Encounter>> {
    return this.http.get<PagedResults<Encounter>>(environment.apiHost + 'encounters');
  }

  addEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.post<Encounter>(environment.apiHost + 'encounters', encounter);
  }

  updateEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.put<Encounter>(environment.apiHost + 'encounters/' + encounter.id, encounter);
  }

  deleteEncounter(encounter: Encounter): Observable<Encounter>{
    return this.http.delete<Encounter>(environment.apiHost + 'encounters/' + encounter.id);
  }

  getByUser(userId: number): Observable<EncounterExecution>{
    const url = `${environment.apiHost+ 'encounterExecution/getActive'}/${userId}`;
    
    return this.http.get<EncounterExecution>(url);
  }
  
  getEncounterById(encounterId: number): Observable<Encounter>{
    const url = `${environment.apiHost+ 'encounters/getEncounter'}/${encounterId}`;
    return this.http.get<Encounter>(url);
  }

  checkSocialEncounter(encounterId: number): Observable<PagedResults<EncounterExecution>>{
    const url = `${environment.apiHost+ 'encounterExecution/checkSocialEncounter'}/${encounterId}`;
    return this.http.get<PagedResults<EncounterExecution>>(url);
  }

  checkHiddenEncounter(executionId: number, encounterId: number): Observable<boolean> {
    const url = `${environment.apiHost+ 'encounterExecution/checkHidden'}/${executionId}/${encounterId}`;
    console.log(url);
    return this.http.get<boolean>(url);
  }

  completeExecution(userId: number): Observable<boolean> {
    console.log("usao u servis")
    const url = `${environment.apiHost+ 'encounterExecution/completeExecution'}/${userId}`;
    console.log(url);
    return this.http.put<boolean>(url, null);
  }

  
}
