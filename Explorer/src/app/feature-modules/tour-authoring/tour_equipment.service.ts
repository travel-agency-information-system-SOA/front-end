import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourEquipmentService {

  constructor(private http: HttpClient) { }

  addEquipment(tourId: number, equipmentId: number): Observable<any> {
    const requestBody = {
      tourId: tourId,
      equipmentId: equipmentId
    };

    // Koristite HTTP POST za dodavanje opreme turi u međutabeli
    return this.http.post<any>(environment.apiHost + 'administration/tourequipment', requestBody);
  }
}
