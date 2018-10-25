import { async, TestBed } from '@angular/core/testing';
import { anything, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/app.state';
import { TimerService } from './timer.service';
import { ScoreService } from './score.service';
import { initialTimerState } from '../models/timer/timer.reducer';

describe('TimerService', () => {
  let service: TimerService;
  let scoreService: ScoreService;
  let store: Store<AppState>;

  beforeEach(async(() => {
    scoreService = mock(ScoreService);
    store = mock(Store);

    when(store.pipe(anything(), anything())).thenReturn(of(initialTimerState));

    TestBed.configureTestingModule({
      providers: [
        {provide: ScoreService, useValue: instance(scoreService)},
        {provide: Store, useValue: instance(store)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
