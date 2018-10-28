import { PuzzleService } from '../services/puzzle.service';
import { async, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { PuzzleNameValidator } from './puzzle-name.validator';

describe('PuzzleNameValidator', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: PuzzleService, useValue: instance(mock(PuzzleService))}
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    expect(TestBed.get(PuzzleNameValidator)).toBeTruthy();
  });
});
