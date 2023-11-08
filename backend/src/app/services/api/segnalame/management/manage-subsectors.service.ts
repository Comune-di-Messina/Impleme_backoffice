import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { Subsector } from '../../../../models/segnalame/sector'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageSubsectorsService {
  constructor(private http: HttpClient) {}

  getSubsectors(
    page: number = 0,
    size: number = 15,
    sort: string = 'asc',
  ): Observable<Subsector[]> {
    return this.http.get<Subsector[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors?page=${page}&size=${size}&sort=${sort}`,
      { headers: { authRequest: '' } },
    )
  }

  searchSubsectors(params: HttpParams | QueryParams): Observable<Subsector[]> {
    return this.http.get<Subsector[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors/search`,
      {
        headers: { authRequest: '' },
        params: params,
      },
    )
  }

  createSubsector(subsector: Subsector): Observable<Subsector> {
    return this.http.post<Subsector>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors`,
      subsector,
      { headers: { authRequest: '' } },
    )
  }

  editSubsector(subsector: any): Observable<Subsector> {
    return this.http.put<Subsector>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors`,
      subsector,
      { headers: { authRequest: '' } },
    )
  }

  getSubsector(subsectorId: number): Observable<Subsector> {
    return this.http.get<Subsector>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors/${subsectorId}`,
      { headers: { authRequest: '' } },
    )
  }

  deleteSubsector(subsectorId: number): Observable<any> {
    return this.http.delete(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors/${subsectorId}`,
      { headers: { authRequest: '' } },
    )
  }

  enableSubsector(subsectorId: number): Observable<Subsector> {
    return this.http.patch<Subsector>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors/${subsectorId}/enable`,
      null,
      { headers: { authRequest: '' } },
    )
  }

  diableSubsector(subsectorId: number): Observable<Subsector> {
    return this.http.patch<Subsector>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sub-sectors/${subsectorId}/disable`,
      null,
      { headers: { authRequest: '' } },
    )
  }
}
