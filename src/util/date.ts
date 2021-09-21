function fixDigit(number: number) {
  return number.toString().padStart(2, '0');
}

export function dayString(year: number, month:number, day:number) {
  return `${year}${fixDigit(month)}${fixDigit(day)}`;
}