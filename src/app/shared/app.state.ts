import { PuzzleState } from '../services/puzzle.service';
import { ScoreState } from '../services/score.service';
import { SettingsState } from '../services/settings.service';
import { UserState } from '../services/user.service';

export interface AppState {
  users: UserState;
  settings: SettingsState;
  puzzles: PuzzleState;
  scores: ScoreState;
}
