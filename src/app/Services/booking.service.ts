import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: any[] = [];

  constructor() {}

  bookTickets(bookingDetails: any): Observable<any> {
    this.bookings.push(bookingDetails);
    return of({ success: true, bookingDetails });
  }

  getBookingsForUser(userId: number): Observable<any[]> {
    const userBookings = this.bookings.filter(
      (booking) => booking.userId === userId
    );
    return of(userBookings);
  }

  getAllBookings(): Observable<any[]> {
    return of(this.bookings);
  }
  confirmBooking(booking: any): Observable<any> {
    const index = this.bookings.findIndex((b) => b.id === booking.id);
    if (index !== -1) {
      this.bookings[index].confirmed = true;
      return of({ success: true, booking });
    } else {
      return of({ success: false, message: 'Booking not found' });
    }
  }
}
