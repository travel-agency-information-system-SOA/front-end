import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideReviewComponent } from './guide-review/guide-review.component';
import { GuideReviewFormComponent } from './guide-review-form/guide-review-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { PreferencesComponent } from './preferences/preferences.component';
import { PreferencesFormComponent } from './preferences-form/preferences-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';
import { MatInputModule } from '@angular/material/input';
import { TourReviewsShowComponent } from './tour-reviews-show/tour-reviews-show.component';
import { ToursShowComponent } from './tours-show/tours-show.component';
import { UpdateReviewComponent } from './update-review/update-review.component';



@NgModule({
  declarations: [

    TourReviewFormComponent,
    TourReviewsShowComponent,
    GuideReviewComponent,
    GuideReviewFormComponent,
    PreferencesComponent,
    PreferencesFormComponent,
    ToursShowComponent,
    UpdateReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,

    MatInputModule,

    ReactiveFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule
  ],
  exports: [
    GuideReviewComponent,
    
    PreferencesComponent

  ]
})
export class MarketplaceModule { }
