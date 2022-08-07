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
import { from, switchMap } from 'rxjs';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) { }
  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: name }).then(()=>{
          const ref = doc(this.firestore, 'users', user.uid);
          return from(setDoc(ref, {
            uid: user.uid,
            email: user.email,
            name: user.displayName    
          }));
      }))
    )
  }

  logout() {
    return from(this.auth.signOut())
  }

  forgotPassword(email: string){
      sendPasswordResetEmail(this.auth, email).then(()=>{
        this.router.navigate(['/login']);
      });
  }

  async sendEmailForVerification (user: any) {
    sendEmailVerification(user).then(()=>{
      this.router.navigate(['/verify-email']);
    });
  }
}
