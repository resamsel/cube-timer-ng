import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './registration-page.component';

const routes = [
  {path: 'register', component: RegistrationPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegistrationRoutingModule {
}
