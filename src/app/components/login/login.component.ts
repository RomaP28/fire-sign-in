import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit(): void {
  }

  submit(data: User) {
    this.authService.login(data.email, data.password).pipe(
      this.toast.observe({
        success: 'Logged on successfully',
        loading: 'Logging in...',
        error: 'There was an error'
      })
    ).subscribe(() => {
      localStorage.setItem('event', 'login')
      this.router.navigate(['/home'])
    })
  }



}
