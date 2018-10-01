import {NgModule} from "@angular/core";
import {SidenavComponent} from "./sidenav.component";
import {MatSidenavModule} from "@angular/material";
import {SidebarModule} from "../sidebar/sidebar.module";

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
