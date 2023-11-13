import { Component, Input } from '@angular/core';
import { BlogPost } from '../model/blogpost.model';
import { Router } from '@angular/router';


@Component({
  selector: 'xp-blog-post-card',
  templateUrl: './blog-post-card.component.html',
  styleUrls: ['./blog-post-card.component.css']
})

export class BlogPostCardComponent {

  constructor(private router: Router) {}

  @Input() post: BlogPost;
  currentImageIndex: number = 0;

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

  navigateToDetail(post: BlogPost) {
    this.router.navigate(['/blog', post.id], { queryParams: { post: JSON.stringify(post) } });
  }
}
