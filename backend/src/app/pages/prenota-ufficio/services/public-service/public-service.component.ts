import { Component, OnInit, OnChanges } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageServiceTypesService } from '../../../../services/api/prenota-ufficio/manage-service-types.service'
import { ManagePublicServicesService } from '../../../../services/api/prenota-ufficio/manage-public-services.service'
import { ServiceType } from '../../../../models/prenota-ufficio/service-type'
import {
  PublicService,
  PublicServicePayload,
  ReservationType,
} from '../../../../models/prenota-ufficio/public-service'

@Component({
  selector: 'app-public-service',
  templateUrl: './public-service.component.html',
  styleUrls: ['./public-service.component.scss'],
})
export class PublicServiceComponent implements OnInit, OnChanges {
  pageTitle: string
  pageSubtitle: string
  isNew: boolean = true
  serviceTypes: ServiceType[] = []
  publicService: PublicService = {} as PublicService
  validateForm: FormGroup
  reservationTypes = ReservationType
  reservationTypesKeys: any[]

  constructor(
    private serviceTypesService: ManageServiceTypesService,
    private publicServicesService: ManagePublicServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.getServiceTypes()

    this.route.data.subscribe(
      (data: { pageTitle: string; pageSubtitle: string; isNew: boolean }) => {
        this.pageTitle = data.pageTitle
        this.pageSubtitle = data.pageSubtitle
        this.isNew = data.isNew
      },
    )

    this.route.params.subscribe(params => {
      if (params.serviceId) {
        this.getPublicService(params.serviceId)
      }
    })

    this.initForm()
  }

  ngOnChanges(changes) {
    if (changes.publicService) {
      this.initForm()
    }
  }

  initForm() {
    this.reservationTypesKeys = Object.keys(this.reservationTypes)
    console.log(this.reservationTypesKeys, ' this.reservationTypesKeys')

    this.validateForm = this.fb.group({
      name: [this.publicService?.name, [Validators.required]],
      description: [this.publicService?.description, []],
      notes: [this.publicService?.notes, []],
      typeId: [this.publicService?.typeId, [Validators.required]],
      labelField: [this.publicService?.labelField, []],
      mandatoryField: [this.publicService?.mandatoryField, []],
      fieldNotes: [this.publicService?.fieldNotes, []],
      reservationType: [this.publicService?.reservationType, [Validators.required]],
    })
  }

  getPublicService(id: string) {
    this.publicServicesService.getPublicService(id).subscribe(result => {
      this.publicService = result
      this.isNew = false
      this.initForm()
    })
  }

  getServiceTypes() {
    this.serviceTypesService.getServiceTypes().subscribe(results => {
      this.serviceTypes = results
    })
  }

  submitForm() {
    const payload: PublicServicePayload = {
      name: this.publicService?.name,
      description: this.publicService?.description,
      notes: this.publicService?.notes,
      typeId: this.publicService?.typeId,
      labelField: this.publicService?.labelField,
      mandatoryField: this.publicService?.mandatoryField,
      fieldNotes: this.publicService?.fieldNotes,
      reservationType: this.publicService?.reservationType,
    }

    for (var i in this.validateForm.controls) {
      payload[i] = this.validateForm.controls[i].value
    }

    if (this.isNew) {
      this.publicServicesService.createPublicService(payload).subscribe(
        result => {
          this.publicService = result
          this.msg.success('Operazione completata con successo')

          this.router.navigate(['/prenota-ufficio/public-service/edit/' + this.publicService.id])
        },
        error => {
          this.msg.error("Si è verificato un errore durante l'operazione")
          console.log(error)
        },
      )
    } else {
      this.publicServicesService
        .editPublicService(this.publicService.id, payload)
        .subscribe(result => {
          this.publicService = result
          this.msg.success('Operazione completata con successo')
        })
    }
  }
}
