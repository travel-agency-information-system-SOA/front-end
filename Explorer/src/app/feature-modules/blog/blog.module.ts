import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogpostFormComponent } from './blogpost-form/blogpost-form.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {  MarkdownModule } from 'ngx-markdown';
import { MatSelectModule } from '@angular/material/select';



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
    MatSelectModule
  ],
  exports: [
    BlogpostComponent,
    BlogpostFormComponent
  ]
})
export class BlogModule { }
