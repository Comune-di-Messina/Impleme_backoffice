import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as Formatter from 'src/app/utils/formatters'
import * as Reducers from '../../../../store/reducers'
import { NzMessageService } from 'ng-zorro-antd/message'
import { select, Store } from '@ngrx/store'

import { ManageReportingsService } from '../../../../services/api/segnalame/management/manage-reportings.service'
import { Reporting, ReportingStatus } from '../../../../models/segnalame/reporting'
import { User } from '../../../../models/segnalame/user'
import { ReportingResponse } from './reporting-resolver.service'

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent implements OnInit {
  currentUser: any
  reporting: Reporting
  users: User[] = []
  statuses: ReportingStatus[] = []

  @ViewChild('mapContainer', { static: true }) gmap: ElementRef
  map: google.maps.Map

  isLoading: boolean = false
  acceptModalVisible: boolean = false

  privateNote: string

  refuseModalVisible: boolean = false
  validateRefuseForm: FormGroup

  assignModalVisible: boolean = false
  validateAssignForm: FormGroup

  closeModalVisible: boolean = false
  validateCloseForm: FormGroup

  closeStatuses = [
    {
      id: 5,
      value: 'Risolta',
    },
    {
      id: 6,
      value: 'Non risolvibile',
    },
    {
      id: 7,
      value: 'Risolta parzialmente',
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private manageReportingsService: ManageReportingsService,
    private msg: NzMessageService,
    private store: Store<any>,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { reportingResponse: ReportingResponse }) => {
      this.reporting = data.reportingResponse.reporting
      this.users = data.reportingResponse.users
      this.statuses = data.reportingResponse.statuses

      if (this.reporting.latitude && this.reporting.longitude) {
        this.initMap()
      }
    })

    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.currentUser = state
    })

    this.validateRefuseForm = this.fb.group({
      publicNote: [null, [Validators.required]],
    })

    this.validateAssignForm = this.fb.group({
      user: [null, [Validators.required]],
      note: [null, []],
    })

    this.validateCloseForm = this.fb.group({
      status: [null, [Validators.required]],
      note: [null, []],
    })
  }

  initMap() {
    const coordinates = new google.maps.LatLng(this.reporting.latitude, this.reporting.longitude)

    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 15,
      fullscreenControl: true,
      mapTypeControl: true,
      streetViewControl: true,
    }
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions)

    const marker = new google.maps.Marker({
      // icon: {
      //   url: '/assets/images/map_marker.png',
      //   scaledSize: new google.maps.Size(47, 53), // scaled size
      //   origin: new google.maps.Point(0, 0), // origin
      //   anchor: new google.maps.Point(25, 43) // anchor
      // },
      position: coordinates,
      map: this.map,
    })
  }

  get cardTitle(): string {
    if (this.reporting?.closedTs) {
      return 'Chiusa il: ' + this.getDateTime(this.reporting.closedTs)
    } else if (this.reporting?.insertTs) {
      return 'Inserita il: ' + this.getDateTime(this.reporting.insertTs)
    }
    return ''
  }

  get canBeAccepted(): boolean {
    return this.reporting.statusId === 1
  }

  get canBeClosed(): boolean {
    return true
  }

  get canBeRefused(): boolean {
    return this.reporting.statusId === 1
  }

  get availableActions(): number[] {
    switch (this.reporting.statusId) {
      case 1:
        // Inserita
        return [1, 2]
      case 2:
        // Accepted
        return [3]
      case 3:
        // Rifiutata
        return []
      case 4:
        // In lavorazione
        return this.currentUser?.login === this.reporting.assignedTo?.login ? [4] : []
      case 5:
        // Risolta
        return []
      case 6:
        // Non risolvibile
        return []
      case 7:
        // Risolta parzialmente
        return []
      default:
        break
    }
    return []
  }

  getActiveStatus(statusId: number): ReportingStatus {
    return this.statuses.find((status, i) => {
      return status.id === statusId
    })
  }

  getStatusColor(statusId: number) {
    switch (statusId) {
      case 1:
        // Inserita
        return 'blue'
      case 2:
        // Accepted
        return 'cyan'
      case 3:
        // Rifiutata
        return 'red'
      case 4:
        // In lavorazione
        return 'gold'
      case 5:
        // Risolta
        return 'green'
      case 6:
        // Non risolvibile
        return 'volcano'
      case 7:
        // Risolta parzialmente
        return 'lime'

      default:
        return 'blue'
    }
  }

  getDateTime(date: string | Date) {
    return Formatter.asDateTime(date)
  }

  acceptReporting(e: Event) {
    this.isLoading = true

    this.manageReportingsService.acceptReporting(this.reporting.id, this.privateNote).subscribe(
      result => {
        this.reporting = result
        this.msg.success('Operazione completata con sucesso')
        this.acceptModalVisible = false
        this.isLoading = false
      },
      error => {
        console.log(error)
        this.msg.error('Si è verificato un errore durante il salvataggio')
        this.isLoading = false
      },
    )
  }

  refuseReporting() {
    for (const i in this.validateRefuseForm.controls) {
      if (this.validateRefuseForm.controls.hasOwnProperty(i)) {
        this.validateRefuseForm.controls[i].markAsDirty()
        this.validateRefuseForm.controls[i].updateValueAndValidity()
      }
    }

    this.isLoading = true
    const notePublic = this.validateRefuseForm.controls['publicNote'].value

    this.manageReportingsService.refuseReporting(this.reporting.id, notePublic).subscribe(
      result => {
        this.reporting = result
        this.msg.success('Operazione completata con sucesso')
        this.refuseModalVisible = false
        this.isLoading = false
      },
      error => {
        console.log(error)
        this.msg.error('Si è verificato un errore durante il salvataggio')
        this.isLoading = false
      },
    )
  }

  assignReporting() {
    for (const i in this.validateAssignForm.controls) {
      if (this.validateAssignForm.controls.hasOwnProperty(i)) {
        this.validateAssignForm.controls[i].markAsDirty()
        this.validateAssignForm.controls[i].updateValueAndValidity()
      }
    }

    this.isLoading = true
    const userId = this.validateAssignForm.controls['user'].value
    const note = this.validateAssignForm.controls['note'].value

    this.manageReportingsService.assignUser(this.reporting.id, userId, note).subscribe(
      result => {
        this.reporting = result
        this.msg.success('Operazione completata con sucesso')
        this.assignModalVisible = false
        this.isLoading = false
      },
      error => {
        console.log(error)
        this.msg.error('Si è verificato un errore durante il salvataggio')
        this.isLoading = false
      },
    )
  }

  closeReporting() {
    for (const i in this.validateCloseForm.controls) {
      if (this.validateCloseForm.controls.hasOwnProperty(i)) {
        this.validateCloseForm.controls[i].markAsDirty()
        this.validateCloseForm.controls[i].updateValueAndValidity()
      }
    }

    this.isLoading = true
    const statusId = this.validateCloseForm.controls['status'].value
    const note = this.validateCloseForm.controls['note'].value

    this.manageReportingsService.closeReporting(this.reporting.id, statusId, note).subscribe(
      result => {
        this.reporting = result
        this.msg.success('Operazione completata con sucesso')
        this.closeModalVisible = false
        this.isLoading = false
      },
      error => {
        console.log(error)
        this.msg.error('Si è verificato un errore durante il salvataggio')
        this.isLoading = false
      },
    )
  }

  onDocumentClick(url: string, filename: string) {
    this.manageReportingsService.downloadFile(url).subscribe(data => {
      const a = window.document.createElement('a')
      const objectUrl = URL.createObjectURL(data)
      a.href = objectUrl
      a.download = filename
      a.click()
      URL.revokeObjectURL(objectUrl)
    })
  }

  handleModalCancel() {
    this.acceptModalVisible = false
  }
}
