import { Component } from '@angular/core';
import { PaymentRecordService } from '../payment-record.service';
import { Bundle } from '../bundle.model';

@Component({
  selector: 'xp-published-bundles-show',
  templateUrl: './published-bundles-show.component.html',
  styleUrls: ['./published-bundles-show.component.css']
})
export class PublishedBundlesShowComponent {

  publishedBundles: Bundle[]=[]
  constructor(private paymentRecordService: PaymentRecordService){
    this.getPublishedBundles()
  }

  getPublishedBundles(){
    this.paymentRecordService.getPublishedBundles().subscribe({
      next:(response)=>{
        this.publishedBundles=response.results;
        console.log('Publishovani paketi', this.publishedBundles)
      }
    })
  }

}
