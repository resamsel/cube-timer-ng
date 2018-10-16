import { browser, promise } from 'protractor';

export class MainPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  getPageTitle(): promise.Promise<string> {
    return browser.getTitle();
  }
}
