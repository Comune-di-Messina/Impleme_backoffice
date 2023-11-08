import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'
import { PraticaResponse } from './case-file-resolver.service'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import {
  Pratica,
  Allegato,
  TipologiaPratica,
  TaskDomain,
  getStatusName,
  getStatusColor,
} from '../../../../models/passi-carrabili/pratiche'
import {
  ManagePraticheService,
  CompleteTaskPayload,
} from 'src/app/services/api/passi-carrabili/manage-pratiche.service'
import { Institute } from '../../../../models/institute'

export interface FormValues {
  values: {
    type: 'string' | 'select'
    name: string
    label: string
    enums?: string[]
    required: boolean
    selected: string
  }[]
}

@Component({
  selector: 'app-case-file',
  templateUrl: './case-file.component.html',
  styleUrls: ['./case-file.component.scss'],
})
export class CaseFileComponent implements OnInit {
  pratica: Pratica
  praticaAssignee: TaskDomain
  tipologia: TipologiaPratica
  institute: Institute
  validateForm: FormGroup
  errorSave: string
  successMessage: string
  formValues: FormValues = {
    values: [],
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private praticheService: ManagePraticheService,
    private roomBookingBookingsService: RoomBookingBookingsService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { praticaResponse: PraticaResponse }) => {
      this.pratica = data.praticaResponse.pratica
      this.praticaAssignee = data.praticaResponse.praticaAssignee
      this.tipologia = data.praticaResponse.tipologia
      this.institute = data.praticaResponse.institute

      if (this.praticaAssignee) {
        this.processFormValues()
      }

      console.log(
        {
          pratica: this.pratica,
          praticapraticaAssignee: this.praticaAssignee,
          tipologia: this.tipologia,
          institute: this.institute,
        },
        'this.pratica',
      )
    })
  }

  processFormValues() {
    const parameters = this.praticaAssignee.jsonSchema.properties
    const required = this.praticaAssignee.jsonSchema.required

    let formGroup = {}
    for (const [key, value] of Object.entries(parameters)) {
      this.formValues.values.push({
        type: value.enum ? 'select' : 'string',
        name: key,
        label: value.description,
        enums: value.enum,
        required: required.includes(key) ? true : false,
        selected: undefined,
      })

      if (required.includes(key)) {
        formGroup[key] = [null, [Validators.required]]
      } else {
        formGroup[key] = [null, []]
      }
    }

    this.validateForm = this.fb.group(formGroup)
  }

  get getIndirizzo(): string {
    return `${this.pratica.richiedente.indirizzo.indirizzo} ${this.pratica.richiedente.indirizzo.civico}, ${this.pratica.richiedente.indirizzo.cap} ${this.pratica.richiedente.indirizzo.comune} ${this.pratica.richiedente.indirizzo.provincia}`
  }

  get getActiveStatus(): string {
    return getStatusName(this.pratica.state)
  }

  get getActiveStatusColor(): string {
    return getStatusColor(this.pratica.state)
  }

  submitForm(): void {
    this.errorSave = null
    this.successMessage = null
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }

    const payload: CompleteTaskPayload = {}
    for (var i in this.validateForm.controls) {
      payload[i] = this.validateForm.controls[i].value
    }

    this.praticheService.completeTask(this.praticaAssignee.key, payload).subscribe(
      data => {
        this.msg.success('Pratica modificata con successo')
        this.router.navigate(['/passi-carrabili/casefiles/index'])
      },
      error => {
        if (error.error && error.error.message) {
          this.errorSave = error.error.message
        } else {
          this.errorSave = error.message
        }
      },
    )
  }

  onDocumentClick(document: Allegato) {
    this.roomBookingBookingsService.documentContent(document.idDocumentale).subscribe(data => {
      const a = window.document.createElement('a')
      const objectUrl = URL.createObjectURL(data)
      a.href = objectUrl
      a.download = document.fileName
      a.click()
      URL.revokeObjectURL(objectUrl)
    })
  }
}
