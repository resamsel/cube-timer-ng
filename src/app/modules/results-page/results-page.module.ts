import {NgModule} from "@angular/core";
import {NavbarModule} from "../nav/navbar/navbar.module";
import {SidenavModule} from "../nav/sidenav/sidenav.module";
import {ResultsRoutingModule} from "./results-routing.module";
import {MatCardModule, MatIconModule, MatListModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {ResultsComponent} from "./results/results.component";
import {ResultsPageComponent} from "./results-page.component";
import {ResultsStatsComponent} from "./results-stats/results-stats.component";

@NgModule({
  declarations: [
    ResultsPageComponent,
    ResultsComponent,
    ResultsStatsComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    NavbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    ResultsRoutingModule
  ]
})
export class ResultsPageModule {
}
