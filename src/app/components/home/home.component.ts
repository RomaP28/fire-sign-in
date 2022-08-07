import { Component, OnInit } from '@angular/core';
import { collection, getDocs, getFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  users: any = []

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserList()
  }

  async getUserList(){
    const querySnapshot = await getDocs(collection(getFirestore(), "users"));
    querySnapshot.forEach(doc => {
      this.users.push({
        name: doc.data()['name'],
        lastname: doc.data()['lastname'],
        email: doc.data()['email']})
    });
  }
}
