import { PuzzleService } from './services/puzzle.service';
import { ScoreService } from './services/score.service';
import { SettingsService } from './services/settings.service';
import { TimerService } from './services/timer.service';
import { UserService } from './services/user.service';

export const reducers = {
  users: UserService.reducer,
  puzzles: PuzzleService.reducer,
  settings: SettingsService.reducer,
  scores: ScoreService.reducer,
  timer: TimerService.reducer
};
