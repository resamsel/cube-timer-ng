import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ResultsPageComponent} from "./results-page.component";

const resultsRoutes = [
  {path: 'results', component: ResultsPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(resultsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResultsRoutingModule {
}
