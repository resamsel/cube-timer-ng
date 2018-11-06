import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { ScoresStatsComponent } from './scores-stats.component';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[chart]'})
class MockChartDirective {
  @Input() chart: any;
}

describe('ScoresStatsComponent', () => {
  let component: ScoresStatsComponent;
  let fixture: ComponentFixture<ScoresStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresStatsComponent, MockChartDirective],
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
