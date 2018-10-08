import { Category } from './category';

describe('Category', () => {
  it('should return first category', () => {
    // given
    const durationInMillis = 0;

    // when
    const category = Category.fromDuration(durationInMillis);

    // then
    expect(category).toEqual(1);
  });

  it('should return second category', () => {
    // given
    const durationInMillis = 2000;

    // when
    const category = Category.fromDuration(durationInMillis);

    // then
    expect(category).toEqual(3);
  });

  it('should return last category', () => {
    // given
    const durationInMillis = 3599000;

    // when
    const category = Category.fromDuration(durationInMillis);

    // then
    expect(category).toEqual(3600);
  });

  it('should return no category', () => {
    // given
    const durationInMillis = 3600000;

    // when
    const category = Category.fromDuration(durationInMillis);

    // then
    expect(category).toBeUndefined();
  });
});
