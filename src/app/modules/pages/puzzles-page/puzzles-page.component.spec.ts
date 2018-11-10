import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule, MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MomentModule } from 'ngx-moment';
import { instance, mock, when } from 'ts-mockito';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';

import { PuzzlesPageComponent } from './puzzles-page.component';
import { ScoreService } from '../../../services/score.service';
import { of } from 'rxjs';
import { initialPuzzleState, selectAll } from '../../../models/puzzle/puzzle.reducer';

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

@Component({selector: 'app-sidenav', template: ''})
class SidenavStubComponent {
  @Input() activePage: string;
}

describe('PuzzlesPageComponent', () => {
  let component: PuzzlesPageComponent;
  let fixture: ComponentFixture<PuzzlesPageComponent>;

  beforeEach(async(() => {
    const puzzleService = mock(PuzzleService);

    when(puzzleService.puzzles$()).thenReturn(of(selectAll(initialPuzzleState)));

    TestBed.configureTestingModule({
      declarations: [
        PuzzlesPageComponent,
        NavbarStubComponent,
        PuzzleSelectorStubComponent,
        SidenavStubComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MomentModule,
        MatListModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
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
    fixture = TestBed.createComponent(PuzzlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
