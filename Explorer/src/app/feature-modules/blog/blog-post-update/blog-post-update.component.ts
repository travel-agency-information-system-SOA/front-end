import { Component } from '@angular/core';
import { BlogPost } from '../model/blogpost.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xp-blog-post-update',
  templateUrl: './blog-post-update.component.html',
  styleUrls: ['./blog-post-update.component.css']
})
export class BlogPostUpdateComponent {
  blogPostForUpdate: BlogPost;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(){
    this.blogPostForUpdate = JSON.parse(this.route.snapshot.queryParams['post']);
    console.log(this.blogPostForUpdate);
    console.log('pipik');
  }
  

}
