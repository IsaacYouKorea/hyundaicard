function fixDigit(number: number) {
  return number.toString().padStart(2, '0');
}

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