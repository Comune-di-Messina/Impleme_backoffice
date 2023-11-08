import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { ServiceType } from '../../../models/prenota-ufficio/service-type'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageServiceTypesService {
  constructor(private http: HttpClient) {}

  getServiceTypes(municipalityId?: string): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/serviceTypes`,
      {
        params: this.sanitazeQueryParams({ municipalityId: municipalityId }),
      },
    )
  }

  getServiceType(serviceTypeId: string): Observable<ServiceType> {
    return this.http.get<ServiceType>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/serviceTypes/${serviceTypeId}`,
    )
  }

  createServiceType(name: string): Observable<ServiceType> {
    return this.http.post<ServiceType>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/serviceTypes`,
      {
        name: name,
      },
      {
        headers: { authRequest: '' },
      },
    )
  }

  editServiceType(serviceTypeId: string, name: string): Observable<ServiceType> {
    return this.http.put<ServiceType>(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/serviceTypes/${serviceTypeId}`,
      {
        name: name,
      },
      {
        headers: { authRequest: '' },
      },
    )
  }

  deleteServiceType(serviceTypeId: string): Observable<any> {
    return this.http.delete(
      `${environment.API_PRENOTAUFFICIO_URL_BASE}/v1/serviceTypes/${serviceTypeId}`,
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
