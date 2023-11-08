import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import * as FormHelper from '../../../form-helper'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'tabella-fasce',
  templateUrl: './tabella-fasce.component.html',
  styleUrls: ['./tabella-fasce.component.scss'],
})
export class TabellaFasceComponent implements OnInit {
  @Input() tariffarioItem: FormGroup
  @Input() formIndex: number
  @Output('handleUpdateTariffario') handleUpdateTariffario: EventEmitter<any> = new EventEmitter()

  constructor(private fb: FormBuilder, private aclService: ACLService) {}

  expandSet = new Set<number>()
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id)
    } else {
      this.expandSet.delete(id)
    }
  }

  giorniSettimana = FormHelper.giorniSettimana()

  ngOnInit(): void {}

  get costoFasce() {
    return this.tariffarioItem.get('costoFasce') as FormArray
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  addItem(): void {
    this.costoFasce.push(FormHelper.formGroupTariffarioCostoFascia(this.fb, null))
  }

  delItem(index): void {
    this.costoFasce.removeAt(index)
  }

  updateTariffario(): void {
    this.handleUpdateTariffario.emit()
  }

  giorniDisponibili(index) {
    if (index > -1) {
      let controls = this.costoFasce.controls?.map(control => control.get('giorno').value)
      return this.giorniSettimana.filter(
        element =>
          !controls.includes(element.value) ||
          element.value == this.costoFasce.controls[index].get('giorno').value,
      )
    } else {
      let controls = this.costoFasce.controls?.map(control => control.get('giorno').value)
      return this.giorniSettimana.filter(element => !controls.includes(element.value))
    }
  }
}
