import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsStatsComponent } from './results-stats.component';

describe('ResultsStatsComponent', () => {
  let component: ResultsStatsComponent;
  let fixture: ComponentFixture<ResultsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
