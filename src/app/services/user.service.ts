import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppState } from '../shared/app.state';
import { SettingsState } from './settings.service';

export interface User extends SettingsState {
  deleted: boolean;
  email: string;
  name: string;
  photoUrl: string;
  uid: string;
}

export const USER_GET = '[User] Get';

export class UserGetAction implements Action {
  readonly type = USER_GET;

  constructor(public user: firebase.User) {
  }
}

export class UserState {
  user: firebase.User | null;
}

export const initialUserState: UserState = {
  user: null
};

export type UserActions = UserGetAction;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: firebase.User = null;

  public static userReducer(state: UserState = initialUserState, action: UserActions): UserState {
    console.log('userReducer', state, action);
    switch (action.type) {
      case USER_GET:
        return {
          ...state,
          user: action.user
        };
      default:
        return state;
    }
  }

  get user(): firebase.User {
    return this._user;
  }

  get loggedIn(): boolean {
    return this._user !== null;
  }

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    this.user$().subscribe((state: UserState) => this._user = state.user);
    afAuth.authState.subscribe((user: firebase.User | null) => {
      this.store.dispatch(new UserGetAction(user));
    });
  }

  public user$(): Observable<UserState> {
    return this.store.pipe(select(state => state.users));
  }

  public signIn(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => {
        console.log('credential', credential);
        this.store.dispatch(new UserGetAction(credential.user));
      })
      .catch(reason => console.error(reason));
  }

  public signOut(): void {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/']));
  }
}
