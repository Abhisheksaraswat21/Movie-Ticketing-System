import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../Services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrl: './booking-review.component.css',
})
export class BookingReviewComponent implements OnInit {
  booking: any;

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.booking = {
      movieTitle: 'Movie 1',
      showtimeDateTime: '2024-03-10 12:00:00',
      seats: 'A1, A2, A3',
      totalPrice: '30',
    };
  }

  confirmBooking(): void {
    this.bookingService.confirmBooking(this.booking).subscribe((response) => {
      if (response.success) {
        console.log('Booking confirmed successfully!');
        this.router.navigate(['/booking-confirmation']);
      } else {
        console.error('Failed to confirm booking.');
      }
    });
  }
}
