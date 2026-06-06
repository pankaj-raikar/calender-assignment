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