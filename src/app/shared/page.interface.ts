import {Route} from "@angular/router";

export interface Page {
  id: string;
  name: string;
  icon: string;
  route: Route;
}
