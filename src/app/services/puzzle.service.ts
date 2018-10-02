import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

export interface Puzzle {
  id: string;
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

  public delete(puzzle: Puzzle): Promise<void> {
    return this.database
      .collection(`users/${this.userService.user.uid}/puzzles`)
      .doc(puzzle.name)
      .delete();
  }
}
