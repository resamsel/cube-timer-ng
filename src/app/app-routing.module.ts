import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {environment} from '../environments/environment';

const appRoutes = [];

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
