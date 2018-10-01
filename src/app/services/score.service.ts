import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

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

@Injectable({providedIn: 'root'})
export class ScoreService {
  constructor(
    private database: AngularFirestore,
    private userService: UserService
  ) {
  }

  public scores(): Observable<Score[]> {
    return this.database
      .collection<Score>(
        `users/${this.userService.user.uid}/puzzles/3x3x3/scores`,
        ref => ref.orderBy('timestamp', 'desc')
      )
      .valueChanges();
  }
}
