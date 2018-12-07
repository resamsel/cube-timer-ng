export function durationInMillis(start: Date | undefined, end: Date | undefined): number {
  if (start === undefined || end === undefined) {
    return 0;
  }
  return end.getTime() - start.getTime();
}

function cloneDate(input: Date): Date {
  const output = new Date();

  output.setTime(input.getTime());

  return output;
}

export function startOfDay(input: Date): Date {
  const output = cloneDate(input);

  output.setHours(0, 0, 0, 0);

  return output;
}

export function startOfWeek(input: Date): Date {
  const output = startOfDay(input);

  const day = input.getDay();
  output.setDate(input.getDate() - day + (day === 0 ? -6 : 1));

  return output;
}

export function startOfMonth(input: Date): Date {
  const output = startOfDay(input);

  output.setDate(1);

  return output;
}

export function plusDays(input: Date, days: number): Date {
  const out = cloneDate(input);

  out.setDate(out.getDate() + days);

  return out;
}

export function minusDays(input: Date, days: number): Date {
  return plusDays(input, -days);
}

export function plusWeeks(input: Date, weeks: number): Date {
  return plusDays(input, weeks * 7);
}

export function minusWeeks(input: Date, weeks: number): Date {
  return plusWeeks(input, -weeks);
}

export function plusMonths(input: Date, months: number): Date {
  const output = cloneDate(input);

  output.setMonth(input.getMonth() + months);

  return output;
}

export function minusMonths(input: Date, months: number): Date {
  return plusMonths(input, -months);
}
