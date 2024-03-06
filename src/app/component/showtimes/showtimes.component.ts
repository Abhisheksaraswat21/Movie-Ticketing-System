import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowtimeService } from '../../Services/showtime.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrl: './showtimes.component.css',
})
export class ShowtimesComponent implements OnInit {
  @Input() movieId: number = 0;
  @Input() movieTitle: string = '';
  userLoggedIn: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showtimeService: ShowtimeService,
    private authService: AuthService
  ) {}

  showtimes: any[] = [];

  ngOnInit(): void {
    // @ts-ignore
    console.log('hello');
    this.getShowtimesForMovie(this.movieId);
    this.userLoggedIn = this.authService.getCurrentUser();
  }

  getShowtimesForMovie(movieId: number): void {
    console.log(movieId);
    this.showtimeService
      .getShowtimesForMovie(movieId)
      .subscribe((showtimes) => (this.showtimes = showtimes));
  }

  selectShowtime(showtime: any): void {
    this.router.navigate(['/seat-selection', this.movieId, showtime.id]);
  }
}
