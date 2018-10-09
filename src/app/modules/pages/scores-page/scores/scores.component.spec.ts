import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MomentModule } from 'ngx-moment';
import { instance, mock } from 'ts-mockito';
import { PuzzleService } from '../../../../services/puzzle.service';
import { UserService } from '../../../../services/user.service';

import { ScoresComponent } from './scores.component';

describe('ScoresComponent', () => {
  let component: ScoresComponent;
  let fixture: ComponentFixture<ScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresComponent],
      imports: [
        MatIconModule,
        MomentModule,
        MatListModule,
        MatSnackBarModule,
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
    fixture = TestBed.createComponent(ScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
