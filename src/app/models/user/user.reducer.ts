import { UserActions, UserActionTypes } from './user.actions';
import { UserInfo } from './user.model';

export class UserState {
  user?: UserInfo | null;
}

export const initialUserState: UserState = {};

export function reducer(state: UserState = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.UserGet:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
