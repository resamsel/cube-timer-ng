import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatePuzzle, AddPuzzle, DeletePuzzle, LoadPuzzles, StartLoading, StopLoading } from '../models/puzzle/puzzle.actions';
import { Puzzle } from '../models/puzzle/puzzle.model';
import { reducer, selectAll } from '../models/puzzle/puzzle.reducer';
import { AppState } from '../shared/app.state';
import { UserService } from './user.service';
import { UserState } from '../models/user/user.reducer';
import { decode, encode } from 'firebase-key';

@Injectable({providedIn: 'root'})
export class PuzzleService {
  public static reducer = reducer;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly userService: UserService,
    private database: AngularFirestore,
    private store: Store<AppState>
  ) {
    userService.user$()
      .subscribe((state: UserState) => {
        if (state.user) {
          this._subscription.unsubscribe();
          this.loadPuzzles(state.user.uid);
        }
      });
  }

  get loaded$(): Observable<boolean> {
    return this.store.pipe(select(state => state.puzzles.loaded));
  }

  get loading$(): Observable<boolean> {
    return this.store.pipe(select(state => state.puzzles.loading));
  }

  public activatePuzzle(puzzle: string) {
    this.store.dispatch(new ActivatePuzzle({puzzle: {name: puzzle}}));
  }

  public puzzle$(): Observable<Puzzle | undefined> {
    return this.store.pipe(select(state => state.puzzles.active));
  }

  public puzzles$(): Observable<Puzzle[]> {
    return this.store.pipe(select(state => selectAll(state.puzzles)));
  }

  public loadPuzzles(uid: string): void {
    this.store.dispatch(new StartLoading());

    this._subscription = this.database
      .collection<Puzzle>(
        `users/${uid}/puzzles`,
        ref => ref.orderBy('name', 'asc'))
      .valueChanges()
      .subscribe(puzzles => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new LoadPuzzles({puzzles}));
      });
  }

  public create(uid: string, puzzle: Puzzle): Promise<void> {
    this.store.dispatch(new AddPuzzle({puzzle}));

    return this.database
      .doc(`users/${uid}/puzzles/${encode(puzzle.name)}`)
      .set(puzzle)
      .catch((reason: any) => {
        console.error('Error while creating Firestore puzzle', reason);
        this.store.dispatch(new DeletePuzzle({id: puzzle.name}));
      });
  }

  public delete(uid: string, puzzle: Puzzle): Promise<void> {
    this.store.dispatch(new DeletePuzzle({id: puzzle.name}));

    return this.database
      .doc(`users/${uid}/puzzles/${encode(puzzle.name)}`)
      .delete()
      .catch((reason: any) => {
        console.error('Error while deleting Firestore puzzle', reason);
        this.store.dispatch(new AddPuzzle({puzzle}));
      });
  }

  get(puzzle: string): Observable<Puzzle | undefined> {
    return this.store.pipe(
      take(1),
      select(state => state.puzzles.entities[puzzle])
    );
  }

  from(params: ParamMap): Observable<Puzzle | undefined> {
    const puzzle = params.get('puzzle');
    if (puzzle !== null) {
      return this.get(decode(puzzle));
    }
    return Observable.create();
  }
}
