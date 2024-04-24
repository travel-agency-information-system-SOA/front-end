import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../../blog/model/blogpost.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AdministrationService } from '../administration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'xp-followers-blogs',
  templateUrl: './followers-blogs.component.html',
  styleUrls: ['./followers-blogs.component.css']
})
export class FollowersBlogsComponent implements OnInit{
  users: User[] = [];
  user: User | null = null;
  userSubscription: Subscription;
  blogPosts: BlogPost[] = [];

  constructor(private authService: AuthService, private router: Router, private service: AdministrationService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => {
        this.user = user;
        console.log('Ulogovani korisnik:', this.user);
      }
    );

    this.getBlogPosts();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getBlogPosts(){
    // ovde treba dobaviti sve blogove
  }
  
}
