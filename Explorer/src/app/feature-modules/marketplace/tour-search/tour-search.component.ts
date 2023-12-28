import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from 'src/app/shared/map/map.service';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';
import { Tour } from "../../tour-authoring/tour/model/tour.model";
import { PagedResults } from "../../../shared/model/paged-results.model";
import { GoogleAnalyticsService } from "../../../infrastructure/google-analytics/google-analytics.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit {

  range: number = 0;
  latitude: number = 0;
  longitude: number = 0;
  discount: number = 0;
  isListVisible: boolean = false;

  tours: Tour[] = [];
  tours1: Tour[] = [];
  tours2: Tour[] = [];
  toursfil: Tour[] = [];
  toursDiscMap = new Map<number, number>();
  brTura: number = 0;
  brTura1: number = 0;
  brTura2: number = 0;

  selectedValue = '0';
  selectedLevel = '';
  selectedPrice = '';

  constructor(private service: MarketplaceService,
              private cordinateService: MapService,
              private googleAnalytics: GoogleAnalyticsService
  ) {}

  searchForm = new FormGroup({
    range: new FormControl(0, [Validators.min(0), Validators.required]),
    searchType: new FormControl('0', Validators.required),
    length: new FormControl(100, [Validators.min(0), Validators.required]),
  });

  filterForm = new FormGroup({
    selectedLevel: new FormControl(''),
    selectedPrice: new FormControl(''),
  })

  ngOnInit() {
    this.googleAnalytics.sendPageView(window.location.pathname);
    console.log(window.location.pathname);

    this.cordinateService.coordinate$.subscribe((coordinates) => {
      this.latitude = coordinates.lat;
      this.longitude = coordinates.lng;
    });
  }

  updateSliderValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.discount = parseInt(value);
  }

  search(): void {
    this.tours = [];
    this.toursfil = [];
    this.selectedLevel = '';
    this.selectedPrice = '';
    if (this.searchForm.valid && this.latitude != 0 && this.longitude != 0) {

      this.service.getToursByLocation(this.latitude, this.longitude, this.searchForm.value.range || 0, this.searchForm.value.searchType || '0').subscribe({
        next: (result: PagedResults<Tour>) => {
          this.isListVisible = true;
          this.tours = result.results;
          this.brTura = this.tours.length;
          this.tours2 = result.results;

          if(this.searchForm.value.range) {
            this.cordinateService.setRadius(this.searchForm.value.range);
            this.cordinateService.setArrayCoordinates(this.tours);
            console.log(this.tours);
          }
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
    const observables = this.tours.map((tour) =>
      this.service.getTourDiscount(tour.id || -1)
    );

    forkJoin(observables).subscribe({
      next: (results: number[]) => {
        results.forEach((result, index) => {
          const tour = this.tours[index];

          this.toursDiscMap.set(tour.id || -1, result);

          const discValue = this.toursDiscMap.get(tour.id || -1);

          if (discValue !== undefined && discValue >= this.discount) {
            this.toursfil.push(tour);
          } else {
            this.brTura--;
          }
        });

        this.toursfil.sort((a, b) => a.id! - b.id!);
        this.tours = this.toursfil;

        if(this.searchForm.value.length) {console.log('---lll---'); this.tours = this.tours.filter(tour => tour.tourCharacteristics[0].distance < this.searchForm.value.length!);}
        this.tours2 = this.tours;
        this.brTura = this.tours.length;
        if(this.searchForm.value.range) {
          this.cordinateService.setRadius(this.searchForm.value.range);
          this.cordinateService.setArrayCoordinates(this.tours);
          console.log(this.tours);
        }
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }

  getDisc(id: any, price: any): number {
    const disc = this.toursDiscMap.get(id);
    if (disc !== undefined) {
      return Math.floor((100 - disc) * price / 100);
    } else {
      return price;
    }
  }

  filter(): void {
    var level = "None";
    var price = 0;
    if(this.selectedLevel === '0')
      level = "Easy"
    else if(this.selectedLevel === '1')
      level = "Moderate"
    else if(this.selectedLevel === '2')
      level = 'Difficult'

    if(this.selectedPrice == '0')
      price = 100;
    else if(this.selectedPrice === '1')
      price = 200;
    else if(this.selectedPrice === '2')
      price = 10000;

    console.log("LEVEL: ", level);
    console.log("PRICE", price);
    this.service.getToursByFilters(level, price).subscribe({
      next: (result: PagedResults<Tour>) => {
        this.isListVisible = true;
        this.tours1 = result.results;
        this.brTura1 = this.tours1.length;

        this.tours = [];

        for (let i = 0; i < this.tours1.length; i++) {
          const commonTour = this.tours2.find(tour => tour.id === this.tours1[i].id);
          if (commonTour) {
            this.tours.push(commonTour);
          }
        }
        this.brTura = this.tours.length;
        if(this.searchForm.value.range) {
          this.cordinateService.setRadius(this.searchForm.value.range);
          this.cordinateService.setArrayCoordinates(this.tours);
        }
      }
    });

  }
}
