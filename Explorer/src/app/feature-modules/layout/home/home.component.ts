import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  
  constructor(private notifications: NotificationsService, private router: Router, private probService: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    this.showNotification();
  }


  showNotification(): void {
    this.probService.isThereUnreadMessage(this.user.id || 0).subscribe(
      (idProblem: number) => {
        console.log(idProblem);
        if (idProblem != 0) {
            const toast = this.notifications.info('Nove poruke u cetu!', 'Udjite da biste videli celu prepisku o problemu!', {
            timeOut: 2500,
            showProgressBar: true,
            clickToClose: true
          });

            toast.click?.subscribe(() => {
            this.router.navigate(['problems']);
          })
        }
      }
    )
  }

}
