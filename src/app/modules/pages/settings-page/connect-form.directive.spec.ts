import { FormGroupDirective } from '@angular/forms';
import { ConnectFormDirective } from './connect-form.directive';

describe('ConnectFormDirective', () => {
  it('should create an instance', () => {
    const directive = new ConnectFormDirective(new FormGroupDirective([], []));
    expect(directive).toBeTruthy();
  });
});
