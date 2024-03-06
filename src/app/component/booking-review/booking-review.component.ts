import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../Services/booking.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrl: './booking-review.component.css',
})
export class BookingReviewComponent implements OnInit {
  booking: any;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.authService.getCurrentUser().id;
    this.bookingService.getBookingsForUser(userId).subscribe((response) => {
      if (response) {
        this.booking = response;
        console.log(response);
      } else {
        this.booking = null;
      }
    });
  }
}
