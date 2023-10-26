import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogpostFormComponent } from './blogpost-form/blogpost-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {  MarkdownModule } from 'ngx-markdown';
import { MatSelectModule } from '@angular/material/select';

import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog'; 



@NgModule({
  declarations: [
    BlogpostComponent,
    BlogpostFormComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MarkdownModule.forRoot(),
    MatSelectModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    BlogpostComponent,
    BlogpostFormComponent
  ]
})
export class BlogModule { }
