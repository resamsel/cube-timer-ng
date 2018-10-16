import { ConnectFormModule } from './connect-form.module';

describe('ConnectFormModule', () => {
  let connectFormModule: ConnectFormModule;

  beforeEach(() => {
    connectFormModule = new ConnectFormModule();
  });

  it('should create an instance', () => {
    expect(connectFormModule).toBeTruthy();
  });
});
