import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourPointsComponent } from './tour-points/tour-points.component';
import { TourPointFormComponent } from './tour-point-form/tour-point-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    TourPointsComponent,
    TourPointFormComponent
  ],
  exports: [
    TourPointsComponent
  ]
})
export class TourAuthoringModule { }
