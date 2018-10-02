import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ScoresPageComponent} from './scores-page.component';

const scoresRoutes = [
  {path: 'scores', component: ScoresPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(scoresRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ScoresRoutingModule {
}
