import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowtimeService } from '../../Services/showtime.service';

@Component({
  selector: 'app-showtimes',
  templateUrl: './showtimes.component.html',
  styleUrl: './showtimes.component.css',
})
export class ShowtimesComponent implements OnInit {
  @Input() movieId: number = 0;
  @Input() movieTitle: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showtimeService: ShowtimeService
  ) {}

  showtimes: any[] = [];

  ngOnInit(): void {
    // @ts-ignore
    console.log('hello');
    this.getShowtimesForMovie(this.movieId);
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
