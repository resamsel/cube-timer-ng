import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PuzzleSelectorComponent } from './puzzle-selector.component';

@NgModule({
  declarations: [PuzzleSelectorComponent],
  exports: [PuzzleSelectorComponent],
  imports: [
    CommonModule
  ]
})
export class PuzzleSelectorModule {
}
