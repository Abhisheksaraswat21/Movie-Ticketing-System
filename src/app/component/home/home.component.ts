import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../Services/movie.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movies: any[] = [];

  userLoggedIn: boolean = false;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
    this.userLoggedIn = !!this.authService.getCurrentUser();
  }

  viewMovieDetails(movieId: number): void {
    this.router.navigate(['/movie-details', movieId]);
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
