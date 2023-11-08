import { Pipe, PipeTransform } from '@angular/core';
import * as Formatter from 'src/app/utils/formatters'

@Pipe({
  name: 'currencyLocalized'
})
export class CurrencyLocalizedPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value !== null && value !== undefined ? Formatter.asCurrency(value) : null;
  }

}
