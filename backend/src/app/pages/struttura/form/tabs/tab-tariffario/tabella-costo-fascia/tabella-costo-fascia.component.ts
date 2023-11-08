import { Component, OnInit, Input } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import * as FormHelper from '../../../form-helper'
import { ACLService } from 'src/app/services/acl'
import { Fascia } from 'src/app/models/fascia'

@Component({
  selector: 'tabella-costo-fascia',
  templateUrl: './tabella-costo-fascia.component.html',
  styleUrls: ['./tabella-costo-fascia.component.scss'],
})
export class TabellaCostoFasciaComponent implements OnInit {
  @Input() costoFasciaItem: FormGroup
  @Input() formIndex: number

  costAllItem: string

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

  get fasce() {
    return this.costoFasciaItem.get('fasce') as FormArray
  }

  addItem(): void {
    this.fasce.push(FormHelper.formGroupTariffarioCostoFasciaFascia(this.fb, null))
  }

  delItem(index): void {
    this.fasce.removeAt(index)
  }

  topOfTheHour(evt: Date): void {
    evt.setSeconds(0)
    if (evt.getMinutes() != 0 && evt.getMinutes() != 30) evt.setMinutes(0)
  }

  setCostAllItems(): void {
    if (this.costAllItem !== undefined) {
      const newCostsFasce = this.costoFasciaItem
        .get('fasce')
        .value.map((fascia: Fascia, i: number) => {
          fascia.costoFascia = parseFloat(this.costAllItem)
          return fascia
        })

      this.costoFasciaItem.patchValue({
        fasce: newCostsFasce,
      })
    }
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route) || true
  }

  formatterEuro = (value: number) => (value ? `${value} €` : `0.00 €`)
  parserEuro = (value: string) => value.replace(' €', '')
}
