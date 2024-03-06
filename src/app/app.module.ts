import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { AppState } from './store/Global/app.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './component/home/home.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { ShowtimesComponent } from './component/showtimes/showtimes.component';
import { SeatSelectionComponent } from './component/seat-selection/seat-selection.component';
import { BookingReviewComponent } from './component/booking-review/booking-review.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminMovieFormComponent } from './component/admin-movie-form/admin-movie-form.component';
import { AdminShowtimeFormComponent } from './component/admin-showtime-form/admin-showtime-form.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { CommonModule } from '@angular/common';
import { AdminloginComponent } from './component/admin-login/adminlogin.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    MovieDetailsComponent,
    ShowtimesComponent,
    SeatSelectionComponent,
    BookingReviewComponent,
    SignUpComponent,
    SignInComponent,
    AdminDashboardComponent,
    AdminMovieFormComponent,
    AdminShowtimeFormComponent,
    OrderHistoryComponent,
    AdminloginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(AppState),
    StoreDevtoolsModule.instrument({ maxAge: false, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],

  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
