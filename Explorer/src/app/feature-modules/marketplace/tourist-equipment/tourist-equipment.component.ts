import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { TouristEquipment } from '../model/touristEquipment.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Equipment } from '../../tour-authoring/tour/model/equipment.model';

@Component({
  selector: 'xp-tourist-equipment',
  templateUrl: './tourist-equipment.component.html',
  styleUrls: ['./tourist-equipment.component.css']
})
export class TouristEquipmentComponent implements OnInit {

  
  tEquipment: TouristEquipment;
  loggedInUser:number;
  equipmentIds:number[];
  equipments:Equipment[];
  otherEquipment:Equipment[]
  
  constructor(private service:MarketplaceService,private authService:AuthService){
    this.getLoggedInUser();
    this.tEquipment = {id: 0,touristId: this.loggedInUser , equipment: [] };
    this.equipments = [];
  }

  getLoggedInUser(){
    this.authService.user$.subscribe(user=>{
      if(user){
        this.loggedInUser = user.id;
        console.log('Id ulogovanog: '+this.loggedInUser);
      }
    })
  }

  getAllEquipmentForTourist(ids: number[]): void {
    console.log("Usao: " + ids);
    this.service.getOtherEquipment(ids).subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.equipments = result.results;
        console.log("oprema turiste: " + this.equipments);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.getOtherEquipment(ids);
  }
  
  
  
  
  
  
  getOtherEquipment(ids: number[]):void{
    this.service.getOtherEquipment(ids).subscribe({
      next:(result:PagedResults<Equipment>)=>{
        this.otherEquipment = result.results;
      } 
    })
  }
  
  onAddClicked(e:Equipment):void{
    if (e.id !== undefined){
      this.service.addToMyEquipment(this.loggedInUser, e.id).subscribe({
        next:(result: TouristEquipment)=>{
          this.tEquipment = result;
        } 
      })
    }
  
  //this.equipments.push(e);
    
    
  // Uklonite opremu iz liste `otherEquipment`
    //this.getOtherEquipment();

  // Dodajte ID opreme u listu opreme `tEquipment`
  //if (e.id !== undefined) {
    //this.tEquipment.equipment.push(e.id);
    //this.service.updateTouristEquipment(this.tEquipment).subscribe({
      //next: (response)=>{
        //console.log(response)
      //},
      //error: (error)=>{
        //console.log(error);
      //}
    //})
  //}
  //location.reload();
  
  }

  deleteEquipment(e:Equipment):void{
    if (e.id !== undefined) {
        const index = this.tEquipment.equipment.indexOf(e.id);
        if (index !== -1) {
          this.tEquipment.equipment = this.tEquipment.equipment.filter(item => item !== e.id);
        }
      
      this.service.updateTouristEquipment(this.tEquipment).subscribe({
        next: (response)=>{
          console.log(response)
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }
    
    if(e.id !== undefined){
      this.equipmentIds = this.equipmentIds.filter(item => item !== e.id);  
      this.getAllEquipmentForTourist(this.equipmentIds);
    }
    
  }

  ngOnInit(): void {
    this.service.getTouristEquipment(this.loggedInUser).subscribe({
      next: (result: TouristEquipment) => {
        console.log("Lista rezultaa: ", result);
        this.tEquipment = result;
        this.equipmentIds = result.equipment;
        console.log("REz dobijen za ideve: " + result.equipment);
        this.getAllEquipmentForTourist(this.equipmentIds);
      },error: (err: any) => {
        console.log(err);
      }
    })
     
    
    }

}
