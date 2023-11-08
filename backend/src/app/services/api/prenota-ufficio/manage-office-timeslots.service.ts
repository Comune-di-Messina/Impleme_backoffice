import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import {
  TimeSlot,
  TimeSlotPayload,
  TimeSlotMultiplePayload,
} from '../../../models/prenota-ufficio/time-slot'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageOfficeTimeslotsService {
  constructor(private http: HttpClient) {}

  getTimeSlots(municipalityId: string, officeId: string): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/timeslots`,
    )
  }

  getTimeSlot(municipalityId: string, officeId: string, timeSlotId: string): Observable<TimeSlot> {
    return this.http.get<TimeSlot>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/timeslots/${timeSlotId}`,
    )
  }

  createTimeSlot(
    municipalityId: string,
    officeId: string,
    model: TimeSlotPayload,
  ): Observable<TimeSlot> {
    return this.http.post<TimeSlot>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/timeslots`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  createTimeSlotMultiple(
    municipalityId: string,
    officeId: string,
    model: TimeSlotMultiplePayload,
  ): Observable<TimeSlot[]> {
    return this.http.post<TimeSlot[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/timeslots/multiple`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  editTimeSlot(
    municipalityId: string,
    officeId: string,
    timeSlotId: string,
    model: TimeSlotPayload,
  ): Observable<TimeSlot> {
    return this.http.patch<TimeSlot>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/timeslots/${timeSlotId}`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  deleteTimeSlot(municipalityId: string, officeId: string, timeSlotId: string): Observable<any> {
    return this.http.delete(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/timeslots/${timeSlotId}`,
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
