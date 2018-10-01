import {PuzzlesPageComponent} from "./puzzles-page.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

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
