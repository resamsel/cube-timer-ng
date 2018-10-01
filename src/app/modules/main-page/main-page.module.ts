import {NgModule} from "@angular/core";
import {NavbarModule} from "../nav/navbar/navbar.module";
import {SidenavModule} from "../nav/sidenav/sidenav.module";
import {MainRoutingModule} from "./main-routing.module";
import {CommonModule} from "@angular/common";
import {MainPageComponent} from "./main-page.component";

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    NavbarModule,
    MainRoutingModule
  ]
})
export class MainPageModule {
}
