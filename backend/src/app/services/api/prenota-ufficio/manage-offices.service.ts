import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import {
  Office,
  OfficePayload,
  OfficesSearchParameters,
} from '../../../models/prenota-ufficio/office'
import { Counter, CounterPayload } from '../../../models/prenota-ufficio/counter'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageOfficesService {
  constructor(private http: HttpClient) {}

  getOffices(searchParams: OfficesSearchParameters): Observable<Office[]> {
    return this.http.get<Office[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${searchParams.municipalityId}/office`,
      {
        params: searchParams ? this.sanitazeQueryParams(searchParams) : null,
      },
    )
  }

  getOffice(municipalityId: string, officeId: string): Observable<Office> {
    return this.http.get<Office>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}`,
    )
  }

  createOffice(municipalityId: string, model: OfficePayload): Observable<Office> {
    return this.http.post<Office>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  editOffice(municipalityId: string, officeId: string, model: OfficePayload): Observable<Office> {
    return this.http.put<Office>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  deleteOffice(municipalityId: string, officeId: string): Observable<any> {
    return this.http.delete(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}`,
      {
        headers: { authRequest: '' },
      },
    )
  }

  // Office Counter
  getOfficeCounters(municipalityId: string, officeId: string): Observable<Counter[]> {
    return this.http.get<Counter[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/counter`,
    )
  }

  getOfficeCounter(
    municipalityId: string,
    officeId: string,
    counterId: string,
  ): Observable<Counter[]> {
    return this.http.get<Counter[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/counter/${counterId}`,
    )
  }

  createOfficeCounter(
    municipalityId: string,
    officeId: string,
    model: CounterPayload,
  ): Observable<Counter> {
    return this.http.post<Counter>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/counter`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  editOfficeCounter(
    municipalityId: string,
    officeId: string,
    counterId: string,
    model: CounterPayload,
  ): Observable<Counter> {
    return this.http.patch<Counter>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/counter/${counterId}`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  deleteOfficeCounter(
    municipalityId: string,
    officeId: string,
    counterId: string,
  ): Observable<any> {
    return this.http.delete(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/municipality/${municipalityId}/office/${officeId}/counter/${counterId}`,
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
