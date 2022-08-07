import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth: AuthenticationService, 
  private router: Router) { }

  email: string = ''

  ngOnInit(): void {

  }

  forgotPassword(){
    this.auth.forgotPassword(this.email);
    this.email = ''
    this.router.navigate(['/verify-email']);
  }
}
