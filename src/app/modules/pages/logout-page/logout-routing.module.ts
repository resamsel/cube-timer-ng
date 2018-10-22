import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LogoutPageComponent } from './logout-page.component';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Route[] = [
  {path: 'logout', component: LogoutPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LogoutRoutingModule {
}
