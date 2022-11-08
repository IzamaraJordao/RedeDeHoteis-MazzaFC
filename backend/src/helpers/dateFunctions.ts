import { add, parseISO, sub } from 'date-fns'

type Duration = {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}
export function subtractDate(date: Date | string, duration: Duration) {
  return typeof date == 'string'
    ? sub(parseISO(date), duration)
    : sub(date, duration)
}

export function addDate(date: Date | string, duration: Duration) {
  return typeof date == 'string'
    ? add(parseISO(date), duration)
    : add(date, duration)
}
