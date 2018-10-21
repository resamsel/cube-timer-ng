import { PuzzleState } from '../models/puzzle/puzzle.reducer';
import { ScoreState } from '../models/score/score.reducer';
import { TimerState } from '../models/timer/timer.reducer';
import { UserState } from '../models/user/user.reducer';
import { SettingsState } from '../models/settings/settings.reducer';

export interface AppState {
  timer: TimerState;
  users: UserState;
  settings: SettingsState;
  puzzles: PuzzleState;
  scores: ScoreState;
}
