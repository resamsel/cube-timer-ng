import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {environment} from "../environments/environment";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";

const appRoutes = [
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: !environment.production}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
