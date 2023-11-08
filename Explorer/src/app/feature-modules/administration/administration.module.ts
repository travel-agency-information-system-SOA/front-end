import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
//import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRatingFormComponent } from './app-rating-form/app-rating-form.component';
import { AppRatingsComponent } from './app-ratings/app-ratings.component';
import { AccountComponent } from './account/account.component';

import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //EquipmentFormComponent,
    //EquipmentComponent,
    AccountComponent,
    ProfileComponent,
    AppRatingFormComponent,
    AppRatingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    //EquipmentComponent,
    //EquipmentFormComponent,
    AccountComponent,
    ProfileComponent,
    AppRatingsComponent,
    AppRatingFormComponent
  ]
})
export class AdministrationModule { }