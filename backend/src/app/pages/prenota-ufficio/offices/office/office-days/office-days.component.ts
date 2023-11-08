import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { formatDate } from '@angular/common'
import { NzMessageService } from 'ng-zorro-antd/message'
import { TranslateService } from '@ngx-translate/core'
import * as Formatter from 'src/app/utils/formatters'
import { eachMinuteOfInterval, isBefore, isEqual, format, addHours, subHours } from 'date-fns'

import { ManageOfficesService } from '../../../../../services/api/prenota-ufficio/manage-offices.service'
import { ManageOfficeTimeslotsService } from '../../../../../services/api/prenota-ufficio/manage-office-timeslots.service'
import { Office } from '../../../../../models/prenota-ufficio/office'
import {
  TimeSlot,
  TimeSlotMultiplePayload,
  TimeSlotPayload,
  DaysOfWeek,
} from '../../../../../models/prenota-ufficio/time-slot'

@Component({
  selector: 'app-office-days',
  templateUrl: './office-days.component.html',
  styleUrls: ['./office-days.component.scss'],
})
export class OfficeDaysComponent implements OnInit, OnChanges {
  @Input() municipalityId: string
  @Input() office: Office
  isLoading: boolean = false
  timeSlots: TimeSlot[] = []
  itemsInPage: TimeSlot[] = []
  dateForm = {
    date: null,
    startTime: null,
    endTime: null,
    serviceDuration: null,
    contingency: null,
    reservable: false,
  }

  dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

  constructor(
    private msg: NzMessageService,
    private translateService: TranslateService,
    private officesService: ManageOfficesService,
    private officeTimeslotsService: ManageOfficeTimeslotsService,
  ) {}

  ngOnInit(): void {
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
            return time.date !== null
          })

          this.itemsInPage = this.timeSlots

          console.log(this.timeSlots, 'this.timeSlots')
        })
    }
  }

  onCurrentPageDataChange(itemsInPage) {
    this.itemsInPage = itemsInPage
  }

  getDateTime(timeSlot: TimeSlot): string {
    return Formatter.asDate(timeSlot.date)
  }

  sortByDate(a: TimeSlot, b: TimeSlot) {
    const dateTimeFirst = Formatter.asTimestamp(a.date + (a.startTime ? ' ' + a.startTime : ''))
    const dateTimeSecond = Formatter.asTimestamp(b.date + (b.startTime ? ' ' + b.startTime : ''))

    return dateTimeFirst.toString().localeCompare(dateTimeSecond.toString())
  }

  get canAddTime(): boolean {
    if (this.isLoading) {
      return false
    }
    if (
      this.dateForm.reservable &&
      (!this.dateForm.serviceDuration || !this.dateForm.contingency)
    ) {
      return false
    }
    if (this.dateForm.date && this.dateForm.startTime && this.dateForm.endTime) {
      return true
    }
    return false
  }

  addDateTime() {
    if (this.dateForm.reservable) {
      this.addDateTimeMultiple()
    } else {
      this.addDateTimeSingle()
    }
  }

  async addDateTimeMultiple() {
    this.isLoading = true

    const date = new Date(this.dateForm.date)
    const startTime = new Date(this.dateForm.startTime)
    const endTime = new Date(this.dateForm.endTime)
    const step = parseInt(this.dateForm.contingency) + parseInt(this.dateForm.serviceDuration)

    startTime.setSeconds(0)
    startTime.setMilliseconds(0)
    endTime.setSeconds(0)
    endTime.setMilliseconds(0)

    if (!isBefore(startTime, endTime) || isEqual(startTime, endTime)) {
      this.isLoading = false
      return
    }

    const results = eachMinuteOfInterval(
      {
        start: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDay(),
          startTime.getHours(),
          startTime.getMinutes(),
          0,
          0,
        ),
        end: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDay(),
          endTime.getHours(),
          endTime.getMinutes(),
          0,
          0,
        ),
      },
      { step: step },
    )

    results.map(async (item, i) => {
      if (!results[i + 1]) {
        return
      }

      const start = item
      const end = results[i + 1]

      const timeSlotPayload: TimeSlotPayload = {
        dayOfWeek: DaysOfWeek[this.dayNames[date.getDay()]],
        startTime: [start.getHours(), start.getMinutes(), 1, 0],
        endTime: [end.getHours(), end.getMinutes(), 0, 0],
        date: formatDate(this.dateForm.date, 'yyyy-MM-dd', 'en_US'),
        reservable: this.dateForm.reservable,
      }

      try {
        await this.officeTimeslotsService
          .createTimeSlot(this.municipalityId, this.office.id, timeSlotPayload)
          .toPromise()
      } catch (error) {
        console.log(error)
      }

      if (i === results.length - 2) {
        this.getOfficeTimeSlots()
      }
    })

    this.resetTimeForm()
    this.isLoading = false
  }

  addDateTimeSingle() {
    this.isLoading = true

    const date = new Date(this.dateForm.date)
    const startTime = new Date(this.dateForm.startTime)
    const endTime = new Date(this.dateForm.endTime)

    const timeSlotPayload: TimeSlotPayload = {
      dayOfWeek: DaysOfWeek[this.dayNames[date.getDay()]],
      startTime: [startTime.getHours(), startTime.getMinutes(), 0, 0],
      endTime: [endTime.getHours(), endTime.getMinutes(), 0, 0],
      date: formatDate(this.dateForm.date, 'yyyy-MM-dd', 'en_US'),
      reservable: this.dateForm.reservable,
    }

    this.officeTimeslotsService
      .createTimeSlot(this.municipalityId, this.office.id, timeSlotPayload)
      .subscribe(
        result => {
          console.log(result)
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

  deleteDate(timeSlot: TimeSlot) {
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

  resetTimeForm() {
    this.dateForm = {
      date: null,
      startTime: null,
      endTime: null,
      serviceDuration: null,
      contingency: null,
      reservable: false,
    }
  }
}
