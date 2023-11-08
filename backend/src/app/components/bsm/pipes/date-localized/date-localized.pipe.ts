import { Pipe, PipeTransform } from '@angular/core';
import * as Formatter from 'src/app/utils/formatters'

@Pipe({
  name: 'dateLocalized'
})
export class DateLocalizedPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value !== null && value !== undefined ? Formatter.asDate(value) : null;
  }

}
