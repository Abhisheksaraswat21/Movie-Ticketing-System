import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  userData: any = {};
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.userData.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.signUp(this.userData).subscribe((response) => {
      if (response) {
        alert('Sign up successful!');
        this.router.navigate(['/signin']);
      } else {
        alert('Sign up failed. Please try again.');
      }
    });
  }
}
