import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'ngx-moment';
import { instance, mock } from 'ts-mockito';
import { Score } from '../../../../models/score/score.model';

import { ScoresComponent } from './scores.component';
import { ScoreService } from '../../../../services/score.service';

@Component({selector: 'app-scores-stats', template: ''})
class ScoresStatsStubComponent {
  @Input() scores: Score[];
}

describe('ScoresComponent', () => {
  let component: ScoresComponent;
  let fixture: ComponentFixture<ScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScoresComponent,
        ScoresStatsStubComponent
      ],
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
