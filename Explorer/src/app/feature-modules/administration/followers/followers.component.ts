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
    console.log('svi korisnici:');
    console.log(this.users);
  }
  

  showBlogs(){
    this.router.navigate(['/followers-blogs']);
  }

  showRecommendations(){
    this.router.navigate(['/follow-recommendations']);
  }

  followUser(followerId: number){
    if(this.user)
    {
      this.service.followUser(this.user?.id, followerId).subscribe(
        (data) => {
          console.log('Successfully followed user:', data);
          // Obrisi tog usera iz liste usera
          this.users = this.users.filter(user => user.id !== followerId);
        },
        (error) => {
          console.error('Error following user:', error);
        }
      );
    }
  }
  
}
