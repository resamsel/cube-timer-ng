import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PuzzleNameValidator } from '../../../validators/puzzle-name.validator';
import { UserService } from '../../../services/user.service';
import { PuzzleService } from '../../../services/puzzle.service';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-puzzle-creator',
  templateUrl: './puzzle-creator-dialog.component.html',
  styleUrls: ['./puzzle-creator-dialog.component.css']
})
export class PuzzleCreatorDialogComponent {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      asyncValidators: [this.puzzleNameValidator.validate.bind(this.puzzleNameValidator)],
      updateOn: 'blur',
      validators: [Validators.required]
    })
  });

  get name(): AbstractControl | null {
    return this.formGroup.get('name');
  }

  static openDialog(dialog: MatDialog, userService: UserService, puzzleService: PuzzleService) {
    const dialogRef = dialog.open(PuzzleCreatorDialogComponent, {
      width: '250px',
      data: {}
    });

    combineLatest(
      dialogRef.afterClosed(),
      userService.user$())
      .pipe(take(1))
      .subscribe(([puzzle, state]) => {
        if (state.user && puzzle !== undefined) {
          puzzleService.create(state.user.uid, {name: puzzle})
            .then(() => puzzleService.activatePuzzle(puzzle));
        }
      });
  }

  constructor(
    public dialogRef: MatDialogRef<PuzzleCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Puzzle>,
    private readonly puzzleNameValidator: PuzzleNameValidator) {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
