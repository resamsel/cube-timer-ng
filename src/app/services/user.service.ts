import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppState } from '../shared/app.state';
import { UserGetAction } from '../models/user/user.actions';
import { reducer, UserState } from '../models/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static reducer = reducer;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    afAuth.authState.subscribe((user: firebase.User | null) => {
      this.store.dispatch(new UserGetAction(user));
    });
  }

  public user$(): Observable<UserState> {
    return this.store.pipe(select(state => state.users));
  }

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.store.dispatch(new UserGetAction(credential.user));
        return credential;
      });
  }

  public signInWithGoogle(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => {
        this.store.dispatch(new UserGetAction(credential.user));
      })
      .catch((reason => console.error('Error while signing in with Google', reason)));
  }

  public signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.store.dispatch(new UserGetAction(credential.user));
        return credential;
      });
  }

  public signOut(): void {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/']));
  }
}
