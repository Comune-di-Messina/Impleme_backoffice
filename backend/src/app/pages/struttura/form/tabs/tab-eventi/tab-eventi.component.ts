import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as FormHelper from '../../form-helper'
import { ACLService } from 'src/app/services/acl'

@Component({
  selector: 'struttura-create-tab-eventi',
  templateUrl: './tab-eventi.component.html',
  styleUrls: ['./tab-eventi.component.scss'],
})
export class TabEventiComponent implements OnInit {
  @Input() validateForm: FormGroup

  constructor(private fb: FormBuilder, private aclService: ACLService) {}

  ngOnInit(): void {}

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  get eventi() {
    return this.validateForm.get('eventi') as FormArray
  }

  addEvento(): void {
    this.eventi.push(FormHelper.formGroupEvento(this.fb, null))
  }

  delEvento(index): void {
    this.eventi.removeAt(index)
  }
}
