import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "./user.service";

export interface Puzzle {
  id: string,
  name: string;
}

@Injectable({providedIn: 'root'})
export class PuzzleService {
  constructor(
    private database: AngularFirestore,
    private userService: UserService
  ) {
  }

  public puzzles(): Observable<Puzzle[]> {
    return this.database
      .collection<Puzzle>(
        `users/${this.userService.user.uid}/puzzles`,
        ref => ref.orderBy('name', 'asc'))
      .valueChanges();
  }
}
