import { initialPuzzleState, puzzleReducer } from './services/puzzle.service';
import { initialScoreState, ScoreService } from './services/score.service';
import { initialSettingsState, SettingsService } from './services/settings.service';
import { initialUserState, UserService } from './services/user.service';
import { AppState } from './shared/app.state';

export const initialState: AppState = {
  user: initialUserState,
  puzzle: initialPuzzleState,
  score: initialScoreState,
  settings: initialSettingsState
};

export const reducers = {
  users: UserService.userReducer,
  puzzles: puzzleReducer,
  scores: ScoreService.scoreReducer,
  settings: SettingsService.settingsReducer
};
