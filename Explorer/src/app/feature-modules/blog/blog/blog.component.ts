import { Component } from '@angular/core';
import { BlogPost } from '../model/blogpost.model';
import { BlogService } from '../blog.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogPosts: BlogPost[] = [];

  constructor(private service: BlogService) { }

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.service.getBlogPosts().subscribe({
      next: (result: PagedResults<BlogPost>) => {
        this.blogPosts = result.results;
        this.blogPosts.forEach(post => {
          console.log(post);
          post.creationDate = new Date(post.creationDate);
        });
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
  }
  getFamousBlogPosts(): void {
    this.service.getBlogPosts().subscribe({
      next: (result: PagedResults<BlogPost>) => {
        this.blogPosts = result.results;
        this.blogPosts.forEach(post => {
          console.log(post);
          post.creationDate = new Date(post.creationDate);
        });
        this.blogPosts = this.blogPosts.filter(post => post.status === 'FAMOUS');
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
  }
  getActiveBlogPosts(): void {
    this.service.getBlogPosts().subscribe({
      next: (result: PagedResults<BlogPost>) => {
        this.blogPosts = result.results;
        this.blogPosts.forEach(post => {
          console.log(post);
          post.creationDate = new Date(post.creationDate);
        });
        this.blogPosts = this.blogPosts.filter(post => post.status === 'ACTIVE');
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
  }
}
