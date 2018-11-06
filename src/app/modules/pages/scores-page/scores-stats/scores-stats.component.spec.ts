import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';

import { ScoresStatsComponent } from './scores-stats.component';

@Component({selector: 'ngx-charts-bar-vertical', template: ''})
class MockNgxChartsBarVerticalComponent {
  @Input() results: any;
  @Input() animations: boolean;
  @Input() scheme: any;
  @Input() roundEdges: boolean;
}

describe('ScoresStatsComponent', () => {
  let component: ScoresStatsComponent;
  let fixture: ComponentFixture<ScoresStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoresStatsComponent, MockNgxChartsBarVerticalComponent],
      imports: [MatCardModule],
      providers: [
        {provide: DatePipe, useValue: {transform: () => ''}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresStatsComponent);
    component = fixture.componentInstance;
    component.scores = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
