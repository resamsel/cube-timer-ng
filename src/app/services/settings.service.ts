import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../shared/app.state';
import { User, UserService, UserState } from './user.service';

export interface SettingsState {
  uid?: string;
  language: string;
  inspectionTime: number;
  soundAfterInspection: boolean;
  windowSize: number;
  pageSize: number;
}

interface SettingsAction extends Action {
  settings: SettingsState;
}

const SETTINGS_READ_ACTION = '[Settings] Read';

class SettingsReadAction implements SettingsAction {
  readonly type = SETTINGS_READ_ACTION;

  constructor(public readonly settings: SettingsState) {
  }
}

const SETTINGS_WRITE_ACTION = '[Settings] Write';

export class SettingsWriteAction implements SettingsAction {
  readonly type = SETTINGS_WRITE_ACTION;

  constructor(public readonly settings: SettingsState) {
  }
}

export const initialSettingsState: SettingsState = {
  language: 'en',
  inspectionTime: 0,
  soundAfterInspection: false,
  windowSize: 100,
  pageSize: 50
};

@Injectable({providedIn: 'root'})
export class SettingsService {
  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly userService: UserService,
    private readonly database: AngularFirestore,
    private readonly store: Store<AppState>) {
    userService.user$().subscribe((state: UserState) => {
      if (state.user !== null) {
        this._subscription.unsubscribe();
        this.retrieveSettings(state.user.uid);
      }
    });
  }

  public static reducer(state: SettingsState = initialSettingsState, action: SettingsAction) {
    switch (action.type) {
      case SETTINGS_READ_ACTION:
        return {
          ...state,
          ...action.settings
        };
      case SETTINGS_WRITE_ACTION:
        return {
          ...state,
          ...action.settings
        };
      default:
        return state;
    }
  }

  public settings(): Observable<SettingsState> {
    return this.store.pipe(select(state => state.settings));
  }

  private retrieveSettings(uid: string): void {
    this._subscription = this.database
      .doc<User>(`/users/${uid}`)
      .valueChanges()
      .subscribe((user: User | undefined) => {
        if(user !== undefined) {
          this.store.dispatch(new SettingsReadAction(user));
        }
      });
  }

  public update(uid: string, settings: Partial<SettingsState>): Promise<void> {
    return this.database
      .doc(`/users/${uid}`)
      .set(settings, {merge: true});
  }
}
