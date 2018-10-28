import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PuzzleService } from '../services/puzzle.service';
import { first, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PuzzleNameValidator implements AsyncValidator {
  constructor(private readonly puzzleService: PuzzleService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.puzzleService.get(control.value)
      .pipe(
        first(),
        map(puzzle => {
          console.log('validate', control.value, puzzle);
          return (puzzle !== undefined ? {nameExists: true} : null);
        })
      );
  }
}
