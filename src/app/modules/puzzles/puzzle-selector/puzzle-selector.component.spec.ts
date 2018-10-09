import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatMenuModule } from '@angular/material';
import { instance, mock } from 'ts-mockito';
import { PuzzleService } from '../../../services/puzzle.service';

import { PuzzleSelectorComponent } from './puzzle-selector.component';

describe('PuzzleSelectorComponent', () => {
  let component: PuzzleSelectorComponent;
  let fixture: ComponentFixture<PuzzleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleSelectorComponent ],
      imports: [
        MatMenuModule,
        MatIconModule
      ],
      providers: [
        {provide: PuzzleService, useValue: instance(mock(PuzzleService))}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
