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
  let scoreService: ScoreService;
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
        {provide: Store, useValue: instance(mock(Store))},
        {provide: UserService, useValue: instance(mock(UserService))},
        {provide: PuzzleService, useValue: instance(puzzleService)},
        {provide: ScoreService, useValue: instance(mock(ScoreService))}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    scoreService = new ScoreService(
      instance(userService),
      instance(puzzleService),
      instance(database),
      instance(store)
    );
  });

  it('should create', () => {
    expect(scoreService).toBeTruthy();
  });
});
