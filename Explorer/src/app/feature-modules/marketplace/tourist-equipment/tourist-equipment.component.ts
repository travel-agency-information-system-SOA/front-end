import { Component, OnInit } from '@angular/core';
import { MarketPlaceService } from '../market-place.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TouristEquipment } from '../model/touristEquipment.model';

@Component({
  selector: 'xp-tourist-equipment',
  templateUrl: './tourist-equipment.component.html',
  styleUrls: ['./tourist-equipment.component.css']
})
export class TouristEquipmentComponent implements OnInit {

  tEquipment: TouristEquipment[] = [];

  
  constructor(private service:MarketPlaceService){}
  ngOnInit(): void {
    this.service.getTouristEquipment().subscribe({
      next:(result:PagedResults<TouristEquipment>)=>{
        console.log("Lista rezultaa: ", result.results);
        this.tEquipment = result.results;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

}
