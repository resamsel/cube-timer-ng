import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { PuzzleService } from './puzzle.service';
import { UserService } from './user.service';
import { Score } from "../models/score/score.model";
import { reducer, selectAll, selectTotal } from 'app/models/score/score.reducer';
import { AddScore, DeleteScore, LoadScores } from "../models/score/score.actions";
import { AppState } from "../shared/app.state";

export interface ScoreRetrievalOptions {
  limit?: number;
}

@Injectable({providedIn: 'root'})
export class ScoreService {
  public static reducer = reducer;

  constructor(
    private readonly userService: UserService,
    private readonly puzzleService: PuzzleService,
    private readonly database: AngularFirestore,
    private readonly store: Store<AppState>
  ) {
    combineLatest(userService.user$(), puzzleService.puzzle$())
      .subscribe(([state, puzzle]) => {
        if (state.user !== null) {
          this.retrieveScores(state.user.uid, puzzle);
        }
      });
  }

  public scores$(): Observable<Score[]> {
    return this.store.pipe(select(state => selectAll(state.scores)));
  }

  private retrieveScores(uid: string, puzzle: string, options: ScoreRetrievalOptions = {}): void {
    this.database
      .collection<Score>(
        `users/${uid}/puzzles/${puzzle}/scores`,
        ref => {
          if (options.limit > 0) {
            return ref.orderBy('timestamp', 'desc')
              .limit(options.limit);
          }
          return ref.orderBy('timestamp', 'desc');
        }
      )
      .valueChanges()
      .subscribe(scores => this.store.dispatch(new LoadScores({scores})));
  }

  public delete(score: Score): Promise<void> {
    const id = `${score.timestamp}-${score.value}`;

    this.store.dispatch(new DeleteScore({id}))

    return this.database
      .collection(`users/${score.uid}/puzzles/${score.puzzle}/scores`)
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
      .doc(`users/${score.uid}/puzzles/${score.puzzle}/scores/${score.timestamp}-${score.value}`)
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
