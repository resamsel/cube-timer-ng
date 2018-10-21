import { reducer, initialPuzzleState } from './puzzle.reducer';

describe('Puzzle Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialPuzzleState, action);

      expect(result).toBe(initialPuzzleState);
    });
  });
});
