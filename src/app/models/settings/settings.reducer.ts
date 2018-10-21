import { SettingsActions, SettingsActionTypes } from './settings.actions';

export interface SettingsState {
  uid?: string;
  language: string;
  inspectionTime: number;
  soundAfterInspection: boolean;
  windowSize: number;
  pageSize: number;
}

export const initialState: SettingsState = {
  language: 'en',
  inspectionTime: 0,
  soundAfterInspection: false,
  windowSize: 100,
  pageSize: 50
};

export function reducer(state = initialState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.LoadSettings: {
      return {
        ...state,
        ...action.payload.state
      };
    }

    default: {
      return state;
    }
  }
}
