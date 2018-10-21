import { initialTimerState, reducer } from './timer.reducer';

describe('Timer Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;

    const result = reducer(initialTimerState, action);

    expect(result).toBe(initialTimerState);
  });
});
