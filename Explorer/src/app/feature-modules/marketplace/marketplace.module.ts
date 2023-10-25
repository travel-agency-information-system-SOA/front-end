import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourReviewsShowComponent } from './tour-reviews-show/tour-reviews-show.component';




@NgModule({
  declarations: [
    TourReviewFormComponent,
    TourReviewsShowComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MarketplaceModule { }
