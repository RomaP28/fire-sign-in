// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthenticationService } from './authentication.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthenticationService, private router: Router) { };

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any {
//     console.log(next.data);
//     let isLoggedIn = this.authService.currentUser$;

//     isLoggedIn.subscribe(data => {
//       console.log(data)
//     })

//     if (isLoggedIn) {
//       return true
//     } else {
//       this.router.navigate(['/home']);
//     }
//   }

// }