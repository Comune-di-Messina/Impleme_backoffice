import { formatCurrency } from '@angular/common'
import * as DateFNS from 'date-fns'
import { it } from 'date-fns/locale'

const asCurrency = (value: number) => {
  return value !== null && value != undefined ? formatCurrency(value, 'it', '€ ', 'EUR') : null
}

const asDate = (value: string | Date) => {
  return value ? DateFNS.format(new Date(value), 'dd/MM/yyyy') : null
}

const asDateTime = (value: string | Date) => {
  return value ? DateFNS.format(new Date(value), 'dd/MM/yyyy HH:mm', { locale: it }) : null
}

const asDateISO = (value: string | Date) => {
  return value ? DateFNS.formatRFC3339(new Date(value), { fractionDigits: 3 }) : null
}

const asTimestamp = (value: string | Date) => {
  return value ? DateFNS.getTime(new Date(value)) : null
}

export { asCurrency, asDate, asDateTime, asDateISO, asTimestamp }
