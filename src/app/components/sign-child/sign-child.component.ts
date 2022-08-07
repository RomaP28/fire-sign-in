import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { SignUp } from 'src/app/components/sign-up/sign-up.component';


@Component({
  selector: 'app-sign-child',
  templateUrl: './sign-child.component.html',
  styleUrls: ['./sign-child.component.css']
})

export class SignChildComponent implements OnInit {

  user: SignUp = new SignUp("", "", "", "");

  @Output() onSignUp: EventEmitter<SignUp> = new EventEmitter<SignUp>();

  constructor() { }

  ngOnInit(): void { }

  submit() {
    const data: SignUp = {
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    }
    this.onSignUp.emit(data)
  }
}