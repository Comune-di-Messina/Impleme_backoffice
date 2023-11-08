import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import {
  PublicService,
  PublicServicePayload,
  PublicServiceSearchParameters,
} from '../../../models/prenota-ufficio/public-service'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManagePublicServicesService {
  constructor(private http: HttpClient) {}

  getPublicServices(searchParams?: PublicServiceSearchParameters): Observable<PublicService[]> {
    return this.http.get<PublicService[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/publicservice`,
      {
        params: searchParams ? this.sanitazeQueryParams(searchParams) : null,
      },
    )
  }

  getPublicService(serviceId: string): Observable<PublicService> {
    return this.http.get<PublicService>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/publicservice/${serviceId}`,
    )
  }

  createPublicService(model: PublicServicePayload): Observable<PublicService> {
    return this.http.post<PublicService>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/publicservice`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  editPublicService(serviceId: string, model: PublicServicePayload): Observable<PublicService> {
    return this.http.put<PublicService>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/publicservice/${serviceId}`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  deletePublicService(serviceId: string): Observable<any> {
    return this.http.delete(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/publicservice/${serviceId}`,
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
