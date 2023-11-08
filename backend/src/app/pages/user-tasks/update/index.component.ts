import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import {
  EntiService,
  RoomsCategoriesService,
  RoomsService,
  UserTasksService,
} from 'src/app/services/api'
import { Store } from '@ngrx/store'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'

@Component({
  selector: 'user-tasks-update',
  templateUrl: './index.component.html',
})
export class UpdateComponent implements OnInit {
  roomBooking: any
  room: any

  key: string
  roomBookingId: string

  validateForm: FormGroup

  subRoute: any = null

  saveFormError: string = null
  saveFormSuccess: boolean = null

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private roomBookingBookingsService: RoomBookingBookingsService,
    private userTasksService: UserTasksService,
    private roomsService: RoomsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges()
  }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.key = params.key
      this.roomBookingId = params.roomBookingId

      this.loadRoomBooking()
    })

    this.validateForm = this.fb.group({
      amount: [null, []],
      message: [null, []],
      evaluation: [null, [Validators.required]],
    })
  }

  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.remove()
    }
    this.subRoute = null
  }

  loadRoomBooking() {
    this.roomBookingBookingsService.view(this.roomBookingId).subscribe(data => {
      this.roomBooking = data

      this.validateForm
        .get('amount')
        .setValue(
          parseFloat(this.roomBooking.importo) + parseFloat(this.roomBooking.importoServizi),
        )

      this.loadRoom(data.roomId)
    })
  }

  loadRoom(roomId) {
    this.roomsService.view(roomId).subscribe(data => {
      this.room = data
    })
  }

  onSaveFormError(event) {
    this.saveFormError = event
  }

  submitForm(): void {
    this.saveFormError = null
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }
    this.saveTask()
  }

  async saveTask() {
    this.saveFormError = null

    const evaluation = this.validateForm.controls['evaluation'].value
    const amount = parseFloat(this.validateForm.controls['amount'].value)
    const message = this.validateForm.controls['message'].value

    try {
      const data = await this.userTasksService
        .complete(this.key, evaluation, amount, message)
        .toPromise()
      this.showSaveFormSuccess()
    } catch (error) {
      console.log('error', error)
      var errorSave = null
      if (error.error && error.error.message) {
        errorSave = error.error.message
      } else {
        errorSave = error.message
      }

      this.saveFormError = errorSave
    }
  }

  showSaveFormSuccess() {
    // console.log('onSaveFormSuccess')
    this.saveFormSuccess = true
    setTimeout(() => {
      this.router.navigate(['/user-tasks/assignee'])
    }, 1500)
  }
}
