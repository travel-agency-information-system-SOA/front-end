import {  Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostComment } from '../model/blog-post-comment.model';
import { BlogPostCommentService } from '../blog-post-comment.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';

@Component({
  selector: 'xp-blog-post-comment-form',
  templateUrl: './blog-post-comment-form.component.html',
  styleUrls: ['./blog-post-comment-form.component.css']
})
export class BlogPostCommentFormComponent implements OnChanges {

  @Output() commentUpdated = new EventEmitter<null>();
  @Input() comment: BlogPostComment;
  @Input() shouldEdit: boolean = false;

  constructor(private service: BlogPostCommentService, private tokenStorage: TokenStorage) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.commentForm.reset();
    if(this.shouldEdit) {
      this.commentForm.patchValue(this.comment);
    }
  }

  commentForm = new FormGroup({
    blogId: new FormControl(0, [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  addComment(): void {
    const comment: Partial<BlogPostComment> = {
      userId: this.tokenStorage.getUserId(),
      blogId: this.commentForm.value.blogId || 0 , // Convert blogId to a string
      text: this.commentForm.value.text || "",
      creationTime: new Date(), // Current time
      lastUpdatedTime: new Date(), // Current tim
    }
    this.service.addComment(comment as BlogPostComment).subscribe({
      next: () => { this.commentUpdated.emit() }
    });
  }

  updateComment(): void {
    const comment: Partial<BlogPostComment> = {
      userId: 2,
      blogId: this.commentForm.value.blogId || 0 , // Convert blogId to a string
      text: this.commentForm.value.text || "",
      creationTime: this.comment.creationTime,
      lastUpdatedTime: new Date(), // Current time
    }
      comment.id = this.comment.id;

      this.service.updateComment(comment as BlogPostComment).subscribe({
        next: (_) => {
          this.commentUpdated.emit()
        }
      })
  }

}
