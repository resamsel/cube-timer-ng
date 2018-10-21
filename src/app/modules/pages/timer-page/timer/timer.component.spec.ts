import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { initialTimerState } from '../../../../models/timer/timer.reducer';
import { PuzzleService } from '../../../../services/puzzle.service';
import { ScoreService } from '../../../../services/score.service';
import { TimerService } from '../../../../services/timer.service';
import { UserService } from '../../../../services/user.service';

import { TimerComponent } from './timer.component';
import { ConnectFormModule } from '../../../connect-form/connect-form.module';
import { initialUserState } from '../../../../models/user/user.reducer';
import { initialPuzzleState } from '../../../../models/puzzle/puzzle.reducer';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    const userService = mock(UserService);
    const puzzleService = mock(PuzzleService);
    const timerService = mock(TimerService);
    const scoreService = mock(ScoreService);

    when(userService.user$()).thenReturn(of(initialUserState));
    when(puzzleService.puzzle$()).thenReturn(of(initialPuzzleState.active));
    when(timerService.timer$()).thenReturn(of(initialTimerState));

    TestBed.configureTestingModule({
      declarations: [TimerComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDividerModule,
        MatInputModule,
        MatSnackBarModule,
        ConnectFormModule
      ],
      providers: [
        {provide: UserService, useValue: instance(userService)},
        {provide: PuzzleService, useValue: instance(puzzleService)},
        {provide: ScoreService, useValue: instance(scoreService)},
        {provide: TimerService, useValue: instance(timerService)},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
