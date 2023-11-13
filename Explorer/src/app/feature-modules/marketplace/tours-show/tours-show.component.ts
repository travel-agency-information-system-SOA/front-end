import { Component } from '@angular/core';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { MarketPlaceService } from '../market-place.service';
import { MarketplaceService } from '../marketplace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tours-show',
  templateUrl: './tours-show.component.html',
  styleUrls: ['./tours-show.component.css']
})
export class ToursShowComponent {

  tours: Tour[]=[];

  constructor(private marketplaceService: MarketplaceService, private router: Router){
    this.getAllTours();
  }

  getAllTours(){
    this.marketplaceService.getAllTours().subscribe({
      next: (response)=>{
        this.tours=response.results;
        console.log("Ture:", this.tours);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  rateTour(tour: Tour){
    this.router.navigate(['/tourReviewForm', tour.id])
  }

}
