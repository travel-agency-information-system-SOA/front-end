import { Component, OnInit, OnDestroy} from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'xp-follow-recommendations',
  templateUrl: './follow-recommendations.component.html',
  styleUrls: ['./follow-recommendations.component.css']
})
export class FollowRecommendationsComponent implements OnInit{
  users: User[] = [];
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
    this.service.getAllUsers().subscribe(
      (data) => {
        this.users = data.filter(user => user.id !== this.user?.id);
      },
      (error) => {
        console.error('Error getting users:', error);
      }
    );
  }

  followUser(){
    // ovde u parametar treba id usera 
    // poziv metode iz servisa za followanje usera
    // obrisi tog usera iz liste usera i refreshuj stranicu 
  }
}
