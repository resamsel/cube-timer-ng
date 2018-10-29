import { PuzzleService } from '../services/puzzle.service';
import { async, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import { RouterUtils } from './router-utils';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouterUtils', () => {
  let subject: RouterUtils;
  const puzzleService = mock(PuzzleService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: PuzzleService, useValue: instance(puzzleService)}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    subject = TestBed.get(RouterUtils);
  });

  it('should be created', () => {
    expect(subject).toBeTruthy();
  });
});
