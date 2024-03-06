import { Component } from '@angular/core';
import { BookingService } from '../../Services/booking.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const userId = 1;
    this.getBookingsForUser(userId);
  }

  getBookingsForUser(userId: number): void {
    this.bookingService
      .getBookingsForUser(userId)
      .subscribe((bookings) => (this.bookings = bookings));
  }
}
