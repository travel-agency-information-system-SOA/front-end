import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AccountComponent } from 'src/app/feature-modules/administration/account/account.component';
import { GuideReviewComponent } from 'src/app/feature-modules/marketplace/guide-review/guide-review.component';
import { PreferencesComponent } from '../../feature-modules/marketplace/preferences/preferences.component';

import { TourPointsComponent } from 'src/app/feature-modules/tour-authoring/tour-points/tour-points.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { TourObjectComponent } from 'src/app/feature-modules/tour-authoring/tour-object/tour-object.component';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourMapComponent } from 'src/app/feature-modules/tour-authoring/tour-map/tour-map.component';
import { ClubComponent } from 'src/app/feature-modules/club/club/club.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'tour', component: TourComponent, canActivate: [AuthGuard] },
  {
    path: 'tourPoint',
    component: TourPointsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'objects', component: TourObjectComponent },
  { path: 'tourMap/:id', component: TourMapComponent },
  // {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path: 'accounts', component: AccountComponent, canActivate: [AuthGuard],},
  {path: 'club', component: ClubComponent},

  {
    path: 'guideReview',
    component: GuideReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
