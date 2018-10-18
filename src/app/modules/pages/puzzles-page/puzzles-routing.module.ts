import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PuzzlesPageComponent } from './puzzles-page.component';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Route[] = [
  {path: 'puzzles', component: PuzzlesPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PuzzlesRoutingModule {
}
