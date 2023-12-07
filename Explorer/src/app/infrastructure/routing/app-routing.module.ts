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
import { BlogComponent } from 'src/app/feature-modules/blog/blog/blog.component';
import { BlogPostDetailComponent } from 'src/app/feature-modules/blog/blog-post-detail/blog-post-detail.component';
import { BlogPostCreationComponent } from 'src/app/feature-modules/blog/blog-post-creation/blog-post-creation.component';

import { ClubComponent } from 'src/app/feature-modules/club/club/club.component';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';

import { AppRatingsComponent } from 'src/app/feature-modules/administration/app-ratings/app-ratings.component';
import { AppRatingFormComponent } from 'src/app/feature-modules/administration/app-rating-form/app-rating-form.component';
import { PrivateTourPointsComponent } from 'src/app/feature-modules/tour-authoring/private-tour-points/private-tour-points.component';
import { PublicTourPointRequestComponent } from 'src/app/feature-modules/administration/public-tour-point-request/public-tour-point-request.component';


import { ToursShowComponent } from 'src/app/feature-modules/marketplace/tours-show/tours-show.component';

import { FirstPointMap } from 'src/app/feature-modules/marketplace/first-point-map/first_point.component';
import { TourExecutionPositionComponent } from 'src/app/feature-modules/tour-execution/tour-execution-position/tour-execution-position.component';
import { UserPositionComponent } from 'src/app/feature-modules/administration/user-position/user-position.component';
import { ActiveTourComponent } from 'src/app/feature-modules/tour-execution/active-tour/active-tour.component';

import { TouristEquipmentComponent } from 'src/app/feature-modules/marketplace/tourist-equipment/tourist-equipment.component';

import { ProblemComponent } from 'src/app/feature-modules/marketplace/problem/problem.component';

import { TourSearchComponent } from 'src/app/feature-modules/marketplace/tour-search/tour-search.component';
import { TourMarketplaceComponent } from 'src/app/feature-modules/marketplace/tour-marketplace/tour-marketplace.component';
import { TourDetailsComponent } from 'src/app/feature-modules/marketplace/tour-details/tour-details.component';
import { PurchasedToursComponent } from 'src/app/feature-modules/tour-execution/purchased-tours/purchased-tours.component';

import { ShoppingCartComponent } from 'src/app/feature-modules/marketplace/shopping-cart/shopping-cart.component';

import { BlogPostUpdateComponent } from 'src/app/feature-modules/blog/blog-post-update/blog-post-update.component';
import { PurchasedTourDetailsComponent } from 'src/app/feature-modules/tour-execution/purchased-tour-details/purchased-tour-details.component';
import { EncountersPageComponent } from 'src/app/feature-modules/encounters/encounters-page/encounters-page.component';
import { CouponFormComponent } from 'src/app/feature-modules/marketplace/coupon-form/coupon-form.component';


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
  {
    path: 'privateTourPoints', component: PrivateTourPointsComponent},
   { path: 'public-tour-point-request', component: PublicTourPointRequestComponent},
  { path: 'objects', component: TourObjectComponent },
  { path: 'tourMap/:id', component: TourMapComponent },
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
  { path: 'shoppingcart', component: ShoppingCartComponent },
  { path: 'tour', component: TourComponent, canActivate: [AuthGuard] },
  {
    path: 'tourPoint',
    component: TourPointsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'objects', component: TourObjectComponent },
  { path: 'tourMap/:id', component: TourMapComponent },
  { path: 'accounts', component: AccountComponent, canActivate: [AuthGuard] },
  { path:'tourMapFirstPoint/:id',component: FirstPointMap},
  { path: 'club', component: ClubComponent },
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
  { path: 'tourReviewForm/:id', component: TourReviewFormComponent },
  { path: 'tourReviewShow', component: TourReviewsShowComponent },
  { path: 'tourist-equipment', component: TouristEquipmentComponent },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'blog/create-post', component: BlogPostCreationComponent, canActivate: [AuthGuard]},
  { path: 'blog/update-post/:id', component: BlogPostUpdateComponent, canActivate: [AuthGuard]},
  { path: 'blog/:id', component: BlogPostDetailComponent },
  { path: 'encounters', component: EncountersPageComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'app-ratings', component: AppRatingsComponent },

  { path: 'app-rating-form', component: AppRatingFormComponent },
  { path: 'tours-show', component: ToursShowComponent },

  { path: 'problems', component: ProblemComponent },

  {
    path: 'tour-execution-position',
    component: TourExecutionPositionComponent,
  },
  { path: 'user-position', component: UserPositionComponent },
  { path: 'activeTour', component: ActiveTourComponent },
  { path: 'app-rating-form', component: AppRatingFormComponent },
  { path: 'problems', component: ProblemComponent },
  { path: 'app-rating-form', component: AppRatingFormComponent },
  { path: 'tourSearch', component: TourSearchComponent },

  { path: 'tours-show', component: ToursShowComponent },
  { path: 'marketplace', component: TourMarketplaceComponent },
  { path: 'marketplace/:id', component: TourDetailsComponent },
  { path: 'private-tour-points', component: PrivateTourPointsComponent},
  { path: 'public-tour-point-request', component: PublicTourPointRequestComponent},
  { path: 'purchasedTours', component: PurchasedToursComponent},
  { path: 'purchasedTours/:id', component: PurchasedTourDetailsComponent},
  { path: 'createCoupon/:id', component: CouponFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
