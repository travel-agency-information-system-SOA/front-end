import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'xp-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  user: User | null = null;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private service: AdministrationService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => {
        this.user = user;
        console.log('Ulogovani korisnik:', this.user);
      }
    );

    this.getUsersToFollow();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getUsersToFollow(){
    this.service.getAllUsers().subscribe(
      (data) => {
        this.users = data.filter(user => user.id !== this.user?.id);
      },
      (error) => {
        console.error('Error getting users:', error);
      }
    );
  }
  

  showBlogs(){
    this.router.navigate(['/followers-blogs']);
  }

  showRecommendations(){
    this.router.navigate(['/follow-recommendations']);
  }

  followUser(){
    // ovde u parametar treba id usera 
    // poziv metode iz servisa za followanje usera
    // obrisi tog usera iz liste usera i refreshuj stranicu 
  }
}
