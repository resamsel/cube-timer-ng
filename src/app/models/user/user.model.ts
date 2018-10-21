import { SettingsState } from '../settings/settings.reducer';

export interface User extends SettingsState {
  deleted: boolean;
  email: string;
  name: string;
  photoUrl: string;
  uid: string;
}

export interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}
