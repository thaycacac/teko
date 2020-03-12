export function thoundsandDelimiter(number: number): string {
  if (!number) {
    return ''
  }
  return number.toLocaleString('vi-VN')
}
