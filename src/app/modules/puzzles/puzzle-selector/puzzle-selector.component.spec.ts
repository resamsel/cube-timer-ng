import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';
import { instance, mock } from 'ts-mockito';
import { PuzzleService } from '../../../services/puzzle.service';

import { PuzzleSelectorComponent } from './puzzle-selector.component';
import { PuzzleCreatorDialogModule } from '../puzzle-creator/puzzle-creator-dialog.module';
import { UserService } from '../../../services/user.service';
import { TimerService } from '../../../services/timer.service';

describe('PuzzleSelectorComponent', () => {
  let component: PuzzleSelectorComponent;
  let fixture: ComponentFixture<PuzzleSelectorComponent>;
  const puzzleService = mock(PuzzleService);
  const userService = mock(UserService);
  const timerService = mock(TimerService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleSelectorComponent ],
      imports: [
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatDialogModule,
        PuzzleCreatorDialogModule
      ],
      providers: [
        {provide: PuzzleService, useValue: instance(puzzleService)},
        {provide: UserService, useValue: instance(userService)},
        {provide: TimerService, useValue: instance(timerService)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
