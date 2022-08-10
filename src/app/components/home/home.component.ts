import { Component, OnInit } from '@angular/core';
import { collection, getDocs, getFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { logEvent, getAnalytics } from "@angular/fire/analytics";
import { User } from 'src/app/app.component';

// let currentUser: User = new User('', '')

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

  getCurrentUserData(users: [any]) {
    this.user$.subscribe(data => {
      let currentUser = users.find(el => data?.uid === el.user_uid)
      const analytics = getAnalytics();
      logEvent(analytics, localStorage.getItem('event') || "custom", {
        user_uid: currentUser.user_uid,
        user_email: currentUser.user_email,
        user_name: currentUser.user_name,
        user_last_name: currentUser.user_last_name
      });
    })
  }

  async getUserList() {
    const querySnapshot = await getDocs(collection(getFirestore(), "users"));
    querySnapshot.forEach(doc => {
      this.users.push({
        user_uid: doc.data()['uid'],
        user_name: doc.data()['name'],
        user_last_name: doc.data()['lastName'],
        user_email: doc.data()['email']
      })
    });
    this.getCurrentUserData(this.users)
  }
}
