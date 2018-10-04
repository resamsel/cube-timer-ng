import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, initialState } from '../shared/app.state';
import { User } from './user.service';

export interface SettingsState {
  uid: string;
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

@Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(
    private readonly database: AngularFirestore,
    private readonly store: Store<AppState>) {
  }

  public static settingsReducer(state: SettingsState = initialState.settings, action: SettingsAction) {
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

  public retrieveSettings(uid: string): void {
    this.database
      .doc<User>(`/users/${uid}`)
      .valueChanges()
      .subscribe(user => this.store.dispatch(new SettingsReadAction(user)));
  }

  public update(uid: string, settings: Partial<SettingsState>): Promise<void> {
    return this.database
      .doc(`/users/${uid}`)
      .set(settings, {merge: true});
  }
}
