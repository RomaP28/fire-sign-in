import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export class Login {
  constructor(
    public email: string,
    public password: string
  ) { }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', Validators.required)
  // })


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit(): void {
  }

  submit(data: Login) {
    console.log('data that came out: ', data)

    // if (!this.loginForm.valid) {
    //   return
    // }

    this.authService.login(data.email, data.password).pipe(
      this.toast.observe({
        success: 'Logged on successfully',
        loading: 'Logging in...',
        error: 'There was an error'
      })
    ).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

}
