import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmpassword = control.get('confirmPassword')?.value;

    if (password && confirmpassword && password !== confirmpassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() })
  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router) {

  }

  ngOnInit(): void {
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid) return;

    const { email, name, password }: any = this.signUpForm.value;
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

}