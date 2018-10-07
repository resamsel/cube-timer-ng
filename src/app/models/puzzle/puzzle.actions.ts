import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Puzzle } from './puzzle.model';

export enum PuzzleActionTypes {
  LoadPuzzles = '[Puzzle] Load Puzzles',
  AddPuzzle = '[Puzzle] Add Puzzle',
  UpsertPuzzle = '[Puzzle] Upsert Puzzle',
  AddPuzzles = '[Puzzle] Add Puzzles',
  UpsertPuzzles = '[Puzzle] Upsert Puzzles',
  UpdatePuzzle = '[Puzzle] Update Puzzle',
  UpdatePuzzles = '[Puzzle] Update Puzzles',
  DeletePuzzle = '[Puzzle] Delete Puzzle',
  DeletePuzzles = '[Puzzle] Delete Puzzles',
  ClearPuzzles = '[Puzzle] Clear Puzzles',
  ActivatePuzzle = '[Puzzle] Activate Puzzle'
}

export class LoadPuzzles implements Action {
  readonly type = PuzzleActionTypes.LoadPuzzles;

  constructor(public payload: { puzzles: Puzzle[] }) {
  }
}

export class AddPuzzle implements Action {
  readonly type = PuzzleActionTypes.AddPuzzle;

  constructor(public payload: { puzzle: Puzzle }) {
  }
}

export class UpsertPuzzle implements Action {
  readonly type = PuzzleActionTypes.UpsertPuzzle;

  constructor(public payload: { puzzle: Puzzle }) {
  }
}

export class AddPuzzles implements Action {
  readonly type = PuzzleActionTypes.AddPuzzles;

  constructor(public payload: { puzzles: Puzzle[] }) {
  }
}

export class UpsertPuzzles implements Action {
  readonly type = PuzzleActionTypes.UpsertPuzzles;

  constructor(public payload: { puzzles: Puzzle[] }) {
  }
}

export class UpdatePuzzle implements Action {
  readonly type = PuzzleActionTypes.UpdatePuzzle;

  constructor(public payload: { puzzle: Update<Puzzle> }) {
  }
}

export class UpdatePuzzles implements Action {
  readonly type = PuzzleActionTypes.UpdatePuzzles;

  constructor(public payload: { puzzles: Update<Puzzle>[] }) {
  }
}

export class DeletePuzzle implements Action {
  readonly type = PuzzleActionTypes.DeletePuzzle;

  constructor(public payload: { id: string }) {
  }
}

export class DeletePuzzles implements Action {
  readonly type = PuzzleActionTypes.DeletePuzzles;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearPuzzles implements Action {
  readonly type = PuzzleActionTypes.ClearPuzzles;
}

export class ActivatePuzzle implements Action {
  readonly type = PuzzleActionTypes.ActivatePuzzle;

  constructor(public payload: { puzzle: string }) {
  }
}

export type PuzzleActions =
  LoadPuzzles
  | AddPuzzle
  | UpsertPuzzle
  | AddPuzzles
  | UpsertPuzzles
  | UpdatePuzzle
  | UpdatePuzzles
  | DeletePuzzle
  | DeletePuzzles
  | ClearPuzzles
  | ActivatePuzzle;
