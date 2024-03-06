import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { BookingReviewComponent } from './component/booking-review/booking-review.component';
import { AdminShowtimeFormComponent } from './component/admin-showtime-form/admin-showtime-form.component';
import { AdminMovieFormComponent } from './component/admin-movie-form/admin-movie-form.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './Services/auth.guard';
import { SeatSelectionComponent } from './component/seat-selection/seat-selection.component';
import { AdminloginComponent } from './component/admin-login/adminlogin.component';
import { AdminAuthGuard } from './Services/adminauth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  {
    path: 'booking-review',
    component: BookingReviewComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: SignInComponent },
  { path: 'admin-login', component: AdminloginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/movie-add',
    component: AdminMovieFormComponent,
    canActivate: [AdminAuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/movie-edit/:id',
    component: AdminMovieFormComponent,
    canActivate: [AdminAuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/showtime-add',
    component: AdminShowtimeFormComponent,
    canActivate: [AdminAuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/showtime-edit/:id',
    component: AdminShowtimeFormComponent,
    canActivate: [AdminAuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'seat-selection/:movieId/:showtimeId',
    component: SeatSelectionComponent,
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
