import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourObjectComponent } from './tour-object/tour-object.component';
import { ObjectFormComponent } from './object-form/object-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TourObjectComponent,
    ObjectFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    TourObjectComponent,
    ObjectFormComponent
  ]
})
export class TourAuthoringModule { }
