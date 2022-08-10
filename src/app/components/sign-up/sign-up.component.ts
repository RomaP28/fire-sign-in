import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router) {

  }

  ngOnInit(): void { }

  submit(data: User) {
    this.authService.signUp(data).pipe(
      this.toast.observe({
        success: 'Congrats! You sign up!',
        loading: 'Signin in',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      localStorage.setItem('event', 'signup')
      this.router.navigate(['/home']);
    })
  }
}