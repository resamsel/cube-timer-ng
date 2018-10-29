import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { anything, instance, mock, when } from 'ts-mockito';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';

import { TimerPageComponent } from './timer-page.component';
import { of, Subscription } from 'rxjs';
import { initialPuzzleState } from '../../../models/puzzle/puzzle.reducer';
import { RouterUtils } from '../../../shared/router-utils';

@Component({selector: 'app-sidenav', template: ''})
class SidenavStubComponent {
  @Input() activePage: string;
}

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
}

@Component({selector: 'app-puzzle-selector', template: ''})
class PuzzleSelectorStubComponent {
  @Input() puzzle: Puzzle;
  @Input() puzzles: Puzzle[];
}

@Component({selector: 'app-timer', template: ''})
class TimerStubComponent {
  @Input() puzzle: Puzzle;
}

@Component({selector: 'app-timer-stats', template: ''})
class TimerStatsStubComponent {
}

describe('TimerPageComponent', () => {
  let component: TimerPageComponent;
  let fixture: ComponentFixture<TimerPageComponent>;
  const puzzleService = mock(PuzzleService);
  const routerUtils = mock(RouterUtils);

  when(puzzleService.puzzle$()).thenReturn(of(initialPuzzleState.active));
  when(routerUtils.onPuzzleChange(anything(), anything())).thenReturn(Subscription.EMPTY);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimerPageComponent,
        SidenavStubComponent,
        NavbarStubComponent,
        PuzzleSelectorStubComponent,
        TimerStubComponent,
        TimerStatsStubComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: PuzzleService, useValue: instance(puzzleService)},
        {provide: RouterUtils, useValue: instance(routerUtils)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
