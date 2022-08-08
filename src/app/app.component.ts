import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { logEvent, getAnalytics } from "@angular/fire/analytics";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngAfterViewInit(){
    const analytics = getAnalytics();
    logEvent(analytics, 'notification_received');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
}
