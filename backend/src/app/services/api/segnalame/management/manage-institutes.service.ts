import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { ManageSectorsService } from './manage-sectors.service'
import { Institute, InstituteSearchParameters } from '../../../../models/segnalame/institute'
import { Sector, Subsector } from '../../../../models/segnalame/sector'

export interface QueryParams {
  [key: string]: string | string[]
}

export interface AvailableCities {
  cities: string[]
}

export enum WebhookActions {
  create = 'create',
  update = 'update',
  delete = 'delete',
}

@Injectable({
  providedIn: 'root',
})
export class ManageInstitutesService {
  constructor(private http: HttpClient) {}

  getAvailableInstituteNames(): Observable<AvailableCities> {
    return this.http.get<AvailableCities>(`${environment.API_URL_BASE}/public/api/v1/cities/list`, {
      headers: { authRequest: '' },
    })
  }

  getList(): Observable<Institute[]> {
    return this.http.get<Institute[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes`,
      { headers: { authRequest: '' } },
    )
  }

  searchInstitutes(searchParams: InstituteSearchParameters): Observable<Institute[]> {
    return this.http.get<Institute[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/search`,
      {
        headers: { authRequest: '' },
        params: this.sanitazeQueryParams(searchParams),
      },
    )
  }

  createInstitute(model: Institute): Observable<Institute> {
    return this.http.post<Institute>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  editInstitute(model: Institute): Observable<Institute> {
    return this.http.put<Institute>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes`,
      model,
      {
        headers: { authRequest: '' },
      },
    )
  }

  // Institute
  getInstitute(instituteId: number): Observable<Institute> {
    return this.http.get<Institute>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}`,
      { headers: { authRequest: '' } },
    )
  }

  deleteInstitute(instituteId: number): Observable<any> {
    return this.http.delete(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}`,
      {
        headers: { authRequest: '' },
      },
    )
  }

  enableInstitute(instituteId: number): Observable<any> {
    return this.http.patch(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/enable`,
      null,
      { headers: { authRequest: '' } },
    )
  }

  disableInstitute(instituteId: number): Observable<any> {
    return this.http.patch(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/disable`,
      null,
      { headers: { authRequest: '' } },
    )
  }

  associateSectors(instituteId: number, sectors: number[]): Observable<any> {
    return this.http
      .patch(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/associate-sectors`,
        sectors,
        { headers: { authRequest: '' } },
      )
      .pipe(
        tap(response => {
          this.sendWebhookInstitute(instituteId, WebhookActions.create).toPromise()
        }),
      )
  }

  disassociateSectors(instituteId: number, sectors: number[]): Observable<any> {
    return this.http
      .patch(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/disassociate-sectors`,
        sectors,
        { headers: { authRequest: '' } },
      )
      .pipe(
        tap(response => {
          this.sendWebhookInstitute(instituteId, WebhookActions.delete).toPromise()
        }),
      )
  }

  // Institute Sectors
  getInstituteSectorsList(instituteId: number): Observable<Sector[]> {
    return this.http
      .get<Sector[]>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/sectors`,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(sectors => {
          sectors.map(sector => {
            return ManageSectorsService.modifySector(sector)
          })
          return sectors
        }),
      )
  }

  // Institute Subsectors
  getInstituteSubsectorsList(instituteId: number, sectorId: number): Observable<Subsector[]> {
    return this.http.get<Subsector[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/sectors/${sectorId}/sub-sectors`,
      { headers: { authRequest: '' } },
    )
  }

  associateSubsectors(
    instituteId: number,
    sectorId: number,
    subsectors: number[],
  ): Observable<any> {
    return this.http
      .patch(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/sectors/${sectorId}/associate-sub-sectors`,
        subsectors,
        { headers: { authRequest: '' } },
      )
      .pipe(
        tap(response => {
          this.sendWebhookInstitute(instituteId, WebhookActions.update).toPromise()
        }),
      )
  }

  disassociateSubsectors(
    instituteId: number,
    sectorId: number,
    subsectors: number[],
  ): Observable<any> {
    return this.http
      .patch(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/institutes/${instituteId}/sectors/${sectorId}/disassociate-sub-sectors`,
        subsectors,
        { headers: { authRequest: '' } },
      )
      .pipe(
        tap(response => {
          this.sendWebhookInstitute(instituteId, WebhookActions.update).toPromise()
        }),
      )
  }

  sendWebhookInstitute(instituteId: number, action: WebhookActions) {
    return this.http.get(
      `${environment.API_SEGNALAME_URL_DRUPAL}/segnalame/crud/${instituteId}/${action}`,
      {
        headers: {
          'x-pdm-token': environment.API_SEGNALAME_AUTH_DRUPAL,
        },
      },
    )
  }

  private sanitazeQueryParams(params: any): QueryParams {
    return Object.keys(params).reduce((acc, item) => {
      if (params[item] === null) {
        return acc
      }

      return {
        ...acc,
        [item]: String(params[item]),
      }
    }, {})
  }
}
