import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as FormHelper from '../../form-helper'
import { ACLService } from 'src/app/services/acl'

const merge = require('deepmerge')

@Component({
  selector: 'struttura-create-tab-servizi',
  templateUrl: './tab-servizi.component.html',
  styleUrls: ['./tab-servizi.component.scss'],
})
export class TabServiziComponent implements OnInit {
  @Input() validateForm: FormGroup

  constructor(private fb: FormBuilder, private aclService: ACLService) {}

  ngOnInit(): void {}

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  get servizi(): FormArray {
    return this.validateForm.get('servizi') as FormArray
  }

  addServizio(): void {
    this.servizi.push(FormHelper.formGroupServizio(this.fb, null))
  }

  formatterEuro = (value: number) => (value ? `${value} €` : `0.00 €`)
  parserEuro = (value: string) => value.replace(' €', '')

  delServizio(index): void {
    ;(<FormArray>this.validateForm.get('servizi')).removeAt(index)
  }
}
