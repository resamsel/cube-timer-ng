import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    SidebarModule,
    MatSidenavModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule {
}
