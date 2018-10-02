import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NotFoundPageComponent} from "./not-found-page.component";

const mainRoutes = [
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotFoundRoutingModule {
}
