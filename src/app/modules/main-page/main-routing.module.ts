import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainPageComponent} from "./main-page.component";

const mainRoutes = [
  {path: '', component: MainPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
