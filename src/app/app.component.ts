import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
// import 'firebase/analytics'

export class User {
  constructor(
    public email: string,
    public password: string,
    public uid?: string,
    public name?: string,
    public lastName?: string,
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthenticationService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
}

