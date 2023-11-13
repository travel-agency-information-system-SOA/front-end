import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { BlogPost } from '../model/blogpost.model';

@Component({
  selector: 'xp-blogpost-form',
  templateUrl: './blogpost-form.component.html',
  styleUrls: ['./blogpost-form.component.css']
})



export class BlogpostFormComponent implements OnChanges {
  
  @Output() blogPostsUpdated = new EventEmitter<null>();
  @Input() blogPost: BlogPost;
  @Input() shouldEdit: boolean = false;
  
  constructor(private service: BlogService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.blogPostForm.reset();
    if(this.shouldEdit){
      this.blogPostForm.patchValue({title: this.blogPost.title || '',
      description: this.blogPost.description || '',
      status: this.blogPost.status || 'DRAFT',
      imageURLs: this.blogPost.imageURLs?.join(', ')});
    }
  }

  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('DRAFT'),
    imageURLs: new FormControl(''),
  })


  addBlogPost(): void{
    console.log(this.blogPostForm.value)

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];


    const blogPost = {
      id: 0,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: new Date(),
      imageURLs: imageURLs,
      comments: [],
      ratings: [],
      status: this.blogPostForm.value.status || 'DRAFT'
    }

    this.service.addBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit();
      }
    });
    
  }

  updateBlogPost(): void{

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];

    const blogPost = {
      id: this.blogPost.id,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: this.blogPost.creationDate,
      imageURLs: imageURLs,
      comments: this.blogPost.comments,
      ratings: this.blogPost.ratings,
      status: this.blogPostForm.value.status || 'DRAFT'
    }

    this.service.updateBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit()
      }
    })

  }
    
}
