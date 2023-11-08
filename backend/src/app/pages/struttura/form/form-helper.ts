import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import * as DateFns from 'date-fns'

const formGroupApertura = (fb: FormBuilder, data: any): FormGroup => {
  const oraDa = data?.oraDa ? DateFns.parse(data?.oraDa, 'kk:mm:ss', new Date()) : null
  const oraA = data?.oraA ? DateFns.parse(data?.oraA, 'kk:mm:ss', new Date()) : null

  return fb.group({
    giorno: [data?.giorno, [Validators.required]],
    oraDa: [oraDa, [Validators.required]],
    oraA: [oraA, [Validators.required]],
  })
}

const formGroupEvento = (fb: FormBuilder, data: any): FormGroup => {
  return fb.group({
    descrizione: [data?.descrizione, []],
    evento: [data?.evento, [Validators.required]],
    id: [data?.id, [Validators.required]],
  })
}

const formGroupServizio = (fb: FormBuilder, data: any): FormGroup => {
  return fb.group({
    codice: [data?.codice, [Validators.required]],
    descrizione: [data?.descrizione, [Validators.required]],
    importo: [data?.importo, []],
    id: [data?.id, [Validators.required]],
    note: [data?.note, []],
  })
}

const formGroupTariffario = (fb: FormBuilder, data: any): FormGroup => {
  const costoFasce = []

  if (data) {
    for (var i in data.costoFasce) {
      costoFasce.push(formGroupTariffarioCostoFascia(fb, data.costoFasce[i]))
    }
  }

  return fb.group({
    costoFasce: fb.array(costoFasce),
    costoInteraGiornata: [data?.costoInteraGiornata, []],
    costoOrario: [costoFasce.length <= 0 ? data?.costoOrario : null, []],
    costoSettimanale: [data?.costoSettimanale, []],
    evento: [data?.evento, []],
    flagInteraGiornata: [data?.flagInteraGiornata, []],
    flagInteraSettimana: [data?.flagInteraSettimana, []],
    id: [data?.id, []],
    note: [data?.note, []],
  })
}

const formGroupTariffarioCostoFascia = (fb: FormBuilder, data: any): FormGroup => {
  const fasce = []

  if (data) {
    for (var i in data.fasce) {
      fasce.push(formGroupTariffarioCostoFasciaFascia(fb, data.fasce[i]))
    }
  }

  return fb.group({
    fasce: fb.array(fasce),
    giorno: [data?.giorno, []],
  })
}

const formGroupTariffarioCostoFasciaFascia = (fb: FormBuilder, data: any): FormGroup => {
  const oraDa = data?.oraDa ? DateFns.parse(data?.oraDa, 'kk:mm:ss', new Date()) : null
  const oraA = data?.oraA ? DateFns.parse(data?.oraA, 'kk:mm:ss', new Date()) : null

  return fb.group({
    costoFascia: [data?.costoFascia, []],
    oraDa: [oraDa, [Validators.required]],
    oraA: [oraA, [Validators.required]],
  })
}

const formGroupReservations = (fb: FormBuilder, data: any): FormGroup => {
  const giornoDa = data?.giornoDa ? DateFns.parse(data?.giornoDa, 'yyyy-MM-dd', new Date()) : null
  const giornoA = data?.giornoA ? DateFns.parse(data?.giornoA, 'yyyy-MM-dd', new Date()) : null

  const oraDa = data?.oraDa ? DateFns.parse(data?.oraDa, 'kk:mm:ss', new Date()) : null
  const oraA = data?.oraA ? DateFns.parse(data?.oraA, 'kk:mm:ss', new Date()) : null

  return fb.group({
    id: [data?.id, []],
    motivo: [data?.motivo, [Validators.required]],
    giornoDa: [giornoDa, [Validators.required]],
    giornoA: [giornoA, [Validators.required]],
    oraDa: [oraDa, [Validators.required]],
    oraA: [oraA, [Validators.required]],
    note: [data?.note, []],
  })
}

const giorniSettimana = () => {
  return [
    { label: 'Lunedì', value: 'LUN', order: 1 },
    { label: 'Martedì', value: 'MAR', order: 2 },
    { label: 'Mercoledì', value: 'MER', order: 3 },
    { label: 'Giovedì', value: 'GIO', order: 4 },
    { label: 'Venerdì', value: 'VEN', order: 5 },
    { label: 'Sabato', value: 'SAB', order: 6 },
    { label: 'Domenica', value: 'DOM', order: 7 },
  ]
}

export {
  giorniSettimana,
  formGroupApertura,
  formGroupEvento,
  formGroupServizio,
  formGroupTariffario,
  formGroupTariffarioCostoFascia,
  formGroupTariffarioCostoFasciaFascia,
  formGroupReservations,
}
