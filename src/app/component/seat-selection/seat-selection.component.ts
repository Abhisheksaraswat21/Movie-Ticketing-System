import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowtimeService } from '../../Services/showtime.service';
import { BookingService } from '../../Services/booking.service';
import { MovieService } from '../../Services/movie.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  rows: string[][] = [];
  selectedSeats: string[] = [];
  movieId: number = 0;
  showtimeId: number = 0;
  totalPrice: number = 0;
  pricePerSeat: number = 300;
  showDetails: any;
  movieDetails: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showtimeService: ShowtimeService,
    private movieService: MovieService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      // @ts-ignore
      this.movieId = +params.get('movieId');
      // @ts-ignore
      this.showtimeId = +params.get('showtimeId');
      this.fetchAvailableSeats();
      this.getMovieDetails(this.movieId);
      this.getShowDetails(this.showtimeId);
    });
  }

  getMovieDetails(id: number) {
    this.movieService.getMovieById(id).subscribe((data) => {
      this.movieDetails = data;
    });
  }
  getShowDetails(id: number) {
    this.showtimeService.getShowtimeById(id).subscribe((data) => {
      this.showDetails = data;
    });
  }

  fetchAvailableSeats(): void {
    this.showtimeService
      .getAvailableSeats(this.showtimeId)
      .subscribe((seats) => {
        this.rows = seats;
      });
  }

  toggleSeat(seat: string): void {
    console.log(this.selectedSeats);
    const index = this.selectedSeats.indexOf(seat);
    if (index !== -1) {
      this.selectedSeats.splice(index, 1);
      this.totalPrice = this.pricePerSeat * this.selectedSeats?.length;
    } else {
      this.selectedSeats.push(seat);
      this.totalPrice = this.pricePerSeat * this.selectedSeats?.length;
    }
  }

  isSeatSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  // bookTickets(): void {
  //   const userId = this.authService.getCurrentUser().id;
  //   const totalPrice = this.totalPrice;

  //   const bookingDetails = {
  //     userId,
  //     movieId: this.movieId,
  //     showtimeId: this.showtimeId,
  //     seats: this.selectedSeats.join(', '),
  //     totalPrice,
  //   };

  //   this.bookingService.bookTickets(bookingDetails).subscribe((response) => {
  //     if (response.success) {
  //       this.showtimeService
  //         .updateSeatsAvailable(this.showtimeId, this.selectedSeats)
  //         .subscribe((updateResponse) => {
  //           if (updateResponse.success) {
  //             alert('Tickets booked successfully!');
  //             this.router.navigate(['/']);
  //             console.log('Tickets booked successfully!');
  //           } else {
  //             console.error('Failed to update seats available.');
  //           }
  //         });
  //     } else {
  //       console.error('Failed to book tickets.');
  //     }
  //   });
  // }

  bookTickets(): void {
    const userId = this.authService.getCurrentUser().id;
    const totalPrice = this.totalPrice;

    const bookingDetails = {
      userId,
      movieId: this.movieId,
      showtimeId: this.showtimeId,
      seats: this.selectedSeats.join(', '),
      totalPrice,
      movie: this.movieDetails,
      show: this.showDetails,
    };

    this.bookingService.bookTickets(bookingDetails).subscribe((response) => {
      if (response.success) {
        this.updateSeatsAndNavigate();
      } else {
        console.error('Failed to book tickets.');
      }
    });
  }

  private updateSeatsAndNavigate(): void {
    this.showtimeService
      .updateSeatsAvailable(this.showtimeId, this.selectedSeats)
      .subscribe((updateResponse) => {
        if (updateResponse.success) {
          alert('Tickets booked successfully!');
          this.router.navigate(['/']);
          console.log('Tickets booked successfully!');
        } else {
          console.error('Failed to update seats available.');
        }
      });
  }
}
