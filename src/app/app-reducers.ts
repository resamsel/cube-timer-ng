import { PuzzleService } from './services/puzzle.service';
import { ScoreService } from './services/score.service';
import { SettingsService } from './services/settings.service';
import { TimerService } from './services/timer.service';
import { UserService } from './services/user.service';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export const reducers = {
  users: UserService.reducer,
  puzzles: PuzzleService.reducer,
  settings: SettingsService.reducer,
  scores: ScoreService.reducer,
  timer: TimerService.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['users'], rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
