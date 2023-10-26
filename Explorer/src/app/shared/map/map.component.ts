import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';

import 'leaflet-routing-machine';

import { Observable, forkJoin } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TourAuthoringService } from 'src/app/feature-modules/tour-authoring/tour-authoring.service';
import { TourPoint } from 'src/app/feature-modules/tour-authoring/model/tourPoints.model';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  tourId: string;
  objects: { latitude: number; longitude: number }[];

  constructor(
    private service: MapService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private tourAuthoringService: TourAuthoringService
  ) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
    this.setRoute();
  }

  ngOnInit() {
    this.tourAuthoringService.currentTourId.subscribe((tourId) => {
      this.tourId = tourId;
    });

    this.tourAuthoringService
      .getObjInTourByTourId(parseInt(this.tourId))
      .pipe(
        mergeMap((objectIds: number[]) => {
          const objectRequests = objectIds.map((objectId: number) =>
            this.tourAuthoringService.getObjectById(objectId)
          );

          return forkJoin(objectRequests);
        })
      )
      .subscribe(
        (objects: any) => {
          this.objects = objects;
          this.objects.forEach((object) => {
            L.marker([object.latitude, object.longitude]).addTo(this.map);
          });
          console.log('Dohvaćeni objekti:', objects);
        },
        (error) => {
          console.error('Greška prilikom dohvatanja objekata:', error);
        }
      );
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.service.setCoordinates({ lat, lng });
      this.service.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      const mp = new L.Marker([lat, lng]).addTo(this.map);
      alert(mp.getLatLng());
    });
  }

  setRoute(): void {
    this.tourAuthoringService
      .getTourPointsByTourId(parseInt(this.tourId))
      .subscribe((tourData: any) => {
        const tourPoints = tourData.results;

        const waypoints = tourPoints.map((point: any) =>
          L.latLng(point.latitude, point.longitude)
        );

        const routeControl = L.Routing.control({
          waypoints: waypoints,
          router: L.routing.mapbox(
            'pk.eyJ1IjoiYW5hYm9za292aWNjMTgiLCJhIjoiY2xvNHZrNjd2MDVpcDJucnM3M281cjE0OSJ9.y7eV9FmLm7kO_2FtrMaJkg',
            { profile: 'mapbox/walking' }
          ),
        }).addTo(this.map);
      });
  }
}
