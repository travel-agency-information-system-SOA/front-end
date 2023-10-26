import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TouristEquipment } from './model/touristEquipment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceService {
  loggedInUser:User;
  constructor(private http:HttpClient,private authService: AuthService) { }

  

  getTouristEquipment():Observable<PagedResults<TouristEquipment>>{
    const url = `${environment.apiHost}tourist/touristEquipment`;
    console.log("Urrl",url);
    return this.http.get<PagedResults<TouristEquipment>>(url);
  }
}
