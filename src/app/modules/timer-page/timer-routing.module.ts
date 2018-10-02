import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimerPageComponent } from './timer-page.component';

const timerRoutes = [
  {path: 'timer', component: TimerPageComponent}
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
