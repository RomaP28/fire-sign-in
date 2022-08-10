import { Injectable } from '@angular/core';

import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, pipe, switchMap } from 'rxjs';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth,
    private router: Router,
    private firestore: Firestore,
    private toast: HotToastService) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(data: User) {
    return from(createUserWithEmailAndPassword(this.auth, data.email, data.password)).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: data.name }).then(() => {
        const ref = doc(this.firestore, 'users', user.uid);
        console.log(user)
        return from(setDoc(ref, {
          uid: user.uid,
          email: data.email,
          name: data.name,
          lastName: data.lastName
        }));
      }))
    )
  }

  logout() {
    return from(this.auth.signOut())
  }

  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email).then((err) => {
      this.toast.success('Link sent successfully')
      this.router.navigate(['/login'])
    }).catch(() => {
      this.toast.error('There was an error')
      this.router.navigate(['/forgot-password'])
    })
  }

  async sendEmailForVerification(user: any) {
    sendEmailVerification(user).then(() => {
      this.router.navigate(['/verify-email']);
    });
  }
}
