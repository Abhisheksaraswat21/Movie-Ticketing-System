import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../Services/movie.service';
import { ShowtimeService } from '../../Services/showtime.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  movies: any[] = [];
  showtimes: any[] = [];

  constructor(
    private router: Router,
    private movieService: MovieService,
    private showtimeService: ShowtimeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getShowtimes();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  }

  getShowtimes(): void {
    this.showtimeService
      .getShowtimes()
      .subscribe((showtimes) => (this.showtimes = showtimes));
  }

  editMovie(movie: any): void {
    this.router.navigate(['/admin/movie-edit', movie.id]);
  }

  deleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(() => {
      this.movies = this.movies.filter((m) => m.id !== movieId);
      alert('Movie deleted successfully!');
    });
  }

  addMovie(): void {
    this.router.navigate(['/admin/movie-add']);
  }

  editShowtime(showtime: any): void {
    this.router.navigate(['/admin/showtime-edit', showtime.id]);
  }

  deleteShowtime(showtimeId: number): void {
    this.showtimeService.deleteShowtime(showtimeId).subscribe(() => {
      this.showtimes = this.showtimes.filter((s) => s.id !== showtimeId);
      alert('Showtime deleted successfully!');
    });
  }

  addShowtime(): void {
    this.router.navigate(['/admin/showtime-add']);
  }

  logout() {
    this.authService.adminSignOut();
    alert('Logged out successfully!');
  }
}
