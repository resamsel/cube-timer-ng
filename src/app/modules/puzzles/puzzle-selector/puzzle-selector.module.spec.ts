import { PuzzleSelectorModule } from './puzzle-selector.module';

describe('PuzzleSelectorModule', () => {
  let puzzleSelectorModule: PuzzleSelectorModule;

  beforeEach(() => {
    puzzleSelectorModule = new PuzzleSelectorModule();
  });

  it('should create an instance', () => {
    expect(puzzleSelectorModule).toBeTruthy();
  });
});
