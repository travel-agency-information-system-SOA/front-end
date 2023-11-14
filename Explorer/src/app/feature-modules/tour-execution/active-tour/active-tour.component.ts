import { Component } from '@angular/core';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { TourExecutionService } from '../tour-execution.service';
import { TourExecution } from '../model/tourExecution.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-active-tour',
  templateUrl: './active-tour.component.html',
  styleUrls: ['./active-tour.component.css']
})
export class ActiveTourComponent {
  activeTour: TourExecution;
  userId: number = this.tokenStorage.getUserId();
  constructor(private service:TourExecutionService,
              private tokenStorage: TokenStorage
      ){}

  ngOnInit(): void {
    this.getTourExecutionByUser(this.userId);
    
    this.updatePosition();
    
    }

  
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
      },
      (error) => {
        console.error('Error fetching TourExecution', error);
      }
    );

  }

  updatePosition(): void{
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
  

}
