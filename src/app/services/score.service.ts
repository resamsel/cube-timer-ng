import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

@Injectable({providedIn: 'root'})
export class ScoreService {
  constructor(
    private database: AngularFirestore,
    private userService: UserService
  ) {
  }

  public scores(options: ScoreRetrievalOptions): Observable<Score[]> {
    return this.database
      .collection<Score>(
        `users/${this.userService.user.uid}/puzzles/3x3x3/scores`,
        ref => ref.orderBy('timestamp', 'desc')
          .limit(options.limit || 0)
      )
      .valueChanges();
  }

  delete(score: Score): Promise<void> {
    return this.database
      .collection(`users/${this.userService.user.uid}/puzzles/3x3x3/scores`)
      .doc(`${score.timestamp}-${score.value}`)
      .delete();
  }
}
