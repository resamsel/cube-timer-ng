import { Action } from '@ngrx/store';
import { UserInfo } from './user.model';

export enum UserActionTypes {
  UserGet = '[User] Get User'
}

export class UserGetAction implements Action {
  readonly type = UserActionTypes.UserGet;

  constructor(public user: UserInfo | null) {
  }
}

export type UserActions = UserGetAction;
