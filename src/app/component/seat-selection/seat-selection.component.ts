import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowtimeService } from '../../Services/showtime.service';
import { BookingService } from '../../Services/booking.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private showtimeService: ShowtimeService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      // @ts-ignore
      this.movieId = +params.get('movieId');
      // @ts-ignore
      this.showtimeId = +params.get('showtimeId');
      this.fetchAvailableSeats();
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
    const index = this.selectedSeats.indexOf(seat);
    if (index !== -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isSeatSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  isSeatBooked(seat: string): boolean {
    for (let row of this.rows) {
      if (row.includes(seat)) {
        return true;
      }
    }
    return false;
  }

  bookTickets(): void {
    const userId = 1;
    const totalPrice = this.selectedSeats.length * 10;

    const bookingDetails = {
      userId,
      movieId: this.movieId,
      showtimeId: this.showtimeId,
      seats: this.selectedSeats.join(', '),
      totalPrice,
    };

    this.bookingService.bookTickets(bookingDetails).subscribe((response) => {
      if (response.success) {
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
      } else {
        console.error('Failed to book tickets.');
      }
    });
  }
}
