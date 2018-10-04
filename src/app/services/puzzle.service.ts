import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, initialState } from '../shared/app.state';

export interface Puzzle {
  id: string;
  name: string;
  lastActive: number;
}

export const SET_PUZZLE = '[Puzzle] Update';

export class PuzzleUpdateAction implements Action {
  readonly type = SET_PUZZLE;

  constructor(public puzzle: string) {
  }
}

export const PUZZLE_LIST = '[Puzzle] List';

export class PuzzleListAction implements Action {
  readonly type = PUZZLE_LIST;

  constructor(public puzzles: Puzzle[]) {
  }
}

export interface PuzzleListState {
  list: Puzzle[];
}

@Injectable({providedIn: 'root'})
export class PuzzleService {
  constructor(
    private database: AngularFirestore,
    private store: Store<AppState>
  ) {
  }

  public static activePuzzle(state: string = initialState.puzzle, action: PuzzleUpdateAction): string {
    switch (action.type) {
      case SET_PUZZLE:
        return action.puzzle;
      default:
        return state;
    }
  }

  public static puzzlesReducer(state: PuzzleListState = initialState.puzzles, action: PuzzleListAction): PuzzleListState {
    switch (action.type) {
      case PUZZLE_LIST:
        return {
          ...state,
          list: action.puzzles
        };
      default:
        return state;
    }
  }

  public setActivePuzzle(puzzle: string) {
    this.store.dispatch(new PuzzleUpdateAction(puzzle));
  }

  public puzzle(): Observable<string> {
    return this.store.pipe(select(state => state.puzzle));
  }

  public puzzles(): Observable<PuzzleListState> {
    return this.store.pipe(select(state => state.puzzles));
  }

  public retrievePuzzles(uid: string): void {
    this.database
      .collection<Puzzle>(
        `users/${uid}/puzzles`,
        ref => ref.orderBy('name', 'asc'))
      .valueChanges()
      .subscribe(puzzles => this.store.dispatch(new PuzzleListAction(puzzles)));
  }

  public delete(uid: string, puzzle: Puzzle): Promise<void> {
    return this.database
      .collection(`users/${uid}/puzzles`)
      .doc(puzzle.name)
      .delete();
  }
}
