import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';
import { PuzzleSelectorComponent } from './puzzle-selector.component';
import { PuzzleCreatorDialogModule } from '../puzzle-creator/puzzle-creator-dialog.module';

@NgModule({
  declarations: [PuzzleSelectorComponent],
  exports: [PuzzleSelectorComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    PuzzleCreatorDialogModule
  ]
})
export class PuzzleSelectorModule {
}
