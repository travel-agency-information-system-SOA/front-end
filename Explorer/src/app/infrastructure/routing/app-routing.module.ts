import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AccountComponent } from 'src/app/feature-modules/administration/account/account.component';
import { GuideReviewComponent } from 'src/app/feature-modules/marketplace/guide-review/guide-review.component';
import { PreferencesComponent } from "../../feature-modules/marketplace/preferences/preferences.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'accounts', component: AccountComponent, canActivate: [AuthGuard],},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path: 'guideReview', component: GuideReviewComponent, canActivate: [AuthGuard]},
  {path: 'preferences', component: PreferencesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
