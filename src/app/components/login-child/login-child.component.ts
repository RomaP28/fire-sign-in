import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { User } from 'src/app/app.component';

@Component({
  selector: 'app-login-child',
  templateUrl: './login-child.component.html',
  styleUrls: ['./login-child.component.css']
})

export class LoginChildComponent implements OnInit {
  user: User = new User("", "");

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void { }

  submitData() {
    const data: User = {
      email: this.user.email,
      password: this.user.password
    }
    this.onSubmit.emit(data)
  }
}
