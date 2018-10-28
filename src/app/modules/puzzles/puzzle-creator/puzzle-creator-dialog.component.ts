import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PuzzleNameValidator } from '../../../validators/puzzle-name.validator';

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

  constructor(
    public dialogRef: MatDialogRef<PuzzleCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Puzzle>,
    private readonly puzzleNameValidator: PuzzleNameValidator) {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
