import { Component, OnInit } from '@angular/core'
import { formatDate } from '@angular/common'
import * as DateFns from 'date-fns'
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
  NzTableQueryParams,
} from 'ng-zorro-antd/table'
import * as Formatter from 'src/app/utils/formatters'
import { EntiService } from '../../../../services/api/enti/index'
import { Institute } from '../../../../models/institute'
import { ManageReservationsService } from '../../../../services/api/prenota-ufficio/manage-reservations.service'
import {
  Reservation,
  ReservationStatus,
  ReservationSearchParameters,
} from '../../../../models/prenota-ufficio/reservation'

import { ReservationIdPipe } from '../../../../pipes/reservation-id.pipe'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  providers: [ReservationIdPipe],
})
export class ReservationsComponent implements OnInit {
  institutes: Institute[]
  reservations: Reservation[] = []
  itemsInPage: Reservation[] = []
  loadingResults = false
  totalResults = 0
  pageSize = 10
  pageIndex = 1
  listOfColumns = []

  searchForm = {
    id: null,
    office: null,
    status: null,
    dateRange: null,
  }

  searchFiltersVisible = {
    id: false,
    office: false,
    status: false,
    dateRange: false,
  }

  constructor(
    private reservationsService: ManageReservationsService,
    private entiService: EntiService,
    private reservationIdPipe: ReservationIdPipe,
  ) {}

  ngOnInit(): void {
    this.setInitialDateRange()
    this.getInstitutes()
    this.getReservations()
  }

  setInitialDateRange() {
    this.searchForm.dateRange = [DateFns.subDays(new Date(), 1), DateFns.addMonths(new Date(), 1)]
  }

  get officesFilters() {
    return Array.from(
      this.reservations
        .map(x => {
          return { text: x.office.name, value: x.office.name }
        })
        .reduce((m, t) => m.set(t.value, t), new Map())
        .values(),
    )
  }

  get statusesFilters() {
    return Array.from(
      this.reservations
        .map(x => {
          return { text: x.status, value: x.status }
        })
        .reduce((m, t) => m.set(t.value, t), new Map())
        .values(),
    )
  }

  getInstitutes() {
    this.entiService.index().subscribe(result => {
      this.institutes = result
    })
  }

  async getReservations() {
    const dateStart =
      this.searchForm.dateRange && this.searchForm.dateRange.length
        ? formatDate(this.searchForm.dateRange[0], 'yyyy-MM-dd', 'en-GB')
        : null
    const dateEnd =
      this.searchForm.dateRange && this.searchForm.dateRange.length
        ? formatDate(this.searchForm.dateRange[1], 'yyyy-MM-dd', 'en-GB')
        : null

    const params: ReservationSearchParameters = {
      municipalityId: environment.ENTE_ID,
      startDate: dateStart,
      endDate: dateEnd,
    }

    this.pageIndex = 1

    this.reservations = await this.reservationsService.getReservations(params).toPromise()
    this.search()
  }

  getInstituteByCode(code: string): Institute {
    if (!this.institutes?.length) return null

    return this.institutes.find((item, i) => {
      return item.codice === code
    })
  }

  getDateTime(reservation: Reservation): string {
    const dateTime = reservation.date + (reservation.startTime ? ' ' + reservation.startTime : '')
    return Formatter.asDateTime(dateTime)
  }

  onCurrentPageDataChange(itemsInPage) {
    // this.itemsInPage = itemsInPage
  }

  onCurrentPageChange(e: number) {
    this.pageIndex = e
  }

  getActiveStatus(reservation: Reservation): string {
    switch (reservation.status) {
      case ReservationStatus.RICHIESTA:
        return 'Richiesta'
      case ReservationStatus.CONFIRMED:
        return 'Confermata'
      case ReservationStatus.CONFERMATA:
        return 'Confermata'
      case ReservationStatus.ESEGUITA:
        return 'Eseguita'
      case ReservationStatus.CANCELLATA:
        return 'Cancellata'
      case ReservationStatus.REVOCATA:
        return 'Revocata'

      default:
        return ''
    }
  }

  getStatusColor(reservation: Reservation): string {
    switch (reservation.status) {
      case ReservationStatus.RICHIESTA:
        return 'blue'
      case ReservationStatus.CONFIRMED:
        return 'cyan'
      case ReservationStatus.CONFERMATA:
        return 'cyan'
      case ReservationStatus.ESEGUITA:
        return 'green'
      case ReservationStatus.CANCELLATA:
        return 'red'
      case ReservationStatus.REVOCATA:
        return 'volcano'

      default:
        return 'blue'
    }
  }

  sortByDate(a: Reservation, b: Reservation) {
    const dateTimeFirst = Formatter.asTimestamp(a.date + (a.startTime ? ' ' + a.startTime : ''))
    const dateTimeSecond = Formatter.asTimestamp(b.date + (b.startTime ? ' ' + b.startTime : ''))

    return dateTimeFirst.toString().localeCompare(dateTimeSecond.toString())
  }

  sortById(a: Reservation, b: Reservation) {
    const firstEl = ReservationIdPipe.prototype.transform(a.id)
    const secondEl = ReservationIdPipe.prototype.transform(b.id)

    return firstEl.localeCompare(secondEl)
  }

  onDateChange(result: Date[]): void {
    // console.log('onChange: ', result)
    console.log(this.searchForm.dateRange, 'onDateChange')
  }

  resetSearchByDate() {
    this.resetSearch('dateRange')
    this.getReservations()
  }

  resetSearch(value?: string): void {
    if (value) {
      this.searchForm[value] = null
    } else {
      this.searchForm = {
        id: null,
        office: null,
        status: null,
        dateRange: null,
      }
      this.setInitialDateRange()
    }

    this.getReservations()
  }

  search(): void {
    this.itemsInPage = this.reservations

    this.searchFiltersVisible = {
      id: false,
      office: false,
      status: false,
      dateRange: false,
    }

    if (this.searchForm.id) {
      this.itemsInPage = this.itemsInPage.filter((reservation: Reservation) => {
        const idFormatted = this.reservationIdPipe.transform(reservation.id)
        return idFormatted.indexOf(this.searchForm.id) !== -1
      })
    }

    if (this.searchForm.office) {
      this.itemsInPage = this.itemsInPage.filter((reservation: Reservation) => {
        return reservation.office.name === this.searchForm.office
      })
    }

    if (this.searchForm.status) {
      this.itemsInPage = this.itemsInPage.filter((reservation: Reservation) => {
        return reservation.status === this.searchForm.status
      })
    }
  }
}
