import { Component, OnInit, OnDestroy} from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Subscription } from 'rxjs';
import { NeoUser } from '../model/neo-user.model';

@Component({
  selector: 'xp-follow-recommendations',
  templateUrl: './follow-recommendations.component.html',
  styleUrls: ['./follow-recommendations.component.css']
})
export class FollowRecommendationsComponent implements OnInit{
  users: NeoUser[] = [];
  user: User | null = null;
  userSubscription: Subscription;

  constructor(private service: AdministrationService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => {
        this.user = user;
        console.log('Ulogovani korisnik:', this.user);
      }
    );
     this.getRecommendations();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getRecommendations(){
    // poziv funkcije iz servisa da dobavi sve usere 
    // IZMENITI NE GLEDAS SVE USERE NEGO SAMO RECOMMENDERS!!!!!! ovaj filter ti verovatno nece ni trebati
    if(this.user && this.user?.id){
      this.service.getAllRecommendations(this.user?.id).subscribe(
        (data) => {
          //this.users = data.filter(user => user.id !== this.user?.id);
          this.users = data;

        },
        (error) => {
          console.error('Error getting users:', error);
        }
      );
    }
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
