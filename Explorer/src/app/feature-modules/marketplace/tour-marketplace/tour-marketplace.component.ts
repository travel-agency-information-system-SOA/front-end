import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-tour-marketplace',
  templateUrl: './tour-marketplace.component.html',
  styleUrls: ['./tour-marketplace.component.css']
})
export class TourMarketplaceComponent implements OnInit{

  tours: Tour[] = [];
  clickedTour: Tour;

  constructor(private service: MarketplaceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getPublishedTours().subscribe({
      next: (result: PagedResults<Tour>)=>{
        this.tours = result.results;
      },
      error: (err: any) =>{
        console.log(err)
      }
    });
  }

  showTourDetails(tourId: number | undefined): void {
      this.router.navigate(['marketplace', tourId]);
    
  }

  viewMap(idTour: number | undefined): void {
    if (idTour !== undefined) {
      this.service.viewForTourist.emit();
      this.router.navigate([`/tourMapFirstPoint/${idTour}`]);
    } else {
      console.error('ID nije definisan.');
    }
  }



}
