import {
  minusDays,
  minusMonths,
  minusWeeks,
  plusDays,
  plusMonths,
  plusWeeks,
  startOfDay,
  startOfMonth,
  startOfWeek
} from './date-time-utils';

const DAYS_IN_JAN_TO_OCT = (31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31);
const DAYS_IN_MAR_TO_DEC = (31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31);

describe('Date time utils', () => {
  describe('startOfDay', () => {
    it('should use same day and 00:00:00 as start of day', () => {
      // given
      const date = new Date();

      // when
      const actual = startOfDay(date);

      // then
      expect(actual.getFullYear()).toEqual(date.getFullYear());
      expect(actual.getMonth()).toEqual(date.getMonth());
      expect(actual.getDate()).toEqual(date.getDate());
      expect(actual.getHours()).toEqual(0);
      expect(actual.getMinutes()).toEqual(0);
      expect(actual.getSeconds()).toEqual(0);
      expect(actual.getMilliseconds()).toEqual(0);
    });
  });

  describe('startOfWeek', () => {
    it('should use monday as start of week', () => {
      // given
      const date = new Date();

      // when
      const actual = startOfWeek(date);

      // then
      expect(actual.getDay()).toEqual(1);
    });
  });

  describe('startOfMonth', () => {
    it('should use first day of month and 00:00:00 as start of month', () => {
      // given
      const date = new Date();

      // when
      const actual = startOfMonth(date);

      // then
      expect(actual.getFullYear()).toEqual(date.getFullYear());
      expect(actual.getMonth()).toEqual(date.getMonth());
      expect(actual.getDate()).toEqual(1);
      expect(actual.getHours()).toEqual(0);
      expect(actual.getMinutes()).toEqual(0);
      expect(actual.getSeconds()).toEqual(0);
      expect(actual.getMilliseconds()).toEqual(0);
    });
  });

  describe('plusDays', () => {
    it('should do nothing', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusDays(date, 0);

      // then
      expect(actual.getTime()).toEqual(0);
    });

    it('should add a single day', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusDays(date, 1);

      // then
      expect(actual.getTime()).toEqual(24 * 60 * 60 * 1000);
    });

    it('should subtract a single day', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusDays(date, -1);

      // then
      expect(actual.getTime()).toEqual(-24 * 60 * 60 * 1000);
    });

    it('should add 10 days', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusDays(date, 10);

      // then
      expect(actual.getTime()).toEqual(10 * 24 * 60 * 60 * 1000);
    });

    it('should substract 10 days', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusDays(date, -10);

      // then
      expect(actual.getTime()).toEqual(-10 * 24 * 60 * 60 * 1000);
    });
  });

  describe('minusDays', () => {
    it('should do nothing', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusDays(date, 0);

      // then
      expect(actual.getTime()).toEqual(0);
    });

    it('should subtract a single day', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusDays(date, 1);

      // then
      expect(actual.getTime()).toEqual(-24 * 60 * 60 * 1000);
    });

    it('should add a single day', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusDays(date, -1);

      // then
      expect(actual.getTime()).toEqual(24 * 60 * 60 * 1000);
    });

    it('should subtract 10 days', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusDays(date, 10);

      // then
      expect(actual.getTime()).toEqual(-10 * 24 * 60 * 60 * 1000);
    });

    it('should add 10 days', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusDays(date, -10);

      // then
      expect(actual.getTime()).toEqual(10 * 24 * 60 * 60 * 1000);
    });
  });

  describe('plusWeeks', () => {
    it('should do nothing', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusWeeks(date, 0);

      // then
      expect(actual.getTime()).toEqual(0);
    });

    it('should add a single week', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusWeeks(date, 1);

      // then
      expect(actual.getTime()).toEqual(7 * 24 * 60 * 60 * 1000);
    });

    it('should subtract a single week', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusWeeks(date, -1);

      // then
      expect(actual.getTime()).toEqual(-7 * 24 * 60 * 60 * 1000);
    });

    it('should add 10 weeks', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusWeeks(date, 10);

      // then
      expect(actual.getTime()).toEqual(10 * 7 * 24 * 60 * 60 * 1000);
    });

    it('should substract 10 weeks', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusWeeks(date, -10);

      // then
      expect(actual.getTime()).toEqual(-10 * 7 * 24 * 60 * 60 * 1000);
    });
  });

  describe('minusWeeks', () => {
    it('should do nothing', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusWeeks(date, 0);

      // then
      expect(actual.getTime()).toEqual(0);
    });

    it('should subtract a single week', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusWeeks(date, 1);

      // then
      expect(actual.getTime()).toEqual(-7 * 24 * 60 * 60 * 1000);
    });

    it('should add a single week', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusWeeks(date, -1);

      // then
      expect(actual.getTime()).toEqual(7 * 24 * 60 * 60 * 1000);
    });

    it('should subtract 10 weeks', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusWeeks(date, 10);

      // then
      expect(actual.getTime()).toEqual(-10 * 7 * 24 * 60 * 60 * 1000);
    });

    it('should add 10 weeks', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusWeeks(date, -10);

      // then
      expect(actual.getTime()).toEqual(10 * 7 * 24 * 60 * 60 * 1000);
    });
  });

  describe('plusMonths', () => {
    it('should do nothing', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusMonths(date, 0);

      // then
      expect(actual.getTime()).toEqual(0);
    });

    it('should add a single month', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusMonths(date, 1);

      // then
      expect(actual.getTime()).toEqual(31 * 24 * 60 * 60 * 1000);
    });

    it('should subtract a single month', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusMonths(date, -1);

      // then
      expect(actual.getTime()).toEqual(-31 * 24 * 60 * 60 * 1000);
    });

    it('should add 10 months', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusMonths(date, 10);

      // then
      expect(actual.getTime()).toEqual(DAYS_IN_JAN_TO_OCT * 24 * 60 * 60 * 1000);
    });

    it('should substract 10 months', () => {
      // given
      const date = new Date(0);

      // when
      const actual = plusMonths(date, -10);

      // then
      expect(actual.getTime()).toEqual(-DAYS_IN_MAR_TO_DEC * 24 * 60 * 60 * 1000);
    });
  });

  describe('minusMonths', () => {
    it('should do nothing', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusMonths(date, 0);

      // then
      expect(actual.getTime()).toEqual(0);
    });

    it('should subtract a single month', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusMonths(date, 1);

      // then
      expect(actual.getTime()).toEqual(-31 * 24 * 60 * 60 * 1000);
    });

    it('should add a single month', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusMonths(date, -1);

      // then
      expect(actual.getTime()).toEqual(31 * 24 * 60 * 60 * 1000);
    });

    it('should subtract 10 months', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusMonths(date, 10);

      // then
      expect(actual.getTime()).toEqual(-DAYS_IN_MAR_TO_DEC * 24 * 60 * 60 * 1000);
    });

    it('should add 10 months', () => {
      // given
      const date = new Date(0);

      // when
      const actual = minusMonths(date, -10);

      // then
      expect(actual.getTime()).toEqual(DAYS_IN_JAN_TO_OCT * 24 * 60 * 60 * 1000);
    });
  });
});
