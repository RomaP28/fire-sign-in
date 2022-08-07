import { Component, OnInit } from '@angular/core';
import {
  collection,
  collectionGroup,
  doc,
  docData,
  getFirestore,
  Firestore,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = []

  constructor() {
 
  }

  ngOnInit(): void {
    this.getDAta()
  }

  async getDAta(){

  const querySnapshot = await getDocs(collection(getFirestore(), "users"));
  querySnapshot.forEach(doc => {
    this.users.push({
      name: doc.data()['name'],
      lastname: doc.data()['lastname'],
      email: doc.data()['email']})
  });
}

}
