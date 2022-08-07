import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { User } from 'src/app/components/sign-up/sign-up.component';


@Component({
  selector: 'app-sign-child',
  templateUrl: './sign-child.component.html',
  styleUrls: ['./sign-child.component.css']
})

export class SignChildComponent implements OnInit {

  user: User = new User("", "", "", "");

  @Output() onSignUp: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void { }

  submit() {
    const data: User = {
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    }
    this.onSignUp.emit(data)
  }
}