import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import {
  Reservation,
  ReservationPayload,
  ReservationSearchParameters,
} from '../../../models/prenota-ufficio/reservation'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageReservationsService {
  constructor(private http: HttpClient) {}

  getReservations(searchParams?: ReservationSearchParameters): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/reservation`,
      {
        params: searchParams ? this.sanitazeQueryParams(searchParams) : null,
      },
    )
  }

  getReservation(reservationId: string): Observable<Reservation> {
    return this.http.get<Reservation>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/reservation/${reservationId}`,
      {
        headers: { authRequest: '' },
      },
    )
  }

  createReservation(model: ReservationPayload): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/reservation`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  editReservation(reservationId: string, model: ReservationPayload): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/reservation/${reservationId}`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  private sanitazeQueryParams(params: any): QueryParams {
    return Object.keys(params).reduce((acc, item) => {
      if (params[item] === null || params[item] === undefined) {
        return acc
      }

      return {
        ...acc,
        [item]: String(params[item]),
      }
    }, {})
  }
}
