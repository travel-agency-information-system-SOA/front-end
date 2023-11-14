import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { BlogPost } from './model/blogpost.model';
import { environment } from 'src/env/environment';
import { BlogPostRating } from './model/blog-post-rating.model';
import { BlogPostComment } from './model/blog-post-comment.model';

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
  addRating(id: number, rating: BlogPostRating): Observable<BlogPost>{
    return this.http.post<BlogPost>(environment.apiHost + 'blog/blogpost/' + id + '/ratings', rating);
  }
  removeRating(blogId: number, userId: number): Observable<BlogPost>{
    return this.http.delete<BlogPost>(environment.apiHost + 'blog/blogpost/' + blogId + '/ratings/' + userId );
  }
  addComment(id: number, comment: BlogPostComment): Observable<BlogPost> {
    return this.http.post<BlogPost>(environment.apiHost + 'blog/blogpost/' + id + '/comments', comment);
  }
  deleteComment(blogId: number, userId:number, dateTime: Date):Observable<BlogPost> {
    return this.http.delete<BlogPost>(environment.apiHost + 'blog/blogpost/' +  blogId + '/comments/' + userId + '/' + dateTime );
  }
}
