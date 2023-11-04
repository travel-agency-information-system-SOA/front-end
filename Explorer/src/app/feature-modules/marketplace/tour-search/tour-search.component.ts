import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from 'src/app/shared/map/map.service';
import { MarketplaceService } from 'src/app/feature-modules/marketplace/marketplace.service';

@Component({
  selector: 'xp-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent {

  range: number = 0;

  constructor(private service: MarketplaceService, private cordinateService: MapService) {}

  searchForm = new FormGroup({
    range: new FormControl('', [Validators.min(0)]),
  });

  search(): void {
    let latitude: number = 0;
    let longitude: number = 0;

    this.cordinateService.coordinate$.subscribe((coordinates) => {
      latitude = coordinates.lat;
      longitude = coordinates.lng;
    });

    
    this.service.getToursByLocation(latitude, longitude, this.range).subscribe({
      next: () => {

      }
    });
  }
}
