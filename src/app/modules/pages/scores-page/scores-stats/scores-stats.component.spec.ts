import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { ScoresStatsComponent } from './scores-stats.component';

describe('ScoresStatsComponent', () => {
  let component: ScoresStatsComponent;
  let fixture: ComponentFixture<ScoresStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresStatsComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
