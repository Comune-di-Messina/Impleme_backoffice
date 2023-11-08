import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

import * as Formatter from 'src/app/utils/formatters'
import { ManageReservationsService } from '../../../../services/api/prenota-ufficio/manage-reservations.service'
import {
  Reservation,
  ReservationPayload,
  ReservationStatus,
} from '../../../../models/prenota-ufficio/reservation'

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  reservation: Reservation
  cardTitle: string

  constructor(
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private reservationsService: ManageReservationsService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { reservation: Reservation }) => {
      this.reservation = data.reservation
      this.cardTitle = Formatter.asDate(this.reservation.date)
      console.log(this.reservation, 'this.reservation')
    })
  }

  changeReservationStatus(status: ReservationStatus) {
    this.reservationsService
      .editReservation(this.reservation.id, { status: status })
      .subscribe(result => {
        this.reservation = result
        console.log(result, status, 'changeReservationStatus')
        this.msg.success('Prenotazione modificata con successo')
      })
  }

  get reservationDate(): string {
    const dateTime =
      this.reservation.date + (this.reservation.startTime ? ' ' + this.reservation.startTime : '')
    return Formatter.asDateTime(dateTime)
  }

  get availableActions(): string[] {
    switch (this.reservation.status) {
      case 'RICHIESTA':
        // RICHIESTA
        return ['CONFIRMED', 'REVOCATA']
      case 'CONFIRMED':
        // CONFIRMED
        return ['ESEGUITA', 'REVOCATA']
      case 'ESEGUITA':
        // ESEGUITA
        return []
      case 'CANCELLATA':
        // CANCELLATA
        return []
      case 'REVOCATA':
        // REVOCATA
        return []
      default:
        break
    }
    return []
  }

  getDate(date: string) {
    return Formatter.asDate(date)
  }

  getStatusEnabled(status: ReservationStatus): boolean {
    switch (status) {
      case ReservationStatus.RICHIESTA:
        return (
          this.reservation.status === ReservationStatus.ESEGUITA ||
          this.reservation.status === ReservationStatus.CANCELLATA
        )
        return false
      case ReservationStatus.CONFIRMED:
        return this.reservation.status === ReservationStatus.RICHIESTA
      case ReservationStatus.CONFERMATA:
        return this.reservation.status === ReservationStatus.RICHIESTA
      case ReservationStatus.ESEGUITA:
        return this.reservation.status === ReservationStatus.CONFIRMED
      case ReservationStatus.CANCELLATA:
        return this.reservation.status === ReservationStatus.RICHIESTA
      case ReservationStatus.REVOCATA:
        return false

      default:
        return false
    }
  }

  get getActiveStatus(): string {
    switch (this.reservation.status) {
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

  get getStatusColor(): string {
    switch (this.reservation.status) {
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
}
