import { Component, OnInit} from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-follow-recommendations',
  templateUrl: './follow-recommendations.component.html',
  styleUrls: ['./follow-recommendations.component.css']
})
export class FollowRecommendationsComponent implements OnInit{
  constructor(private service: AdministrationService, private router: Router) { }

  ngOnInit(): void {
     this.getRecommendations();
  }

  getRecommendations(){
    // poziv funkcije iz servisa da dobavi sve usere 
  }

  followUser(){
    // ovde u parametar treba id usera 
    // poziv metode iz servisa za followanje usera
    // obrisi tog usera iz liste usera i refreshuj stranicu 
  }
}
