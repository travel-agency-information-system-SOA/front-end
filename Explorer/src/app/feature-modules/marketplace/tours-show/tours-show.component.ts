import { Component } from '@angular/core';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { Router } from '@angular/router';
import { ReviewTour } from './ReviewTour.model';

@Component({
  selector: 'xp-tours-show',
  templateUrl: './tours-show.component.html',
  styleUrls: ['./tours-show.component.css']
})
export class ToursShowComponent {

  tours:ReviewTour [];
  averageGrade: number;
  constructor(private marketplaceService: MarketplaceService, private router: Router){
    this.getAllTours();
    
  }

  getAllTours(){
    this.marketplaceService.getAllTours().subscribe({
      next: (response)=>{
        this.tours=response.results;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  rateTour(tour: ReviewTour){
    
    this.router.navigate(['/tourReviewForm', tour.id])
  }

  calculateAverageGrade(tour:ReviewTour){
    const reviews= tour.tourReviews;
    if (reviews.length === 0) {
     return  0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.grade, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating;
  }
}
