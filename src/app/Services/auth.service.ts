import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: any[] = [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password1',
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password2',
    },
  ];

  constructor(private router: Router) {}

  signUp(userData: any): Observable<any> {
    const newUser = { id: this.users.length + 1, ...userData };
    this.users.push(newUser);
    return of(newUser);
  }

  signIn(credentials: any): Observable<any> {
    const user = this.users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    } else {
      return of(null);
    }
  }
  signInAdmin(credentials: any): Observable<any> {
    if (
      credentials.email == 'abhi@gmail.com' &&
      credentials.password == 'abhishek'
    ) {
      localStorage.setItem('adminUser', JSON.stringify(credentials));
      return of(credentials);
    } else {
      return of(null);
    }
  }

  signOut(): Observable<any> {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    this.router.navigate(['/']);
    return of(null);
  }

  adminSignOut(): Observable<any> {
    localStorage.removeItem('adminUser');
    alert('Logged out successfully!');
    this.router.navigate(['/']);
    return of(null);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  getCurrentAdmin(): any {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  }
}
