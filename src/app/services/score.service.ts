import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { AppState } from '../shared/app.state';
import { PuzzleService } from './puzzle.service';
import { UserService } from './user.service';

export interface Score {
  uid: string;
  value: number;
  name?: string;
  photo_url?: string;
  puzzle: string;
  timestamp: number;
  when_created?: number;
  when_created_text?: string;
}

export interface ScoreRetrievalOptions {
  limit?: number;
}

export const SCORE_LIST = '[Score] List';

export class ScoreListAction implements Action {
  readonly type = SCORE_LIST;

  constructor(public scores: Score[]) {
  }
}

export const SCORE_ADD = '[Score] Add';

export class ScoreAddAction implements Action {
  readonly type = SCORE_ADD;

  constructor(public score: Score) {
  }
}

export type ScoreActions = ScoreListAction | ScoreAddAction;

export interface ScoreState extends EntityState<Score> {
}

export const adapter: EntityAdapter<Score> = createEntityAdapter<Score>({
  selectId: model => `${model.timestamp}-${model.value}`
});

export const initialScoreState = adapter.getInitialState();

export const {
  selectAll
} = adapter.getSelectors();

@Injectable({providedIn: 'root'})
export class ScoreService {
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

  public static scoreReducer(state: ScoreState = initialScoreState, action: ScoreActions): ScoreState {
    console.log('scoreReducer', state, action);
    switch (action.type) {
      case SCORE_LIST:
        return adapter.addAll(action.scores, state);
      case SCORE_ADD:
        return adapter.addOne(action.score, state);
      default:
        return state;
    }
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
      .subscribe(scores => this.store.dispatch(new ScoreListAction(scores)));
  }

  public delete(score: Score): Promise<void> {
    return this.database
      .collection(`users/${score.uid}/puzzles/${score.puzzle}/scores`)
      .doc(`${score.timestamp}-${score.value}`)
      .delete();
  }
}
