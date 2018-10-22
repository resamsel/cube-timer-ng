import { LoginPage } from '../pages/login.page';
import { PuzzlesPage } from '../pages/puzzles.page';
import { TimerPage } from '../pages/timer.page';
import { browser } from 'protractor';
import { LogoutPage } from '../pages/logout.page';

describe('Cube Timer | Erika', () => {
  const loginPage = new LoginPage();
  const logoutPage = new LogoutPage();
  const puzzlesPage = new PuzzlesPage();
  const timerPage = new TimerPage('3x3x3');

  describe('should create score', () => {
    beforeEach(() => {
      browser.waitForAngularEnabled(false);
      loginPage.navigateTo()
        .then(() => loginPage.login('erika@resamsel.com', 'erika123'));
    });
    afterEach(() => logoutPage.navigateTo());

    it('should display puzzles', () => {
      // given

      // when
      const actual = puzzlesPage.puzzle;

      // then
      actual.isPresent().then((present: boolean) => expect(present).toBeTruthy());
    });

    it('should create score', () => {
      // given
      timerPage.navigateTo();

      // when
      browser.getCurrentUrl()
        .then((url: string) => expect(url).toEqual('http://localhost:4200/puzzles/3x3x3/timer'));
      timerPage.actionButton.click();
      timerPage.actionButton.click();

      // then
      expect(timerPage.actionButton.getText()).toEqual('Clear');
    });
  });
});
