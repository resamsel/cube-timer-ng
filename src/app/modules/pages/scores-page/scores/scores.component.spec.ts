import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'ngx-moment';
import { instance, mock } from 'ts-mockito';

import { ScoresComponent } from './scores.component';
import { ScoreService } from '../../../../services/score.service';

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
        {provide: ScoreService, useValue: instance(mock(ScoreService))}
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
