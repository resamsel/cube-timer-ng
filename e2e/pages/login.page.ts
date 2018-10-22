import { browser, by, element, promise } from 'protractor';

export class LoginPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/login');
  }

  login(email: string, password: string): promise.Promise<void> {
    element(by.css('#email')).sendKeys(email);
    element(by.css('#password')).sendKeys(password);
    return element(by.css('button.sign-in')).click();
  }
}
