import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'reservationId',
})
export class ReservationIdPipe implements PipeTransform {
  transform(value: string | number, ...args: unknown[]): string {
    value = value.toString()

    if (value.length > 9) {
      value = value.slice(value.length - 9, value.length)
    }

    if (value.length < 9) {
      for (let index = value.length; index < 9; index++) {
        value = '0' + value
      }
    }

    return value.slice(0, 6) + '-' + value.slice(6)
  }
}
