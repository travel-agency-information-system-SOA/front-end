import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../administration.service';
import { NeoUser } from '../model/neo-user.model';

@Component({
  selector: 'xp-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  user: User | null = null;
  userSubscription: Subscription;
  userFollowings: NeoUser[] = [];
  userToShow: User[] = [];

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

  // getUsersToFollow(){
  //   //svi koje prati
  //   if(this.user && this.user.id){
  //     this.service.getUserFollowings(this.user?.id).subscribe(
  //       (data) => {
  //         this.userFollowings = data;
  //         console.log('Svi koje prati:');
  //         console.log(this.userFollowings);
  //       },
  //       (error) => {
  //         console.error('Error getting user followings:', error);
  //       }
  //     );
  //   }

  //   //svi
  //   this.service.getAllUsers().subscribe(
  //     (data) => {
  //       this.users = data.filter(user => user.id !== this.user?.id);
  //     },
  //     (error) => {
  //       console.error('Error getting users:', error);
  //     }
  //   );
  //   console.log('svi korisnici:');
  //   console.log(this.users);

  // }

  getUsersToFollow(){
    //svi koje prati
    if(this.user && this.user.id){
      this.service.getUserFollowings(this.user?.id).subscribe(
        (data) => {
          this.userFollowings = data;
          console.log('Svi koje prati:');
          console.log(this.userFollowings);
  
          //svi korisnici koji postoje, ali ne uključuju trenutno prijavljenog korisnika
          this.service.getAllUsers().subscribe(
            (allUsers) => {
              // Ukloni trenutno prijavljenog korisnika iz liste svih korisnika
              const usersExceptCurrent = allUsers.filter(user => user.id !== this.user?.id);
              console.log('Svi korisnici osim trenutno prijavljenog:');
              console.log(usersExceptCurrent);
  
              // Napravi listu korisnika koji postoje, ali koje trenutno prijavljeni korisnik ne prati
              if(this.userFollowings && this.userFollowings.length > 0) {
                this.userToShow = usersExceptCurrent.filter(user => !this.userFollowings.some(following => following.id === user.id));
              } else {
                this.userToShow = usersExceptCurrent;
              }
              console.log('Korisnici koje trenutno prijavljeni korisnik ne prati:');
              console.log(this.userToShow);
            },
            (error) => {
              console.error('Error getting all users:', error);
            }
          );
        },
        (error) => {
          console.error('Error getting user followings:', error);
        }
      );
    }
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
          this.userToShow = this.users.filter(user => user.id !== followerId); //izmenila na users to show listu
        },
        (error) => {
          console.error('Error following user:', error);
        }
      );
    }
  }
  
}
