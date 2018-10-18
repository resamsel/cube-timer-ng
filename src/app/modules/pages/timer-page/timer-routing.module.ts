import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TimerPageComponent } from './timer-page.component';
import { AuthGuard } from '../../../guards/auth.guard';

const timerRoutes: Route[] = [
  {path: 'timer', component: TimerPageComponent, canActivate: [AuthGuard]}
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
