import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { instance, mock } from 'ts-mockito';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { Score } from '../../../models/score/score.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';

import { ScoresPageComponent } from './scores-page.component';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
}

@Component({selector: 'app-puzzle-selector', template: ''})
class PuzzleSelectorStubComponent {
  @Input() puzzles: Puzzle[];
}

@Component({selector: 'app-scores-stats', template: ''})
class ScoresStatsStubComponent {
  @Input() scores: Score[];
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
    TestBed.configureTestingModule({
      declarations: [
        ScoresPageComponent,
        NavbarStubComponent,
        PuzzleSelectorStubComponent,
        ScoresStatsStubComponent,
        ScoresStubComponent,
        SidenavStubComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: instance(mock(AngularFirestore))},
        {provide: Store, useValue: instance(mock(Store))},
        {provide: UserService, useValue: instance(mock(UserService))},
        {provide: PuzzleService, useValue: instance(mock(PuzzleService))}
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
