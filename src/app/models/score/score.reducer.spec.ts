import { reducer, initialScoreState } from './score.reducer';

describe('Score Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialScoreState, action);

      expect(result).toBe(initialScoreState);
    });
  });
});
