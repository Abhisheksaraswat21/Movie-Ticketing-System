import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from '../../Services/showtime.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-showtime-form',
  templateUrl: './admin-showtime-form.component.html',
  styleUrl: './admin-showtime-form.component.css',
})
export class AdminShowtimeFormComponent implements OnInit {
  showtime: any = {};
  selectedSeats: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private showtimeService: ShowtimeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.showtimeService
        .getShowtimeById(+id)
        .subscribe((showtime) => (this.showtime = showtime));
    }
  }

  onSubmit(): void {
    if (this.showtime.id) {
      this.showtimeService.updateShowtime(this.showtime).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    } else {
      this.showtimeService.addShowtime(this.showtime).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
