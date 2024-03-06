import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: any[] = [
    {
      id: 1,
      title: 'Movie 1',
      description: 'Description for Movie 1',
      poster:
        'https://img.etimg.com/thumb/width-1200,height-1200,imgsize-65524,resizemode-75,msid-106453465/magazines/panache/will-thalapathy-vijay-be-crowned-as-the-g-o-a-t-second-look-at-superstars-upcoming-movie-to-be-unveiled-at-600-today.jpg',
      trailer: 'trailer1.mp4',
    },
    {
      id: 2,
      title: 'Movie 2',
      description: 'Description for Movie 2',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
      trailer: 'trailer2.mp4',
    },
  ];

  constructor() {}

  getUpcomingMovies(): Observable<any[]> {
    return of(this.movies);
  }

  getMovieById(id: number): Observable<any> {
    const movie = this.movies.find((m) => m.id === id);
    return of(movie);
  }
  getMovies(): Observable<any[]> {
    return of(this.movies);
  }

  addMovie(movie: any): Observable<any> {
    movie.id = this.movies.length + 1;
    this.movies.push(movie);
    return of(movie);
  }

  deleteMovie(id: number): Observable<any> {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index !== -1) {
      this.movies.splice(index, 1);
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Movie not found' });
    }
  }
  updateMovie(movie: any): Observable<any> {
    const index = this.movies.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      this.movies[index] = movie;
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Movie not found' });
    }
  }
}
