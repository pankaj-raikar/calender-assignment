import { expect, test } from "bun:test";
import { formatDuration, getDurationInDays, rangesOverlap } from "./date";

test("treats same-day orders as 1 day", () => {
  expect(getDurationInDays("2025-08-01", "2025-08-01")).toBe(1);
  expect(formatDuration("2025-08-01", "2025-08-01")).toBe("1 day");
});

test("calculates inclusive multi-day duration", () => {
  expect(getDurationInDays("2025-08-01", "2025-08-03")).toBe(3);
  expect(formatDuration("2025-08-01", "2025-08-03")).toBe("3 days");
});

test("detects overlapping date ranges", () => {
  expect(
    rangesOverlap("2025-08-01", "2025-08-03", "2025-08-03", "2025-08-05"),
  ).toBe(true);
});

test("detects non-overlapping date ranges", () => {
  expect(
    rangesOverlap("2025-08-01", "2025-08-03", "2025-08-04", "2025-08-05"),
  ).toBe(false);
});
