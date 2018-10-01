import {NgModule} from "@angular/core";
import {PuzzlesPageComponent} from "./puzzles-page.component";
import {NavbarModule} from "../nav/navbar/navbar.module";
import {SidenavModule} from "../nav/sidenav/sidenav.module";
import {PuzzlesRoutingModule} from "./puzzles-routing.module";
import {MatCardModule, MatListModule} from "@angular/material";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PuzzlesPageComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    NavbarModule,
    MatCardModule,
    MatListModule,
    PuzzlesRoutingModule
  ]
})
export class PuzzlesPageModule {
}
