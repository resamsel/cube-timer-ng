import { PuzzleListState } from '../services/puzzle.service';
import { ScoreListState } from '../services/score.service';
import { SettingsState } from '../services/settings.service';

export interface AppState {
  settings: SettingsState;
  puzzles: PuzzleListState;
  scores: ScoreListState;
  puzzle: string;
}

export const initialState: AppState = {
  puzzle: '3x3x3',
  puzzles: {
    list: []
  },
  scores: {
    list: []
  },
  settings: {
    uid: undefined,
    language: 'en',
    inspectionTime: 0,
    soundAfterInspection: false,
    windowSize: 100,
    pageSize: 50
  }
};
