import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../shared/app.state';
import { UserService, UserState } from './user.service';
import { Puzzle } from "../models/puzzle/puzzle.model";
import { reducer, selectAll } from "../models/puzzle/puzzle.reducer";
import { ActivatePuzzle, AddPuzzle, DeletePuzzle, LoadPuzzles } from "../models/puzzle/puzzle.actions";

@Injectable({providedIn: 'root'})
export class PuzzleService {
  public static reducer = reducer;

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

  public activatePuzzle(puzzle: string) {
    this.store.dispatch(new ActivatePuzzle({puzzle}));
  }

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
      .subscribe(puzzles => this.store.dispatch(new LoadPuzzles({puzzles})));
  }

  public create(uid: string, puzzle: Puzzle): Promise<void> {
    this.store.dispatch(new AddPuzzle({puzzle}));

    return this.database
      .doc(`users/${uid}/puzzles`)
      .set(puzzle)
      .catch((reason: any) => {
        console.error('Error while creating Firestore puzzle', reason);
        this.store.dispatch(new DeletePuzzle({id: puzzle.name}));
      });
  }

  public delete(uid: string, puzzle: Puzzle): Promise<void> {
    this.store.dispatch(new DeletePuzzle({id: puzzle.name}));

    return this.database
      .collection(`users/${uid}/puzzles`)
      .doc(encodeURI(puzzle.name))
      .delete()
      .catch((reason: any) => {
        console.error('Error while deleting Firestore puzzle', reason);
        this.store.dispatch(new AddPuzzle({puzzle}));
      });
  }
}
