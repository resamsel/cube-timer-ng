import { browser, by, element, ElementFinder, promise } from 'protractor';

export class PuzzlesPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/puzzles');
  }

  get puzzle(): ElementFinder {
    return element(by.css('a.puzzle[href="/puzzles/3x3x3/timer"]'));
  }
}
