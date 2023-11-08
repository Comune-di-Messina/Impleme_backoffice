import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { eachHourOfInterval, format, addHours, subHours } from 'date-fns'
import * as FormHelper from '../../form-helper'
import { ACLService } from 'src/app/services/acl'

const merge = require('deepmerge')

@Component({
  selector: 'struttura-create-tab-tariffario',
  templateUrl: './tab-tariffario.component.html',
  styleUrls: ['./tab-tariffario.component.scss'],
})
export class TabTariffarioComponent implements OnInit {
  @Input() validateForm: FormGroup

  constructor(private fb: FormBuilder, private aclService: ACLService) {}

  expandSet = new Set<number>()

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id)
    } else {
      this.expandSet.delete(id)
    }
  }

  ngOnInit(): void {}

  get tariffario() {
    return this.validateForm.get('tariffario') as FormArray
  }

  get aperture() {
    return this.validateForm.get('aperture') as FormArray
  }

  isCheckedInput(index: number, input: string): boolean {
    return this.tariffario.controls[index].value[input]
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route) || true
  }

  addTariffario(fromChild: number): void {
    let nuovoTariffario = {
      flagInteraGiornata: null,
      costoOrario: null,
      evento: null,
      costoFasce: null,
      costoInteraGiornata: null,
      costoSettimanale: null,
      note: null,
    }

    if (fromChild >= 0) {
      const current = this.tariffario.at(fromChild)
      this.tariffario.removeAt(fromChild)
      this.tariffario.insert(
        fromChild,
        FormHelper.formGroupTariffario(this.fb, {
          ...current.value,
          costoFasce: this.aperture.value.map(giornoApertura =>
            this.generateCostoGiornata(giornoApertura),
          ),
        }),
      )
    } else {
      this.tariffario.push(FormHelper.formGroupTariffario(this.fb, nuovoTariffario))
    }
  }

  reloadTariffario(index: number): void {
    this.addTariffario(index)
  }

  delTariffario(index): void {
    this.tariffario.removeAt(index)
  }

  generateCostoGiornata(data: any): any {
    if (data) {
      if (subHours(data?.oraA, 1) > data?.oraDa) {
        return {
          giorno: data?.giorno,
          fasce: eachHourOfInterval({
            start: data?.oraDa,
            end: subHours(data?.oraA, 1),
          }).map(function(fascia) {
            return {
              oraDa: format(fascia, 'kk:mm:ss'),
              oraA: format(addHours(fascia, 1), 'kk:mm:ss'),
              costoFascia: null,
            }
          }),
        }
      } else
        return {
          giorno: data?.giorno,
          fasce: [
            {
              oraDa: format(data?.oraDa, 'kk:mm:ss'),
              oraA: format(data?.oraA, 'kk:mm:ss'),
              costoFascia: null,
            },
          ],
        }
    } else return null
  }

  formatterEuro = (value: number) => (value ? `${value} €` : `0.00 €`)
  parserEuro = (value: string) => value.replace(' €', '')

  // Not used
  // updateTariffario(index: any, event: any): void {
  //   let costoFasceEvento = this.tariffario.get([index, 'costoFasce']) as FormArray
  //   costoFasceEvento.controls.forEach(giorno => {
  //     let fasce = giorno.get('fasce') as FormArray
  //     fasce.controls.forEach(fascia => {
  //       fascia.get('costoFascia').setValue(event.target.value)
  //     })
  //   })
  // }
}
