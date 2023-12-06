import { Component, OnInit } from '@angular/core';
import { Tour } from '../tour/model/tour.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { TourAuthoringService } from '../tour-authoring.service';
import { Router } from '@angular/router';
import { PublicTourPoint } from '../model/publicTourPoint.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'xp-tour-tourist',
  templateUrl: './tour-tourist.component.html',
  styleUrls: ['./tour-tourist.component.css'],
})
export class TourTouristComponent implements OnInit {
  publicTourPoints: PublicTourPoint[] = [];
  tours: Tour[] = []; 
  selectedTour: Tour;
  temporaryTourPoints: PublicTourPoint[] = [];
  shouldRenderTourForm: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  showTourForm: boolean = false;

  selectedPublicTP: PublicTourPoint;

  constructor(
    private tokenStorage: TokenStorage,
    private service: TourAuthoringService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPublicTourPoints();
  }

  loadPublicTourPoints() {
    this.service
      .getPublicPoints(this.page, this.pageSize)
      .subscribe((pagedResults: PagedResults<PublicTourPoint>) => {
        this.publicTourPoints = pagedResults.results;
        console.log(this.publicTourPoints);
      });
  }
  addTour() {
    this.showTourForm = true;
    this.shouldRenderTourForm = false;
  }

  onAddTourClicked() {
    this.showTourForm = false;
  }

  onAddPublicTP(publictp: PublicTourPoint) {
    this.selectedPublicTP = publictp;
    this.temporaryTourPoints.push(this.selectedPublicTP);
    this.publicTourPoints = this.publicTourPoints.filter(
      (ptp) => ptp !== this.selectedPublicTP
    );
    // this.cdr.detectChanges(); // Ručno pokreni Angular Change Detection

    console.log("Temp kt",this.temporaryTourPoints);
  }
  findTours() {
    console.log('Temporary Tour Points:', this.temporaryTourPoints);
    this.service
      .findTours(this.temporaryTourPoints, this.page, this.pageSize)
      .subscribe((pagedResults: PagedResults<Tour>) => {
        this.tours = pagedResults.results;
        console.log(this.tours);
      });
  }
  
}

