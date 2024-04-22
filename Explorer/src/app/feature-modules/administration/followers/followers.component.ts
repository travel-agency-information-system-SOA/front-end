import { Component, OnInit} from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit{
  constructor(private service: AdministrationService, private router: Router) { }

  ngOnInit(): void {
     this.getUsersToFollow();
  }

  getUsersToFollow(){
    // poziv funkcije iz servisa da dobavi sve usere 
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
