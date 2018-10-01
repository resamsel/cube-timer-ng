import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {MatButtonModule, MatIconModule, MatTooltipModule} from "@angular/material";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule {

}
