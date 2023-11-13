import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';

import { TourReviewFormComponent } from 'src/app/feature-modules/marketplace/tour-review-form/tour-review-form.component';
import { TourReviewsShowComponent } from 'src/app/feature-modules/marketplace/tour-reviews-show/tour-reviews-show.component';

import { AccountComponent } from 'src/app/feature-modules/administration/account/account.component';
import { GuideReviewComponent } from 'src/app/feature-modules/marketplace/guide-review/guide-review.component';
import { PreferencesComponent } from '../../feature-modules/marketplace/preferences/preferences.component';

import { TourPointsComponent } from 'src/app/feature-modules/tour-authoring/tour-points/tour-points.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { TourObjectComponent } from 'src/app/feature-modules/tour-authoring/tour-object/tour-object.component';
import { MapComponent } from 'src/app/shared/map/map.component';
import { TourMapComponent } from 'src/app/feature-modules/tour-authoring/tour-map/tour-map.component';
import { BlogPostCommentComponent } from 'src/app/feature-modules/blog/blog-post-comment/blog-post-comment.component';
import { BlogpostComponent } from 'src/app/feature-modules/blog/blogpost/blogpost.component';

import { ClubComponent } from 'src/app/feature-modules/club/club/club.component';

import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';

import { AppRatingsComponent } from 'src/app/feature-modules/administration/app-ratings/app-ratings.component';
import { AppRatingFormComponent } from 'src/app/feature-modules/administration/app-rating-form/app-rating-form.component';
import { ToursShowComponent } from 'src/app/feature-modules/marketplace/tours-show/tours-show.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  //{path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]}, khm, khm..
  {path: 'guideReview', component: GuideReviewComponent, canActivate: [AuthGuard]},
  {path: 'preferences', component: PreferencesComponent, canActivate: [AuthGuard]},
  { path: 'tour', component: TourComponent, canActivate: [AuthGuard] },
  {
    path: 'tourPoint',
    component: TourPointsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'objects', component: TourObjectComponent },
  { path: 'tourMap/:id', component: TourMapComponent },
  {path: 'accounts', component: AccountComponent, canActivate: [AuthGuard],},
  {path: 'blogPostComment', component: BlogPostCommentComponent, canActivate: [AuthGuard],},
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
  {path: 'tourReviewForm/:id', component: TourReviewFormComponent},
  {path: 'tourReviewShow', component: TourReviewsShowComponent},
  {path: 'blog', component: BlogpostComponent, canActivate: [AuthGuard],},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'app-ratings', component: AppRatingsComponent},
  {path: 'app-rating-form', component: AppRatingFormComponent},
  {path: 'tours-show', component: ToursShowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
