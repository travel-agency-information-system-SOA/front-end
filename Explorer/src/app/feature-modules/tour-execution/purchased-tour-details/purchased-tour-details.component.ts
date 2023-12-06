import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/tour/model/tour.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TourExecutionService } from '../tour-execution.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-purchased-tour-details',
  templateUrl: './purchased-tour-details.component.html',
  styleUrls: ['./purchased-tour-details.component.css']
})
export class PurchasedTourDetailsComponent implements OnInit{

  tour: Tour = {} as Tour;
  touristId: number;
  tourId:number;


  constructor(private marketplaceService: MarketplaceService, private auth: AuthService, private executionService: TourExecutionService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.getLogedUser()
    const aa = +this.route.snapshot.paramMap.get('id')!;
    this.tourId=+this.route.snapshot.paramMap.get('id')!;
    this.marketplaceService.getSelectedTour(aa).subscribe({
      next: (result: Tour)=>{
        this.tour = result;
        //console.log(this.tour.price);
      },
      error: (err: any) =>{
        console.log(err)
      }
    }); 
    console.log("TourId: ",this.tourId);  
    console.log("UserId: ",this.touristId);
 
  }

  getLogedUser(): void{
    this.auth.user$.subscribe((user) => {
      if (user.username) {
       this.touristId = user.id
      }
    });
  }

  startTour(): void{
    console.log("start: ",this.tourId)
    console.log("touristId",this.touristId)
    this.executionService.createTourExecution(this.touristId, this.tourId).subscribe({
      next: ()=>{
        this.router.navigate(['activeTour']);
      },
      error: (err: any) =>{
        console.log(err)
      }
    });
  }


}