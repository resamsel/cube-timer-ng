import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PuzzleSelectorComponent } from './puzzle-selector.component';
import { MatButtonModule, MatIconModule, MatMenuModule } from "@angular/material";

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
