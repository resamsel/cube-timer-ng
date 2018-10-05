import { PuzzleService } from './services/puzzle.service';
import { ScoreService } from './services/score.service';
import { SettingsService } from './services/settings.service';
import { UserService } from './services/user.service';

export const reducers = {
  users: UserService.userReducer,
  puzzles: PuzzleService.puzzleReducer,
  scores: ScoreService.scoreReducer,
  settings: SettingsService.settingsReducer
};
