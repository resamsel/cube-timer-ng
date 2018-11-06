import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { reducer, selectAll, selectTotal } from '../models/score/score.reducer';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AddScore, DeleteScore, LoadScores, StartLoading, StopLoading } from '../models/score/score.actions';
import { Score } from '../models/score/score.model';
import { AppState } from '../shared/app.state';
import { PuzzleService } from './puzzle.service';
import { UserService } from './user.service';
import { encode } from 'firebase-key';

export interface ScoreRetrievalOptions {
  limit?: number;
}

@Injectable({providedIn: 'root'})
export class ScoreService {
  public static reducer = reducer;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    readonly userService: UserService,
    readonly puzzleService: PuzzleService,
    private readonly database: AngularFirestore,
    private readonly store: Store<AppState>
  ) {
    combineLatest(userService.user$(), puzzleService.puzzle$())
      .subscribe(([state, puzzle]) => {
        if (state.user && puzzle !== undefined) {
          this._subscription.unsubscribe();
          this.loadScores(state.user.uid, puzzle.name);
        }
      });
  }

  public scores$(): Observable<Score[]> {
    return this.store.pipe(select(state => selectAll(state.scores)));
  }

  public loading$(): Observable<boolean> {
    return this.store.pipe(select(state => state.scores.loading));
  }

  private loadScores(uid: string, puzzle: string, options: ScoreRetrievalOptions = {}): void {
    this.store.dispatch(new StartLoading());

    this._subscription = this.database
      .collection<Score>(
        `users/${uid}/puzzles/${encode(puzzle)}/scores`,
        ref => {
          if (options.limit !== undefined && options.limit > 0) {
            return ref.orderBy('timestamp', 'desc')
              .limit(options.limit);
          }
          return ref.orderBy('timestamp', 'desc');
        }
      )
      .valueChanges()
      .subscribe(scores => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new LoadScores({scores}));
      });
  }

  public delete(score: Score): Promise<void> {
    const id = `${score.timestamp}-${score.value}`;

    this.store.dispatch(new DeleteScore({id}));

    return this.database
      .collection(`users/${score.uid}/puzzles/${encode(score.puzzle)}/scores`)
      .doc(id)
      .delete()
      .catch((reason: any) => {
        console.error('Error while deleting Firestore score', reason);
        this.store.dispatch(new AddScore({score}));
      });
  }

  public create(score: Score): Promise<void> {
    this.store.dispatch(new AddScore({score}));

    return this.database
      .doc(`users/${score.uid}/puzzles/${encode(score.puzzle)}/scores/${score.timestamp}-${score.value}`)
      .set(score)
      .catch((reason: any) => {
        console.error('Error while creating Firestore score', reason);
        this.store.dispatch(new DeleteScore({id: `${score.timestamp}-${score.value}`}));
      });
  }

  count$(): Observable<number> {
    return this.store.pipe(select(state => selectTotal(state.scores)));
  }
}
