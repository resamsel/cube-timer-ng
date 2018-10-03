import { PuzzleService } from './services/puzzle.service';
import { ScoreService } from './services/score.service';
import { SettingsService } from './services/settings.service';

export const reducers = {
  puzzle: PuzzleService.activePuzzle,
  puzzles: PuzzleService.puzzlesReducer,
  scores: ScoreService.scoresReducer,
  settings: SettingsService.settingsReducer
};
