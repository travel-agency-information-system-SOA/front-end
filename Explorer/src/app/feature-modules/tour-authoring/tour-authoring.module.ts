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
import { TourObjectComponent } from './tour-object/tour-object.component';
import { ObjectFormComponent } from './object-form/object-form.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { EquipmentDialogComponent } from './equipment-dialog/equipment-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TourMapComponent } from './tour-map/tour-map.component';

@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    TourPointsComponent,
    TourPointFormComponent,
    TourObjectComponent,
    ObjectFormComponent,
    TourMapComponent,
    EquipmentDialogComponent,
  ],

  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,

    FormsModule,
    MatDialogModule,

    MaterialModule,
    SharedModule,
  ],

  exports: [
    TourComponent,
    TourPointsComponent,
    TourObjectComponent,
    ObjectFormComponent,
  ],
})
export class TourAuthoringModule {}
