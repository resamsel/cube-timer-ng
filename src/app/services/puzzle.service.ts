import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../shared/app.state';
import { UserService, UserState } from './user.service';

export interface Puzzle {
  id: string;
  name: string;
  lastActive: number;
}

export const PUZZLE_ACTIVATE = '[Puzzle] Update';
export class PuzzleActivateAction implements Action {
  readonly type = PUZZLE_ACTIVATE;

  constructor(public puzzle: string) {
  }
}

export const PUZZLE_LIST = '[Puzzle] List';
export class PuzzleListAction implements Action {
  readonly type = PUZZLE_LIST;

  constructor(public puzzles: Puzzle[]) {
  }
}

export const PUZZLE_DELETE = '[Puzzle] Delete';
export class PuzzleDeleteAction implements Action {
  readonly type = PUZZLE_DELETE;

  constructor(public name: string) {
  }
}

export interface PuzzleState extends EntityState<Puzzle> {
  active: string;
}

const adapter = createEntityAdapter<Puzzle>({
  selectId: model => model.name
});

export const initialPuzzleState: PuzzleState = adapter.getInitialState({
  active: '3x3x3'
});

export type PuzzleActions = PuzzleListAction | PuzzleDeleteAction | PuzzleActivateAction;

export const {
  selectAll
} = adapter.getSelectors();

@Injectable({providedIn: 'root'})
export class PuzzleService {
  constructor(
    private readonly userService: UserService,
    private database: AngularFirestore,
    private store: Store<AppState>
  ) {
    userService.user$().subscribe((state: UserState) => {
      if (state.user !== null) {
        this.retrievePuzzles(state.user.uid);
      }
    });
  }

  public static puzzleReducer(state: PuzzleState = initialPuzzleState, action: PuzzleActions): PuzzleState {
    console.log('puzzleReducer', state, action);
    switch (action.type) {
      case PUZZLE_LIST:
        return adapter.addAll(action.puzzles, state);
      case PUZZLE_DELETE:
        return adapter.removeOne(action.name, state);
      case PUZZLE_ACTIVATE:
        return {
          ...state,
          active: action.puzzle
        };
      default:
        return state;
    }
  }

  // public setActivePuzzle(puzzle: string) {
  //   this.store.dispatch(new PuzzleActivateAction(puzzle));
  // }

  public puzzle$(): Observable<string> {
    return this.store.pipe(select(state => state.puzzles.active));
  }

  public puzzles$(): Observable<Puzzle[]> {
    return this.store.pipe(select(state => selectAll(state.puzzles)));
  }

  private retrievePuzzles(uid: string): void {
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
      .doc(encodeURI(puzzle.name))
      .delete()
      .then(() => this.store.dispatch(new PuzzleDeleteAction(puzzle.name)));
  }
}
