import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-admin-movie-form',
  templateUrl: './admin-movie-form.component.html',
  styleUrl: './admin-movie-form.component.css',
})
export class AdminMovieFormComponent implements OnInit {
  movie: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService
        .getMovieById(+id)
        .subscribe((movie) => (this.movie = movie));
    }
  }

  onSubmit(): void {
    if (this.movie.id) {
      this.movieService.updateMovie(this.movie).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    } else {
      this.movieService.addMovie(this.movie).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
