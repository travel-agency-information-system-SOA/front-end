import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../../tour-authoring/tour/model/tour.model';

@Component({
  selector: 'xp-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit{

  tour: Tour = {} as Tour;

  constructor(private service: MarketplaceService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const tourId = +this.route.snapshot.paramMap.get('id')!;
    this.service.getSelectedTour(tourId).subscribe({
      next: (result: Tour)=>{
        this.tour = result;
        console.log(this.tour.price);
      },
      error: (err: any) =>{
        console.log(err)
      }
    });
    
    
  }
}
