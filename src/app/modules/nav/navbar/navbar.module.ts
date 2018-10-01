import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";
import {AuthModule} from "../../auth/auth.module";
import {SidenavModule} from "../sidenav/sidenav.module";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AuthModule,
    SidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
