import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Data } from 'src/app/components/login/login.component'


@Component({
  selector: 'app-login-child',
  templateUrl: './login-child.component.html',
  styleUrls: ['./login-child.component.css']
})

export class LoginChildComponent implements OnInit {

  email = "";
  password = "";
  @Output() onSubmit: EventEmitter<Data> = new EventEmitter<Data>();

  constructor() { }

  ngOnInit(): void { }

  submitData() {
    const data: Data = {
      email: this.email,
      password: this.password
    }
    this.onSubmit.emit(data)
    console.log('data go out: ', data)
  }
}
