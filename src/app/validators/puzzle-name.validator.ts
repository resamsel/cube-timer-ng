import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PuzzleService } from '../services/puzzle.service';

@Injectable({providedIn: 'root'})
export class PuzzleNameValidator implements AsyncValidator {
  constructor(private readonly puzzleService: PuzzleService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.puzzleService.get(control.value)
      .pipe(
        take(1),
        map(puzzle => {
          console.log('validate', control.value, puzzle);
          return (puzzle !== undefined ? {nameExists: true} : null);
        })
      );
  }
}
