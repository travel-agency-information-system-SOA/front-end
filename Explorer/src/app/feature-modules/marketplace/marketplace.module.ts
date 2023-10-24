import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from './preferences/preferences.component';
import { PreferencesFormComponent } from './preferences-form/preferences-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    PreferencesComponent,
    PreferencesFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    FormsModule
  ],
  exports: [
    PreferencesComponent
  ]
})
export class MarketplaceModule { }
