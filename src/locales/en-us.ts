import { GanttLocale } from "../Gantt";

export const enUS: GanttLocale = Object.freeze({
    today: "Today",
    day: "Day",
    days: "Days",
    threeDay: "3 Days",
    week: "Week",
    month: "Month",
    quarter: "Quarter",
    halfYear: "Half year",
    firstHalf: "First half",
    secondHalf: "Second half",
    majorFormat: {
      day: "MMMM YYYY",
      threeDay: "MMMM YYYY",
      week: "YYYY",
      month: "YYYY",
      quarter: "YYYY",
      halfYear: "YYYY",
    },
    minorFormat: {
      day: "D",
      threeDay: "D",
      week: "wo [week]",
      month: "MMMM",
      quarter: "[Q]Q",
      halfYear: "YYYY-",
    }
  });