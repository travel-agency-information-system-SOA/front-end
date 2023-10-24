import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour/tour.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TourPointsComponent } from './tour-points/tour-points.component';
import { TourPointFormComponent } from './tour-point-form/tour-point-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';

@NgModule({
  declarations: [TourComponent, TourFormComponent, TourPointsComponent,
    TourPointFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MaterialModule,
  ],

  exports: [TourComponent, TourPointsComponent],
})
export class TourAuthoringModule {}
