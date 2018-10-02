import {Component} from '@angular/core';
import {BUILD_INFO} from '../../../../environments/build-info';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public buildInfo = BUILD_INFO;
}
