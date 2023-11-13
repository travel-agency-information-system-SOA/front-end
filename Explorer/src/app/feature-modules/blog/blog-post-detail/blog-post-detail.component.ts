import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../model/blogpost.model';

@Component({
  selector: 'xp-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit {
  post: BlogPost;
  
  constructor(private route: ActivatedRoute) { }

  currentImageIndex: number = 0;
  isUpvoted: boolean = false;

  ngOnInit(): void {
    this.post = JSON.parse(this.route.snapshot.queryParams['post']);
    // You can now access properties of the blog post object in this.post
  }
  upvote() {
    if (this.isUpvoted == true) {
      this.isUpvoted = false;
    }
    else {
      this.isUpvoted = true;
    }

    // Handle upvote logic, for example, incrementing the upvotes and toggling the isUpvoted state
    

    // You may also want to reset the downvote state
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
  

}
