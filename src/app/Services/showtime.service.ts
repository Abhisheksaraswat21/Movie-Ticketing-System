import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowtimeService {
  private showtimes: any[] = [
    {
      id: 1,
      movieId: 1,
      dateTime: new Date('2024-03-10T12:00:00'),
      // seatsAvailable: 100,
      seatsAvailable: [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
      ],
    },
    {
      id: 2,
      movieId: 1,
      dateTime: new Date('2024-03-10T15:00:00'),
      seatsAvailable: [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3', 'c4'],
      ],
    },
    {
      id: 3,
      movieId: 2,
      dateTime: new Date('2024-03-11T14:00:00'),
      seatsAvailable: [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
      ],
    },
  ];

  getShowtimesForMovie(movieId: number): Observable<any[]> {
    const movieShowtimes = this.showtimes.filter(
      (showtime) => showtime.movieId === movieId
    );
    return of(movieShowtimes);
  }

  getShowtimeById(showtimeId: number): Observable<any> {
    const showtime = this.showtimes.find((s) => s.id === showtimeId);
    return of(showtime);
  }

  updateSeatsAvailable(
    showtimeId: number,
    seatsBooked: string[]
  ): Observable<any> {
    const showtime = this.showtimes.find((s) => s.id === showtimeId);
    if (showtime) {
      console.log('showtime', showtime.seatsAvailable, seatsBooked);

      showtime.seatsAvailable = showtime.seatsAvailable.map((innerArray: any) =>
        innerArray.filter((item: any) => !seatsBooked.includes(item))
      );

      return of({ success: true });
    } else {
      return of({ success: false, message: 'Showtime not found' });
    }
  }

  getAvailableSeats(showtimeId: number): Observable<string[][]> {
    const showtime = this.showtimes.find((s) => s.id === showtimeId);
    if (showtime) {
      return of(showtime.seatsAvailable);
    } else {
      return of([]);
    }
  }

  getShowtimes(): Observable<any[]> {
    return of(this.showtimes);
  }

  addShowtime(showtime: any): Observable<any> {
    showtime.id = this.showtimes.length + 1;
    let seatsAvailableArray = Array.from(
      { length: parseInt(showtime.seatsAvailable) },
      (_, index) => index + 1
    );

    showtime.seatsAvailable = seatsAvailableArray.reduce((acc, curr, index) => {
      const chunkIndex = Math.floor(index / 3);
      acc[chunkIndex] = acc[chunkIndex] || [];
      // @ts-ignore
      acc[chunkIndex].push(curr);
      return acc;
    }, []);

    this.showtimes.push(showtime);
    return of(showtime);
  }

  deleteShowtime(id: number): Observable<any> {
    const index = this.showtimes.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.showtimes.splice(index, 1);
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Showtime not found' });
    }
  }
  updateShowtime(showtime: any): Observable<any> {
    const index = this.showtimes.findIndex((s) => s.id === showtime.id);
    if (index !== -1) {
      this.showtimes[index] = showtime;
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Showtime not found' });
    }
  }
}
