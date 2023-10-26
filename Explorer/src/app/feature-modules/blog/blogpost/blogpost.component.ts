import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../model/blogpost.model';
import { BlogService } from '../blog.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  blog_posts: BlogPost[] = [];
  selectedBlogPost: BlogPost;
  shouldEdit: boolean;
  shouldRenderBlogPostForm: boolean = false;

  constructor(private service: BlogService) { }

  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts(): void {
    this.service.getBlogPosts().subscribe({
      next: (result: PagedResults<BlogPost>) => {
        this.blog_posts = result.results;
        this.blog_posts.forEach(post => {
          console.log(post);
          post.creationDate = new Date(post.creationDate);
          
        });
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
  }

  onEditClicked(blogPost: BlogPost): void{
    this.selectedBlogPost = blogPost;
    this.shouldRenderBlogPostForm = true;
    this.shouldEdit = true;
    console.log(blogPost);
  }

  onAddClicked(): void{
    this.shouldRenderBlogPostForm = true;
    this.shouldEdit = false;
  }

  deleteBlogPost(blogPost: BlogPost): void{
    this.service.deleteBlogPost(blogPost).subscribe({
      next: (_) => {
        this.getBlogPosts();
      }
    })
    this.shouldRenderBlogPostForm = false;
  }
 
}
