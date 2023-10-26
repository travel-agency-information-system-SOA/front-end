import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogPost } from './model/blogpost.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogPosts(): Observable<PagedResults<BlogPost>> {
    return this.http.get<PagedResults<BlogPost>>('https://localhost:44333/api/blog/blogpost');
  }

  addBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.post<BlogPost>(environment.apiHost + 'blog/blogpost', blogPost);
  }

  updateBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.put<BlogPost>(environment.apiHost + 'blog/blogpost/' + blogPost.id, blogPost);
  }

  deleteBlogPost(blogPost: BlogPost): Observable<BlogPost>{
    return this.http.delete<BlogPost>(environment.apiHost + 'blog/blogpost/' + blogPost.id);
  }
}
