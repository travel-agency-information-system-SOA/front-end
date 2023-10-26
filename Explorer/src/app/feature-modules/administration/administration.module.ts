import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
//import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';

import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //EquipmentFormComponent,
    //EquipmentComponent,
    AccountComponent,
    ProfileComponent
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
    ProfileComponent 
  ]
})
export class AdministrationModule { }
