import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../model/blogpost.model';
import { BlogPostRating } from '../model/blog-post-rating.model';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { BlogService } from '../blog.service';
import { BlogPostComment } from '../model/blog-post-comment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit {
  post: BlogPost;
  @Output() postUpdated = new EventEmitter<null>();
  
  constructor(private service: BlogService, private route: ActivatedRoute,private tokenStorage: TokenStorage) { }

  currentImageIndex: number = 0;
  isUpvoted: boolean;
  isDownvoted: boolean;
  overall_rating: number = 0;
  upvote_count:number = 0;
  downvote_count: number = 0;

  ngOnInit(): void {
    this.post = JSON.parse(this.route.snapshot.queryParams['post']);
    this.checkRating();
    this.GetOverallRating();
    // You can now access properties of the blog post object in this.post
  }

  GetOverallRating() {
    if(this.post.ratings != null) {
      for (const rating of this.post.ratings) {
        if(rating.isPositive) {
          this.upvote_count++;
        }
        else {
          this.downvote_count++;
        }
      }
      this.overall_rating = this.upvote_count - this.downvote_count;
    }
  }
  checkRating() {
    if(this.post.ratings != null) {
       for (const rating of this.post.ratings) {
        if(rating.userId == this.tokenStorage.getUserId()) {
          if(rating.isPositive) {
            this.isUpvoted = true;
            this.isDownvoted = false;
          }
          else if(rating.isPositive == false) {
            this.isUpvoted = false;
            this.isDownvoted = true;
          }
          else {
            this.isUpvoted = false;
            this.isDownvoted = false;
          }
        }
       }
    }

   


  }
  

  upvote() {
    if(this.isUpvoted) {
      this.isUpvoted = false;
      this.service.removeRating(this.post.id,this.tokenStorage.getUserId()).subscribe({
        next: () => { this.postUpdated.emit() }
      });
    }
    else {
      this.isUpvoted = true;
      this.isDownvoted = false;
      const rating: BlogPostRating = {
        userId: this.tokenStorage.getUserId(),
        creationTime: new Date(),
        isPositive: true,
      }
      this.service.addRating(this.post.id, rating).subscribe({
        next: () => { this.postUpdated.emit() }
      });
    }
  }

  downvote() {
    if(this.isDownvoted) {
      this.isDownvoted = false;
      this.service.removeRating(this.post.id, this.tokenStorage.getUserId()).subscribe({
        next: () => { this.postUpdated.emit() }
      });
    }
    else {
      this.isUpvoted = false;
      this.isDownvoted = true;
      const rating: BlogPostRating = {
        userId: this.tokenStorage.getUserId(),
        creationTime: new Date(),
        isPositive: false,
      }
      this.service.addRating(this.post.id, rating).subscribe({
        next: () => { this.postUpdated.emit() }
      });
    }
  }

  get currentImage(): string {
    return this.post.imageURLs ? this.post.imageURLs[this.currentImageIndex] : '';
  }

  get showNavArrows(): boolean {
    return this.post.imageURLs != null && this.post.imageURLs.length > 1;
  }

  nextImage() {
    if (this.showNavArrows) {
      this.currentImageIndex = (this.currentImageIndex + 1) % (this.post.imageURLs?.length ?? 1);
    }
  }

  prevImage() {
    if (this.showNavArrows) {
      this.currentImageIndex = (this.currentImageIndex - 1 + (this.post.imageURLs?.length ?? 1)) % (this.post.imageURLs?.length ?? 1);
    }
  }

  commentForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });
  
  addComment(): void {
    const comment: BlogPostComment= {
      userId: this.tokenStorage.getUserId() || 0 ,
      blogId: this.post.id,
      text: this.commentForm.value.text || "",
      creationTime: new Date(),
      lastUpdatedTime: new Date(), 
    }
    this.post.comments?.push(comment);
    this.service.addComment(this.post.id, comment).subscribe({
      next: () => { this.postUpdated.emit();}
    })
    this.commentForm.reset();
  }

  showEditDeleteButtons(commentuserId:number):boolean {
    return commentuserId == this.tokenStorage.getUserId();
  }

  editComment():void {

  }

  deleteComment():void {
      
  }
}
