import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Login } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-login-child',
  templateUrl: './login-child.component.html',
  styleUrls: ['./login-child.component.css']
})

export class LoginChildComponent implements OnInit {
  user: Login = new Login("", "");

  @Output() onSubmit: EventEmitter<Login> = new EventEmitter<Login>();

  constructor() { }

  ngOnInit(): void { }

  submitData() {
    const data: Login = {
      email: this.user.email,
      password: this.user.password
    }
    this.onSubmit.emit(data)
    console.log('data go out: ', data)
  }
}
