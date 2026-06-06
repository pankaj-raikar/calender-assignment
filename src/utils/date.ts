export function getDurationInDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const difference = end.getTime() - start.getTime();
  const days = Math.floor(difference / millisecondsPerDay) + 1;

  return Math.max(days, 1);
}

export function formatDuration(startDate: string, endDate: string) {
  const days = getDurationInDays(startDate, endDate);

  return days === 1 ? "1 day" : `${days} days`;
}

export function isDateInRange(
  date: string,
  startDate: string,
  endDate: string,
) {
  const current = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return current >= start && current <= end;
}

export function rangesOverlap(
  firstStart: string,
  firstEnd: string,
  secondStart: string,
  secondEnd: string,
) {
  return (
    new Date(firstStart) <= new Date(secondEnd) &&
    new Date(secondStart) <= new Date(firstEnd)
  );
}

export type CalendarDay = {
  day: number;
  dateString: string;
  isCurrentMonth: boolean;
};

export function getCalendarDays(month: string): CalendarDay[] {
  const firstDay = new Date(`${month}-01`);
  const year = firstDay.getFullYear();
  const monthIndex = firstDay.getMonth();

  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const days: CalendarDay[] = [];

  for (let index = firstWeekday - 1; index >= 0; index--) {
    const date = new Date(year, monthIndex, -index);
    days.push({
      day: date.getDate(),
      dateString: date.toISOString().slice(0, 10),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    days.push({
      day,
      dateString: date.toISOString().slice(0, 10),
      isCurrentMonth: true,
    });
  }

  while (days.length % 7 !== 0) {
    const date = new Date(year, monthIndex, days.length - firstWeekday + 1);
    days.push({
      day: date.getDate(),
      dateString: date.toISOString().slice(0, 10),
      isCurrentMonth: false,
    });
  }

  return days;
}
