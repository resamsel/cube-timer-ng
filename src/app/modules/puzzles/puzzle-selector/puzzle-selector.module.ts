import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { PuzzleSelectorComponent } from './puzzle-selector.component';

@NgModule({
  declarations: [PuzzleSelectorComponent],
  exports: [PuzzleSelectorComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PuzzleSelectorModule {
}
