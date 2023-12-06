import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from 'src/app/shared/map/map.service';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';
import { Tour } from "../../tour-authoring/tour/model/tour.model";
import { PagedResults } from "../../../shared/model/paged-results.model";
import { GoogleAnalyticsService } from "../../../infrastructure/google-analytics/google-analytics.service";

@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit {

  range: number = 0;
  latitude: number = 0;
  longitude: number = 0;
  isListVisible: boolean = false;

  tours: Tour[] = [];
  toursDiscMap = new Map<number, number>();
  brTura: number = 0;

  constructor(private service: MarketplaceService,
              private cordinateService: MapService,
              private googleAnalytics: GoogleAnalyticsService
  ) {}

  searchForm = new FormGroup({
    range: new FormControl(0, [Validators.min(0), Validators.required]),
  });

  ngOnInit() {
    this.googleAnalytics.sendPageView(window.location.pathname);
    console.log(window.location.pathname);

    this.cordinateService.coordinate$.subscribe((coordinates) => {
      this.latitude = coordinates.lat;
      this.longitude = coordinates.lng;
    });
  }

  search(): void {
    if (this.searchForm.valid && this.latitude != 0 && this.longitude != 0) {

      this.service.getToursByLocation(this.latitude, this.longitude, this.searchForm.value.range || 0).subscribe({
        next: (result: PagedResults<Tour>) => {
          this.isListVisible = true;
          this.tours = result.results;
          this.brTura = this.tours.length;
          this.getDiscounts();
          console.log(this.brTura);
        },
        error: (err) => {
          this.isListVisible = false;
          console.error('Error: ', err);
        }
      });
    }
  }

  getDiscounts(): void {
    this.tours.forEach((tour) => {
      console.log(tour);
      this.service.getTourDiscount(tour.id || -1).subscribe({
        next: (result: number) => {
          this.toursDiscMap.set(tour.id || -1, result);
        },
        error: (err) => {
          console.error('Error: ', err);
        }
      });
    });
  }

  getDisc(id: any, price: any): number {
    const disc = this.toursDiscMap.get(id);
    if (disc !== undefined) {
      return (100-disc)*price/100;
    } else {
      // Handle the case where the id is not found (you can throw an error or return a default value)
      // For now, returning undefined
      return price;
    }
  }
}
