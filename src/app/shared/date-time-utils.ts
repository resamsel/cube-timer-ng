export class DateTimeUtils {

  static durationInMillis(start: Date | undefined, end: Date | undefined) {
    if (start === undefined || end === undefined) {
      return 0;
    }
    return end.getTime() - start.getTime();
  }
}
