import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { setHours } from 'date-fns'
import * as FormHelper from '../../form-helper'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'struttura-create-tab-aperture',
  templateUrl: './tab-aperture.component.html',
  styleUrls: ['./tab-aperture.component.scss'],
})
export class TabApertureComponent implements OnInit {
  @Input() validateForm: FormGroup

  constructor(private fb: FormBuilder, private aclService: ACLService) {}

  giorniSettimana = FormHelper.giorniSettimana()

  ngOnInit(): void {}

  get aperture() {
    return this.validateForm.get('aperture') as FormArray
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  addApertura(): void {
    let nuovaApertura = FormHelper.formGroupApertura(this.fb, null)
    if (this.aperture.length > 0) {
      nuovaApertura
        .get('oraDa')
        .setValue(this.aperture.controls[this.aperture.length - 1].get('oraDa').value)
      nuovaApertura
        .get('oraA')
        .setValue(this.aperture.controls[this.aperture.length - 1].get('oraA').value)
      nuovaApertura
        .get('giorno')
        .setValue(
          this.giornoSuccessivo(
            this.aperture.controls[this.aperture.length - 1].get('giorno').value,
          ),
        )
    }
    this.aperture.push(nuovaApertura)
  }

  delApertura(index): void {
    this.aperture.removeAt(index)
  }

  topOfTheHour(evt): void {
    let ora = evt as Date
    ora.setSeconds(0)
    if (ora.getMinutes() != 0 && ora.getMinutes() != 30) ora.setMinutes(0)
    evt = ora
  }

  giornoSuccessivo(elemento) {
    switch (elemento) {
      case 'LUN':
        return 'MAR'
      case 'MAR':
        return 'MER'
      case 'MER':
        return 'GIO'
      case 'GIO':
        return 'VEN'
      case 'VEN':
        return 'SAB'
      case 'SAB':
        return 'DOM'
      default:
        return null
    }
  }

  giorniDisponibili(index) {
    if (index > -1) {
      let controls = this.aperture.controls?.map(control => control.get('giorno').value)
      return this.giorniSettimana.filter(
        element =>
          !controls.includes(element.value) ||
          element.value == this.aperture.controls[index].get('giorno').value,
      )
    } else {
      let controls = this.aperture.controls?.map(control => control.get('giorno').value)
      return this.giorniSettimana.filter(element => !controls.includes(element.value))
    }
  }
}
