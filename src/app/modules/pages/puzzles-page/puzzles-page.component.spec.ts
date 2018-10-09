import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatCardModule, MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MomentModule } from 'ngx-moment';
import { instance, mock } from 'ts-mockito';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { UserService } from '../../../services/user.service';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';

import { PuzzlesPageComponent } from './puzzles-page.component';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() public sidenav: SidenavComponent;
  @Input() public page: string;
}

@Component({selector: 'app-puzzle-selector', template: ''})
class PuzzleSelectorStubComponent {
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
        MatSnackBarModule
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
    fixture = TestBed.createComponent(PuzzlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
