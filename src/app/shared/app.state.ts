import { PuzzleState } from '../models/puzzle/puzzle.reducer';
import { ScoreState } from '../models/score/score.reducer';
import { TimerState } from '../models/timer/timer.reducer';
import { SettingsState } from '../services/settings.service';
import { UserState } from '../services/user.service';

export interface AppState {
  timer: TimerState;
  users: UserState;
  settings: SettingsState;
  puzzles: PuzzleState;
  scores: ScoreState;
}
