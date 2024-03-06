import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css',
})
export class AdminloginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn(): void {
    const credentials = { email: this.email, password: this.password };
    console.log(credentials);
    this.authService.signInAdmin(credentials).subscribe((user) => {
      if (user) {
        this.router.navigate(['/admin']);
      } else {
        // Handle failed sign-in
        alert('Invalid email or password');
      }
    });
  }
}
