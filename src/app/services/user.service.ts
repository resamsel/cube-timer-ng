import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export interface User {
  deleted: boolean;
  email: string;
  hintVisible: boolean;
  inspectionTime: number;
  soundAfterInspection: boolean;
  language: string;
  name: string;
  photoUrl: string;
  uid: string;
  windowSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _loggedIn: boolean;
  private _user: firebase.User;

  get user(): firebase.User {
    return this._user;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe((user: firebase.User | null) => {
      this._user = user;
      this._loggedIn = user !== null;
    });
  }

  public authState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  public signIn(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => {
        this._user = credential.user;
        this._updateUserData();
      })
      .catch(reason => console.error(reason));
  }

  public signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private _updateUserData() {
    // TODO
  }
}
