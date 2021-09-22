export function numberWithCommas(x?: number): string | undefined {
  if (!x) return undefined;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}