import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, Store } from '@ngrx/store';
import { AppState, initialState } from '../shared/app.state';
import { UserService } from './user.service';

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
    private userService: UserService,
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

  public puzzles(): void {
    this.database
      .collection<Puzzle>(
        `users/${this.userService.user.uid}/puzzles`,
        ref => ref.orderBy('name', 'asc'))
      .valueChanges()
      .subscribe(puzzles => this.store.dispatch(new PuzzleListAction(puzzles)));
  }

  public delete(puzzle: Puzzle): Promise<void> {
    return this.database
      .collection(`users/${this.userService.user.uid}/puzzles`)
      .doc(puzzle.name)
      .delete();
  }
}
