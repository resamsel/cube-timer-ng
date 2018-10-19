import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { TimerPageComponent } from './timer-page.component';

const timerRoutes: Route[] = [
  {
    path: 'puzzles/:puzzle/timer',
    component: TimerPageComponent,
    canActivate: [AuthGuard]
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
