import { SettingsState } from '../services/settings.service';
import { UserState } from '../services/user.service';
import { ScoreState } from "../models/score/score.reducer";
import { TimerState } from "../models/timer/timer.reducer";
import { PuzzleState } from "../models/puzzle/puzzle.reducer";

export interface AppState {
  timer: TimerState;
  users: UserState;
  settings: SettingsState;
  puzzles: PuzzleState;
  scores: ScoreState;
}
