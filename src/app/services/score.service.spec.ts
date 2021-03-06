import { ScoreService } from './score.service';
import { async, TestBed } from '@angular/core/testing';
import { instance, mock, when } from 'ts-mockito';
import { PuzzleService } from './puzzle.service';
import { of } from 'rxjs';
import { initialPuzzleState } from '../models/puzzle/puzzle.reducer';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../shared/app.state';
import { initialUserState } from '../models/user/user.reducer';

describe('ScoreService', () => {
  let service: ScoreService;
  let userService: UserService;
  let puzzleService: PuzzleService;
  let database: AngularFirestore;
  let store: Store<AppState>;

  beforeEach(async(() => {
    userService = mock(UserService);
    puzzleService = mock(PuzzleService);
    database = mock(AngularFirestore);
    store = mock(Store);

    when(userService.user$()).thenReturn(of(initialUserState));
    when(puzzleService.puzzle$()).thenReturn(of(initialPuzzleState.active));

    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: instance(database)},
        {provide: Store, useValue: instance(store)},
        {provide: UserService, useValue: instance(userService)},
        {provide: PuzzleService, useValue: instance(puzzleService)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
