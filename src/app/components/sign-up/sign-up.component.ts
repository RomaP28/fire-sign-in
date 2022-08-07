import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export class SignUp {
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

  submit(data: SignUp) {
    const { email, name, password }: any = data;
    this.authService.signUp(name, email, password).pipe(
      this.toast.observe({
        success: 'Congrats! You sign up!',
        loading: 'Signin in',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

  

  // submit(data: SignUp) {
  //   console.log(data)
  //   // if (!this.signUpForm.valid) return;

  //   const { email, name, password } = data;
  //   this.authService.signUp(name, email, password).catch(
  //     this.toast.observe({
  //       success: 'Congrats! You sign up!',
  //       loading: 'Signin in',
  //       error: ({ message }) => `${message}`
  //     }))
  //     .then(() => {
  //       this.router.navigate(['/home']);
  //     })
  // }
}