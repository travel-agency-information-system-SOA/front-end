import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
//import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRatingFormComponent } from './app-rating-form/app-rating-form.component';
import { AppRatingsComponent } from './app-ratings/app-ratings.component';
import { AccountComponent } from './account/account.component';
import { UserPositionComponent } from './user-position/user-position.component'; 
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //EquipmentFormComponent,
    //EquipmentComponent,
    AccountComponent,
    ProfileComponent,
    AppRatingFormComponent,
    AppRatingsComponent,
    UserPositionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    //EquipmentComponent,
    //EquipmentFormComponent,
    AccountComponent,
    ProfileComponent,
    AppRatingsComponent,
    AppRatingFormComponent,
    UserPositionComponent
  ]
})
export class AdministrationModule { }