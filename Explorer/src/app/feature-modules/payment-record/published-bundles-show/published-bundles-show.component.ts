import { Component } from '@angular/core';
import { PaymentRecordService } from '../payment-record.service';
import { Bundle } from '../bundle.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-published-bundles-show',
  templateUrl: './published-bundles-show.component.html',
  styleUrls: ['./published-bundles-show.component.css']
})
export class PublishedBundlesShowComponent {

  publishedBundles: Bundle[]=[];
  bundle : Bundle;
  loggedInUser:number;

  constructor(private paymentRecordService: PaymentRecordService,private authService:AuthService){
    this.getPublishedBundles()
  }

  getLoggedInUser(){
    this.authService.user$.subscribe(user=>{
      if(user){
        this.loggedInUser = user.id;
        console.log('Id ulogovanog: '+this.loggedInUser);
      }
    })
  }

  getPublishedBundles(){
    this.paymentRecordService.getPublishedBundles().subscribe({
      next:(response)=>{
        this.publishedBundles=response.results;
        console.log('Publishovani paketi', this.publishedBundles)
      }
    })
  }

  
  tourBundlePurchase(tourBundleId: number, touristId: number): void {   
    this.paymentRecordService.tourBundlePurchase(tourBundleId, this.loggedInUser);
    
  }


}
