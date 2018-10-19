import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { ScoresPageComponent } from './scores-page.component';

const routes = [
  {
    path: 'puzzles/:puzzle/scores',
    component: ScoresPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ScoresRoutingModule {
}
