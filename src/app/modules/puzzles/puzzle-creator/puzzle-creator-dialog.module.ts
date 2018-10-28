import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleCreatorDialogComponent } from './puzzle-creator-dialog.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  declarations: [PuzzleCreatorDialogComponent],
  entryComponents: [PuzzleCreatorDialogComponent]
})
export class PuzzleCreatorDialogModule {
}
