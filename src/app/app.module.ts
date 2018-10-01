import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {UserService} from './services/user.service';
import {environment} from "../environments/environment";
import {PuzzlesPageModule} from "./modules/puzzles-page/puzzles-page.module";
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {SidenavModule} from "./modules/nav/sidenav/sidenav.module";
import {ScoresPageModule} from "./modules/scores-page/scores-page.module";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {MainPageModule} from "./modules/main-page/main-page.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SidenavModule,
    MainPageModule,
    ScoresPageModule,
    PuzzlesPageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
