import { Component, OnInit } from '@angular/core';

import { TourService } from '../tour.service';
import { Tour } from './model/tour.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  tour: Tour[] = [];
  page: number = 1;
  pageSize: number = 5;
  tourCounter: number;
  shouldAddPoint: boolean = false;
  ANA_PROMENI: boolean = false;
  selectedTour: Tour;

  constructor(
    private service: TourService,
    private tokenStorage: TokenStorage
  ) {}

  loadTours() {
    const userId = this.tokenStorage.getUserId();

    this.service.getTourByGuide(userId, this.page, this.pageSize).subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tour = result.results;
        this.tourCounter = result.totalCount;
        console.log(result.results);
      },

      error(err: any) {
        console.log(err);
      },
    });
  }

  showMoreTours() {
    this.page++;
    this.loadTours();
  }

  showLessTours() {
    this.page--;
    this.loadTours();
  }

  ngOnInit(): void {
    this.loadTours();
    console.log(this.pageSize);
  }

  onAddPoint(tour: Tour) : void {
    console.log(tour);
    this.selectedTour = tour;
    this.shouldAddPoint = true;
  }
}
