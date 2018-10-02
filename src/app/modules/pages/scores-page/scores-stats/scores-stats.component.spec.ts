import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresStatsComponent } from './scores-stats.component';

describe('ScoresStatsComponent', () => {
  let component: ScoresStatsComponent;
  let fixture: ComponentFixture<ScoresStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresStatsComponent ]
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
