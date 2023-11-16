import { Component, OnInit } from '@angular/core';
import { TourExecutionService } from '../tour-execution.service';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-purchased-tours',
  templateUrl: './purchased-tours.component.html',
  styleUrls: ['./purchased-tours.component.css']
})
export class PurchasedToursComponent implements OnInit{
  
  tours: Tour[] = []
  touristId: number


  constructor(private service: TourExecutionService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getLogedUser()
    this.getPurchasedTours()
  }

  getLogedUser(): void{
    this.auth.user$.subscribe((user) => {
      if (user.username) {
       this.touristId = user.id
      }
    });
  }
  
  getPurchasedTours(): void {
    this.service.getPurchasedTours(this.touristId).subscribe({
      next: (result: Tour[]) => {
        this.tours = result;
      },
      error: () => {
      }
    })
  }

}
