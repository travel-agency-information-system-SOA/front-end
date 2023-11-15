import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../blog.service';
import { BlogPost } from '../model/blogpost.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'xp-blogpost-form',
  templateUrl: './blogpost-form.component.html',
  styleUrls: ['./blogpost-form.component.css']
})



export class BlogpostFormComponent implements OnChanges {
  
  @Output() blogPostsUpdated = new EventEmitter<null>();
  @Input() blogPost: BlogPost;
  @Input() shouldEdit: boolean = false;
  @Input() shouldEditDraft: boolean = false;
  
  constructor(private service: BlogService, private tokenStorage: TokenStorage, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.blogPostForm.reset();
    if(this.shouldEdit){
      this.blogPostForm.patchValue({title: this.blogPost.title || '',
      description: this.blogPost.description || '',
      imageURLs: this.blogPost.imageURLs?.join(', ')});
    }
  }

  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
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
      authorId: this.tokenStorage.getUserId() || 0,
      authorUsername: null,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: new Date(),
      imageURLs: imageURLs,
      comments: [],
      ratings: [],
      status: 'PUBLISHED'
    }

    this.service.addBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit();
      }
    });
    this.router.navigate(['/blog']);
    
  }


  addBlogPostDraft(): void{
    console.log(this.blogPostForm.value)

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];


    const blogPost = {
      id: 0,
      authorId: this.tokenStorage.getUserId() || 0,
      authorUsername: null,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: new Date(),
      imageURLs: imageURLs,
      comments: [],
      ratings: [],
      status: 'DRAFT'
    }

    this.service.addBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit();
      }
    });
    
  }

  postBlogPostDraft(): void{
    console.log(this.blogPostForm.value)

    const imageURLsString = this.blogPostForm.value.imageURLs;
    const imageURLs = imageURLsString
      ? imageURLsString.split(',').map(url => String(url.trim()))
      : [];


      const blogPost = {
        id: this.blogPost.id,
        authorId: this.blogPost.authorId,
        authorUsername: this.blogPost.authorUsername,
        title: this.blogPostForm.value.title || '',
        description: this.blogPostForm.value.description || '',
        creationDate: new Date(),
        imageURLs: imageURLs,
        comments: this.blogPost.comments,
        ratings: this.blogPost.ratings,
        status: 'PUBLISHED'
      }

    this.service.updateBlogPost(blogPost).subscribe({
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
      authorId: this.blogPost.authorId,
      authorUsername: this.blogPost.authorUsername,
      title: this.blogPostForm.value.title || '',
      description: this.blogPostForm.value.description || '',
      creationDate: this.blogPost.creationDate,
      imageURLs: imageURLs,
      comments: this.blogPost.comments,
      ratings: this.blogPost.ratings,
      status: this.blogPost.status
    }

    this.service.updateBlogPost(blogPost).subscribe({
      next: (_) => {
        this.blogPostsUpdated.emit()
      }
    })
    if(!this.shouldEditDraft) {
      this.router.navigate(['/blog/',this.blogPost.id]);
    }
    else {
      this.router.navigate(['/blog/create-post']);
    }

  }
    
}
