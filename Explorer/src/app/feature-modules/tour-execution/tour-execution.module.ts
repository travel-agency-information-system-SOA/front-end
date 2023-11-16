import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TourExecutionPositionComponent } from './tour-execution-position/tour-execution-position.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveTourComponent } from './active-tour/active-tour.component';
import { PurchasedToursComponent } from './purchased-tours/purchased-tours.component';



@NgModule({
  declarations: [
    TourExecutionPositionComponent,
    ActiveTourComponent,
    PurchasedToursComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
    
  ],
  exports:[
    TourExecutionPositionComponent,
    PurchasedToursComponent
  ]
})
export class TourExecutionModule { }
