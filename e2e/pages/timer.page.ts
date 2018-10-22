import { browser, by, element, ElementFinder, promise } from 'protractor';

export class TimerPage {
  constructor(private _puzzle: string) {
  }

  navigateTo(): promise.Promise<any> {
    return browser.get(`/puzzles/${this._puzzle}/timer`);
  }

  get actionButton(): ElementFinder {
    return element(by.css('button.mat-primary'));
  }
}
