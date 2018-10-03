import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, Store } from '@ngrx/store';
import { AppState, initialState } from '../shared/app.state';
import { User } from './user.service';

export interface SettingsState {
  language: string;
  inspectionTime: number;
  soundAfterInspection: boolean;
  windowSize: number;
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

@Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(
    private readonly database: AngularFirestore,
    private readonly store: Store<AppState>) {
  }

  public static settingsReducer(state: SettingsState = initialState.settings, action: SettingsReadAction) {
    switch (action.type) {
      case SETTINGS_READ_ACTION:
        return {
          ...state,
          ...action.settings
        };
      default:
        return state;
    }
  }

  public settings(uid: string): void {
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
