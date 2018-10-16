import { MainPage } from './pages/main.page';

describe('Cube Timer App', () => {
  const page = new MainPage();

  describe('should display welcome message', () => {
    beforeAll(() => page.navigateTo());

    it('should display welcome message', () => {
      // when
      const actual = page.getPageTitle();

      // then
      actual.then((title: string) => expect(title).toEqual('Cube Timer'));
    });
  });
});
