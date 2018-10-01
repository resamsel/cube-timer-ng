import {Component, OnInit, Type} from '@angular/core';
import {Route} from "@angular/router";
import {Page} from "../../shared/page.interface";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {
  public static page: Page = {
    id: 'not-found',
    name: 'Not Found',
    icon: '',
    route: {
      path: '**',
      component: NotFoundPageComponent
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

}
