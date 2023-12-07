import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { TourPurchaseToken } from '../../marketplace/model/TourPurchaseToken.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-purchased-tours',
  templateUrl: './purchased-tours.component.html',
  styleUrls: ['./purchased-tours.component.css']
})
export class PurchasedToursComponent implements OnInit{
  
  tours: Tour[] = []
  touristId: number
  tokens: TourPurchaseToken[] = []


  constructor(private service: MarketplaceService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getLogedUser()
    this.getPurchasedTours()
  }

  getLogedUser(): void{
    this.auth.user$.subscribe((user) => {
      if (user.username) {
       this.touristId = user.id
       console.log(this.touristId)
      }
    });
  }
  
  /*getPurchasedTours(): void {
    this.service.getPurchasedTours(this.touristId).subscribe({
      next: (result: Tour[]) => {
        this.tours = result;
      },
      error: () => {
      }
    })
  }*/

  getPurchasedTours(): void {
    this.service.getAllTokens().subscribe({
      next: (result) => {
        this.tokens = result.results;
        console.log(this.tokens.length)
        this.tours.length = 0
        this.tokens.forEach(token => this.getTourByTourId(token));
      },
      error: () => {
      }
    })
  }

  getTourByTourId(token: TourPurchaseToken) : void {
    if(token.touristId === this.touristId) {
      console.log("asfafafdsf")
      this.service.getTourByTourId(token.idTour).subscribe({
        next: (tour: Tour) => {
          this.tours.push(tour)
          console.log("ALOOOOOO")
        },
        error: () => {
        }
      })
    }
  }


  showTourDetails(tourId: number | undefined): void {
    this.router.navigate(['purchasedTours', tourId]);
  
  }
  startTour(tourId: number | undefined) : void{
    this.router.navigate(['purchasedTours/' + tourId]);
  }

}
