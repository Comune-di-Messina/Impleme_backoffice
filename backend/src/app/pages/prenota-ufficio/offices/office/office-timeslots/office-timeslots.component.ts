import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'
import { TranslateService } from '@ngx-translate/core'

import { ManageOfficesService } from '../../../../../services/api/prenota-ufficio/manage-offices.service'
import { ManageOfficeTimeslotsService } from '../../../../../services/api/prenota-ufficio/manage-office-timeslots.service'
import { Office } from '../../../../../models/prenota-ufficio/office'
import {
  TimeSlot,
  TimeSlotMultiplePayload,
  TimeSlotPayload,
  DaysOfWeek,
} from '../../../../../models/prenota-ufficio/time-slot'

export interface DayTimeSlots {
  name: string
  timeSlots: TimeSlot[]
}

@Component({
  selector: 'app-office-timeslots',
  templateUrl: './office-timeslots.component.html',
  styleUrls: ['./office-timeslots.component.scss'],
})
export class OfficeTimeslotsComponent implements OnInit, OnChanges {
  @Input() municipalityId: string
  @Input() office: Office
  isLoading: boolean = false
  daysTimeSlots: DayTimeSlots[] = []
  timeSlots: TimeSlot[] = []
  orarioForm = {
    day: null,
    startTime: null,
    endTime: null,
    serviceDuration: null,
    contingency: null,
  }

  constructor(
    private msg: NzMessageService,
    private translateService: TranslateService,
    private officesService: ManageOfficesService,
    private officeTimeslotsService: ManageOfficeTimeslotsService,
  ) {}

  ngOnInit(): void {
    this.resetDays()
    this.getOfficeTimeSlots()
  }

  ngOnChanges(changes): void {
    if (changes.office) {
      this.getOfficeTimeSlots()
    }
  }

  getOfficeTimeSlots() {
    this.timeSlots = []

    if (this.office) {
      this.officeTimeslotsService
        .getTimeSlots(this.municipalityId, this.office.id)
        .subscribe(result => {
          this.timeSlots = result.filter((time, i) => {
            return time.date === null
          })

          this.populateTimeSlots()
        })
    }
  }

  populateTimeSlots() {
    this.resetDays()

    this.timeSlots.map((item, i) => {
      const result = this.daysTimeSlots.filter(obj => {
        return obj.name === item.dayOfWeek
      })

      if (result) {
        result[0].timeSlots.push(item)
      }
    })
  }

  get canAddTime(): boolean {
    if (this.isLoading) {
      return false
    }
    if (
      this.orarioForm.day &&
      this.orarioForm.startTime &&
      this.orarioForm.endTime &&
      this.orarioForm.serviceDuration &&
      this.orarioForm.contingency
    ) {
      return true
    }
    return false
  }

  onStartTimeChange(time: Date) {
    console.log(time)
  }

  addOpeningTime() {
    this.isLoading = true

    const startTime = new Date(this.orarioForm.startTime)
    const endTime = new Date(this.orarioForm.endTime)

    this.officeTimeslotsService
      .createTimeSlotMultiple(this.municipalityId, this.office.id, {
        startTime: [startTime.getHours(), startTime.getMinutes(), 0, 0],
        endTime: [endTime.getHours(), endTime.getMinutes(), 0, 0],
        days: [this.orarioForm.day],
        serviceDuration: this.orarioForm.serviceDuration,
        contingency: this.orarioForm.contingency,
      })
      .subscribe(
        result => {
          this.resetTimeForm()
          this.isLoading = false
          this.getOfficeTimeSlots()
        },
        error => {
          console.log(error)
          this.isLoading = false
          if (error?.error?.message) {
            this.msg.error(error.error.message)
          } else {
            this.msg.error('Non è stato possibile aggiungere gli orari selezionati.')
          }
        },
      )
  }

  deleteTimesAllDay(day: DayTimeSlots) {
    day.timeSlots.forEach((timeSlot, i) => {
      this.officeTimeslotsService
        .deleteTimeSlot(this.municipalityId, this.office.id, timeSlot.id)
        .subscribe(
          result => {
            this.getOfficeTimeSlots()
          },
          error => {
            console.log('deleteTimeSlot', timeSlot, error)
          },
        )
    })
  }

  enableDisableTimeSlot(timeSlot: TimeSlot, reservable: boolean) {
    const timeSlotPayload: TimeSlotPayload = {
      dayOfWeek: timeSlot.dayOfWeek,
      startTime: this.convertTimeToString(timeSlot.startTime),
      endTime: this.convertTimeToString(timeSlot.endTime),
      reservable: reservable,
    }

    this.officeTimeslotsService
      .editTimeSlot(this.municipalityId, this.office.id, timeSlot.id, timeSlotPayload)
      .subscribe(
        result => {
          this.getOfficeTimeSlots()
        },
        error => {
          if (error?.error?.message) {
            this.msg.error(error.error.message)
          } else {
            this.msg.error('Non è stato possibile modificare questo elemeto.')
          }
          console.log('editTimeSlot', timeSlot, error)
        },
      )
  }

  deleteTimeSlot(timeSlot: TimeSlot) {
    this.officeTimeslotsService
      .deleteTimeSlot(this.municipalityId, this.office.id, timeSlot.id)
      .subscribe(
        result => {
          this.getOfficeTimeSlots()
        },
        error => {
          if (error?.error?.message) {
            this.msg.error(this.translateService.instant('errors.' + error.error.message))
          } else {
            this.msg.error('Non è stato possibile eliminare questo elemeto.')
          }
          console.log('deleteTimeSlot', timeSlot, error)
        },
      )
  }

  resetDays() {
    this.daysTimeSlots = []

    Object.keys(DaysOfWeek).forEach((value, index) => {
      this.daysTimeSlots.push({
        name: value,
        timeSlots: [],
      })
    })
  }

  resetTimeForm() {
    this.orarioForm = {
      day: null,
      startTime: null,
      endTime: null,
      serviceDuration: null,
      contingency: null,
    }
  }

  convertTimeToString(time: string): number[] {
    const timeDate = time.split(':')

    return [parseInt(timeDate[0]), parseInt(timeDate[1]), 0, 0]
  }
}
