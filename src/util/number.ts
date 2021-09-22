export function numberWithCommas(x?: number): string | undefined {
  if (!x) return undefined;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function fixDigit(number: number, mexLength:number=2) {
  return number.toString().padStart(mexLength, '0');
}