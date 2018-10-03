import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NotFoundRoutingModule} from './not-found-routing.module';
import {NotFoundPageComponent} from './not-found-page.component';
import {MatButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundPageModule {
}
