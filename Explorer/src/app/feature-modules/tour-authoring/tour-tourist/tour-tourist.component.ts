import { Component, OnInit } from '@angular/core';
import { Tour } from '../tour/model/tour.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { TourAuthoringService } from '../tour-authoring.service';
import { Router } from '@angular/router';
import { PublicTourPoint } from '../model/publicTourPoint.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tour-tourist',
  templateUrl: './tour-tourist.component.html',
  styleUrls: ['./tour-tourist.component.css'],
})
export class TourTouristComponent implements OnInit {
  publicTourPoints: PublicTourPoint[] = [];
  temporaryTourPoints: PublicTourPoint[] = [];
  page: number = 1;
  pageSize: number = 10;
  selectedPublicTP: PublicTourPoint;

  constructor(
    private tokenStorage: TokenStorage,
    private service: TourAuthoringService,
    private router: Router
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

  onAddPublicTP(publictp: PublicTourPoint) {
    this.selectedPublicTP = publictp;
    this.temporaryTourPoints.push(this.selectedPublicTP);
    this.publicTourPoints = this.publicTourPoints.filter(
      (ptp) => ptp !== this.selectedPublicTP
    );
    console.log(this.temporaryTourPoints[0]);
  }

  findTours() {
    this.service
      .findTours(this.temporaryTourPoints, this.page, this.pageSize)
      .subscribe();
  }
}
