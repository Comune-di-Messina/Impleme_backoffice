import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as FormHelper from '../../form-helper'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'struttura-create-tab-restrizioni',
  templateUrl: './tab-restrizioni.component.html',
  styleUrls: ['./tab-restrizioni.component.scss'],
})
export class TabRestrizioniComponent implements OnInit {
  @Input() validateForm: FormGroup

  constructor(private fb: FormBuilder, private aclService: ACLService) {}

  ngOnInit(): void {}

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  get riserve() {
    return this.validateForm.get('riserve') as FormArray
  }

  addItem(): void {
    this.riserve.push(FormHelper.formGroupReservations(this.fb, null))
  }

  delItem(index): void {
    this.riserve.removeAt(index)
  }
}
