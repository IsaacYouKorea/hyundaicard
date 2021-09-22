import { fixDigit } from "./number";

export function dayString(year: number, month:number, day:number) {
  return `${year}${fixDigit(month)}${fixDigit(day)}`;
}

export function monthsBefore(monthCount = 24) {
  return new Array(monthCount).fill(0).map((_, index) => {
    const currentMonth = new Date().getMonth();
    const date = new Date();
    date.setMonth(currentMonth - index);
    return {
      year: date.getFullYear(),
      month: date.getMonth()
    }
  }).reverse();
}

export const dayNames = ['일', '월', '화', '수', '목', '금', '토'];