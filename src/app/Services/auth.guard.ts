// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../Services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     const currentUser = !!this.authService.getCurrentUser();
//     // if (currentUser) {
//     //   // Check if route has expected role data
//     //   if (route.data && route.data.role) {
//     //     // Check if the user has the required role
//     //     if (currentUser.role === route.data.role) {
//     //       return true;
//     //     } else {
//     //       // Redirect to unauthorized page if user role doesn't match
//     //       return this.router.createUrlTree(['/unauthorized']);
//     //     }
//     //   } else {
//     //     // User is authenticated and route doesn't require specific role
//     //     return true;
//     //   }
//     // }
//     if (currentUser) {
//       console.log(currentUser);
//       return true;
//     } else {
//       this.router.createUrlTree(['/login']);
//       return false;
//     }
//   }
// }

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = !!this.authService.getCurrentUser();

    if (currentUser) {
      return true;
    } else {
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
  }
}
