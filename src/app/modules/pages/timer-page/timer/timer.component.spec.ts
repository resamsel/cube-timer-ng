import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDividerModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { initialState } from '../../../../models/timer/timer.reducer';
import { PuzzleService } from '../../../../services/puzzle.service';
import { ScoreService } from '../../../../services/score.service';
import { TimerService } from '../../../../services/timer.service';
import { UserService } from '../../../../services/user.service';

import { TimerComponent } from './timer.component';
import { ConnectFormModule } from '../../../connect-form/connect-form.module';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  const puzzleService = mock(PuzzleService);

  when(puzzleService.puzzle$()).thenReturn(of({name: '3x3x3'}));

  beforeEach(async(() => {
    const timerService = mock(TimerService);

    when(timerService.state$()).thenReturn(of(initialState));

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
        {provide: UserService, useValue: instance(mock(UserService))},
        {provide: PuzzleService, useValue: instance(puzzleService)},
        {provide: ScoreService, useValue: instance(mock(ScoreService))},
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
