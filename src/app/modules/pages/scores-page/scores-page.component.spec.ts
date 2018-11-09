import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { anything, instance, mock, when } from 'ts-mockito';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { Score } from '../../../models/score/score.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';

import { ScoresPageComponent } from './scores-page.component';
import { ScoreService } from '../../../services/score.service';
import { initialScoreState } from '../../../models/score/score.reducer';
import { of, Subscription } from 'rxjs';
import { RouterUtils } from '../../../shared/router-utils';

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

@Component({selector: 'app-scores', template: ''})
class ScoresStubComponent {
  @Input() scores: Score[];
}

@Component({selector: 'app-sidenav', template: ''})
class SidenavStubComponent {
  @Input() activePage: string;
}

describe('ScoresPageComponent', () => {
  let component: ScoresPageComponent;
  let fixture: ComponentFixture<ScoresPageComponent>;

  beforeEach(async(() => {
    const scoreService = mock(ScoreService);
    const routerUtils = mock(RouterUtils);

    when(scoreService.loading$()).thenReturn(of(initialScoreState.loading));
    when(routerUtils.onPuzzleChange(anything(), anything())).thenReturn(Subscription.EMPTY);

    TestBed.configureTestingModule({
      declarations: [
        ScoresPageComponent,
        NavbarStubComponent,
        PuzzleSelectorStubComponent,
        ScoresStubComponent,
        SidenavStubComponent
      ],
      imports: [
        RouterTestingModule,
        MatProgressSpinnerModule,
        MatCardModule
      ],
      providers: [
        {provide: Store, useValue: instance(mock(Store))},
        {provide: ScoreService, useValue: instance(scoreService)},
        {provide: UserService, useValue: instance(mock(UserService))},
        {provide: PuzzleService, useValue: instance(mock(PuzzleService))},
        {provide: RouterUtils, useValue: instance(routerUtils)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
