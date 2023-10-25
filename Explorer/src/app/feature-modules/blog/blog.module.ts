import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostCommentComponent } from './blog-post-comment/blog-post-comment.component';
import { MatIconModule } from '@angular/material/icon';
import { BlogPostCommentFormComponent } from './blog-post-comment-form/blog-post-comment-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    BlogPostCommentComponent,
    BlogPostCommentFormComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    BlogPostCommentComponent
  ]
})
export class BlogModule { }
