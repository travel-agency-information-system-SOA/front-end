
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Account } from './model/account.model';
import { TourPoint } from '../tour-authoring/model/tourPoints.model';
import { Profile } from './model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {}

  /*getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(
      environment.apiHost + 'administration/equipment'
    );
  }

  deleteEquipment(id: number): Observable<Equipment> {
    return this.http.delete<Equipment>(
      environment.apiHost + 'administration/equipment/' + id
    );
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(
      environment.apiHost + 'administration/equipment',
      equipment
    );
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(
      environment.apiHost + 'administration/equipment/' + equipment.id,
      equipment
    );
  }*/

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.apiHost + 'administration/accounts');
  }

  changeAccountStatus(account: Account): Observable<Account> {
    return this.http.put<Account>(environment.apiHost + 'administration/accounts/' + account.userId, account);
  }


  getProfile(id: number): Observable<Profile>{
    return this.http.get<Profile>('https://localhost:44333/api/profile/' + id);
  }

  updateProfile(profile: Profile, id: number): Observable<Profile>{
    return this.http.put<Profile>('https://localhost:44333/api/profile/' + id, profile);
  }

}
