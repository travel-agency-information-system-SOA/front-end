import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(private service: MapService) {}

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
  }

  registerOnClick():  void {
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
}
