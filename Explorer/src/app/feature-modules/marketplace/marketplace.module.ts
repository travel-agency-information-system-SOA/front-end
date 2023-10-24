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


@NgModule({
  declarations: [
    GuideReviewComponent,
    GuideReviewFormComponent,
    PreferencesComponent,
    PreferencesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    GuideReviewComponent
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    PreferencesComponent
  ]
})
export class MarketplaceModule { }
