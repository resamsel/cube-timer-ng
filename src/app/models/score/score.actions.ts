import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Score } from './score.model';

export enum ScoreActionTypes {
  LoadScores = '[Score] Load Scores',
  AddScore = '[Score] Add Score',
  UpsertScore = '[Score] Upsert Score',
  AddScores = '[Score] Add Scores',
  UpsertScores = '[Score] Upsert Scores',
  UpdateScore = '[Score] Update Score',
  UpdateScores = '[Score] Update Scores',
  DeleteScore = '[Score] Delete Score',
  DeleteScores = '[Score] Delete Scores',
  ClearScores = '[Score] Clear Scores',
  StartLoading = '[Score] Start Loading',
  StopLoading = '[Score] Stop Loading'
}

export class LoadScores implements Action {
  readonly type = ScoreActionTypes.LoadScores;

  constructor(public payload: { scores: Score[] }) {
  }
}

export class AddScore implements Action {
  readonly type = ScoreActionTypes.AddScore;

  constructor(public payload: { score: Score }) {
  }
}

export class UpsertScore implements Action {
  readonly type = ScoreActionTypes.UpsertScore;

  constructor(public payload: { score: Score }) {
  }
}

export class AddScores implements Action {
  readonly type = ScoreActionTypes.AddScores;

  constructor(public payload: { scores: Score[] }) {
  }
}

export class UpsertScores implements Action {
  readonly type = ScoreActionTypes.UpsertScores;

  constructor(public payload: { scores: Score[] }) {
  }
}

export class UpdateScore implements Action {
  readonly type = ScoreActionTypes.UpdateScore;

  constructor(public payload: { score: Update<Score> }) {
  }
}

export class UpdateScores implements Action {
  readonly type = ScoreActionTypes.UpdateScores;

  constructor(public payload: { scores: Update<Score>[] }) {
  }
}

export class DeleteScore implements Action {
  readonly type = ScoreActionTypes.DeleteScore;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteScores implements Action {
  readonly type = ScoreActionTypes.DeleteScores;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearScores implements Action {
  readonly type = ScoreActionTypes.ClearScores;
}

export class StartLoading implements Action {
  readonly type = ScoreActionTypes.StartLoading;
}

export class StopLoading implements Action {
  readonly type = ScoreActionTypes.StopLoading;
}

export type ScoreActions =
  LoadScores
  | AddScore
  | UpsertScore
  | AddScores
  | UpsertScores
  | UpdateScore
  | UpdateScores
  | DeleteScore
  | DeleteScores
  | ClearScores
  | StartLoading
  | StopLoading;
