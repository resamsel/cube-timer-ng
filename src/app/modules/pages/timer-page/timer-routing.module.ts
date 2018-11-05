import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { TimerPageComponent } from './timer-page.component';
import { PuzzleGuard } from '../../../guards/puzzle.guard';

const timerRoutes: Route[] = [
  {
    path: 'puzzles/:puzzle/timer',
    component: TimerPageComponent,
    canActivate: [PuzzleGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(timerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TimerRoutingModule {
}
