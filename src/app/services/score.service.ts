import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action, Store } from '@ngrx/store';
import { AppState, initialState } from '../shared/app.state';
import { UserService } from './user.service';

export interface Score {
  uid: string;
  value: number;
  name: string;
  photo_url: string;
  puzzle: string;
  timestamp: number;
  when_created: number;
  when_created_text: string;
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

export interface ScoreListState {
  list: Score[];
}

@Injectable({providedIn: 'root'})
export class ScoreService {
  constructor(
    private database: AngularFirestore,
    private userService: UserService,
    private store: Store<AppState>
  ) {
  }

  public static scoresReducer(state: ScoreListState = initialState.score, action: ScoreListAction): ScoreListState {
    switch (action.type) {
      case SCORE_LIST:
        return {
          ...state,
          list: action.scores
        };
      default:
        return state;
    }
  }

  public scores(puzzle: string, options: ScoreRetrievalOptions): void {
    this.database
      .collection<Score>(
        `users/${this.userService.user.uid}/puzzles/${puzzle}/scores`,
        ref => ref.orderBy('timestamp', 'desc')
          .limit(options.limit || 0)
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
