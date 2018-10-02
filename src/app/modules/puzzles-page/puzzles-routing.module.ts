import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PuzzlesPageComponent } from './puzzles-page.component';

const puzzlesRoutes = [
  {path: 'puzzles', component: PuzzlesPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(puzzlesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PuzzlesRoutingModule {
}
