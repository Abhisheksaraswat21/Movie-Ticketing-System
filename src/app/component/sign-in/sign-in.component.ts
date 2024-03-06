import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn(): void {
    const credentials = { email: this.email, password: this.password };
    this.authService.signIn(credentials).subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        alert('Invalid email or password');
      }
    });
  }
}
