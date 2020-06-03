import { Injectable } from "@angular/core";
import { User } from "./user";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email, password) {
    console.log("2");

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['/dashboard/murli']);
      })
      .catch(err => alert("Error: " + err));

    // Google Login
    // const provider = new auth.GoogleAuthProvider();
    // const credential = await this.afAuth.auth.signInWithPopup(provider);
    // return this.updateUserData(credential.user);
  }

  logout() {
    this.afAuth.auth.signOut().then(res => this.router.navigate(['/login']));
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    userRef.set(data, { merge: true });
  }
}
