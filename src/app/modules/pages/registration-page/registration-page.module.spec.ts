import { RegistrationPageModule } from './registration-page.module';

describe('RegistrationPageModule', () => {
  let registrationPageModule: RegistrationPageModule;

  beforeEach(() => {
    registrationPageModule = new RegistrationPageModule();
  });

  it('should create an instance', () => {
    expect(registrationPageModule).toBeTruthy();
  });
});
