import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { TouristXP } from '../../administration/model/touristXP.model';
import { AdministrationService } from '../../administration/administration.service';
import { TokenStorage } from 'src/app/infrastructure/auth/jwt/token.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User | undefined;
  touristXP:  TouristXP[] = [];
  isLevelTen: boolean;  

  constructor(private authService: AuthService,
              private adminService: AdministrationService,
              private tokenStorage: TokenStorage) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if(user.role === "tourist"){
        this.isLevelTen = false;
        this.getTouristLevel();
      }
    });
  }

  getTouristLevel(): void{
    const userId = this.tokenStorage.getUserId();
    this.adminService.getTouristXPByID(userId).subscribe({
      next: (result: PagedResults<TouristXP>) => {
        this.touristXP = result.results;
        this.touristXP.forEach(t => {
            if(t.level >= 10)
              this.isLevelTen = true;
        });
      },
      error: () => {
      }
    })
  }

  onLogout(): void {
    this.authService.logout();
  }
}
