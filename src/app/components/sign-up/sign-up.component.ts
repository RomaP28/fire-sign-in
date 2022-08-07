import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export class User {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string
  ) { }
}

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
      this.router.navigate(['/home']);
    })
  }
}