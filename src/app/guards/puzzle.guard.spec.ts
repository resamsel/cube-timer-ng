import { inject, TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

import { PuzzleGuard } from './puzzle.guard';
import { PuzzleService } from '../services/puzzle.service';
import { anything, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { initialPuzzleState } from '../models/puzzle/puzzle.reducer';
import { RouterTestingModule } from '@angular/router/testing';

describe('PuzzleGuard', () => {
  beforeEach(() => {
    const puzzleService = mock(PuzzleService);
    const authGuard = mock(AuthGuard);

    when(puzzleService.from(anything())).thenReturn(of(initialPuzzleState.active));
    when(puzzleService.puzzle$()).thenReturn(of(initialPuzzleState.active));
    when(authGuard.canActivate(anything(), anything())).thenReturn(of(false));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        PuzzleGuard,
        {provide: AuthGuard, useValue: instance(authGuard)},
        {provide: PuzzleService, useValue: instance(puzzleService)}
      ]
    });
  });

  it('should ...', inject([PuzzleGuard], (guard: PuzzleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
