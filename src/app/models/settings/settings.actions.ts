import { Action } from '@ngrx/store';
import { SettingsState } from './settings.reducer';

export enum SettingsActionTypes {
  LoadSettings = '[Settings] Load Settings'
}

export class LoadSettings implements Action {
  readonly type = SettingsActionTypes.LoadSettings;

  constructor(public payload: { state: SettingsState }) {
  }
}

export type SettingsActions = LoadSettings;
