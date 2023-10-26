import { Component, OnInit } from '@angular/core';
import { BlogPostComment } from '../model/blog-post-comment.model';
import { BlogPostCommentService } from '../blog-post-comment.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-blog-post-comment',
  templateUrl: './blog-post-comment.component.html',
  styleUrls: ['./blog-post-comment.component.css']
})
export class BlogPostCommentComponent implements OnInit {

  blogPostComment: BlogPostComment[] = [];
  selectedComment: BlogPostComment;
  shouldRenderCommentForm: boolean = false;
  shouldEdit: boolean = false;
  
  constructor(private service: BlogPostCommentService) { }

  ngOnInit(): void {
    this.service.getBlogPostComments().subscribe({
      next: (result: PagedResults<BlogPostComment>) => {
        this.blogPostComment = result.results
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onEditClicked(comment: BlogPostComment): void {
    this.selectedComment = comment;
    this.shouldRenderCommentForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.shouldRenderCommentForm =true;
    this.shouldEdit = false;
  }

  deleteComment(comment: BlogPostComment): void {
    this.service.deleteComment(comment).subscribe({
      next: () => {
        this.ngOnInit();
      }
    })
  }

}
