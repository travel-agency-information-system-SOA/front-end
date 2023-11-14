import { Component,
  OnChanges,
  SimpleChanges} from '@angular/core';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { TourExecutionService } from '../tour-execution.service';
import { TourExecution } from '../model/tourExecution.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AdministrationService } from '../../administration/administration.service';
import { Router } from '@angular/router';


//import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'xp-active-tour',
  templateUrl: './active-tour.component.html',
  styleUrls: ['./active-tour.component.css']
})
export class ActiveTourComponent implements OnChanges{
  activeTour: TourExecution;
  userId: number = this.tokenStorage.getUserId();
  shouldEdit:boolean
  idPosition:number|undefined
  tourId:number=0;
  
 // tourExecution:TourExecution
  constructor(private service:TourExecutionService,
              private tokenStorage: TokenStorage,
              private router:Router,
              private administrationService:AdministrationService
             
      ){}

  ngOnInit(): void {
    this.checkUserPosition();
    this.getTourExecutionByUser(this.userId);
   
    //this.updatePosition();
    
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.activeTourForm.reset();
      if (this.shouldEdit) {
        
        const formValues = {
        
        latitude: this.activeTour.position.latitude,
        longitude: this.activeTour.position.longitude,
      };
        this.activeTourForm.patchValue(formValues);
      }
    }
    activeTourForm = new FormGroup({
      latitude: new FormControl(0, [Validators.required]),
      longitude: new FormControl(0, [Validators.required]),
    });
  getTourExecution(userId: number){
    this.service.getById(userId).subscribe(
      (result) => {
        this.activeTour = result;
        console.log(this.activeTour); // Log the result to verify
        

        return result;
      },
      (error) => {
        console.error('Error fetching TourExecution', error);
      }
    );
  }

  getTourExecutionByUser(userId: number){
    this.service.getByUser(userId).subscribe(
      (result) => {
        this.activeTour = result;
        console.log(this.activeTour); // Log the result to verify
        this.tourId=this.activeTour.tourId;
      },
      (error) => {
        console.error('Error fetching TourExecution', error);
      }
    );

  }

  

  updatePosition(event: MouseEvent): void{
    console.log("usao");
    this.service.updatePosition(1,100, 100)
      .subscribe(
        () => {
          console.log('Position updated successfully');
        },
        (error) => {
          console.error('Error updating position', error);
        }
      );
  }

  updateStatusToAbandoned(): void{
    console.log("cap");
    this.service.updateStatus(this.activeTour.id,'Abandoned').subscribe(
      ()=>{
        console.log('Great');
      }
      );
    //this.updatePosition();
    this.router.navigate(['/home']);
  }

  checkUserPosition(): void {
    this.administrationService.getByUserId(this.tokenStorage.getUserId(), 0, 0).subscribe(
      (result) => {
        this.shouldEdit = result != null; 
        this.idPosition = result ? result.id : undefined; // Assign the result of the check
      },
      (error) => {
        console.error('Error fetching user positions:', error);
        // Handle the error as needed
      }
    );
  }
  

}
