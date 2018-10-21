import { reducer, initialTimerState } from './timer.reducer';

describe('Timer Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialTimerState, action);

      expect(result).toBe(initialTimerState);
    });
  });
});
