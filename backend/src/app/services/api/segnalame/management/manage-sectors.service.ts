import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { Sector, ImageModel } from '../../../../models/segnalame/sector'
import { User } from '../../../../models/segnalame/user'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageSectorsService {
  constructor(private http: HttpClient) {}

  getSectors(page: number = 0, size: number = 15, sort: string = 'asc'): Observable<Sector[]> {
    return this.http
      .get<Sector[]>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors?page=${page}&size=${size}&sort=${sort}`,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(sectors => {
          return sectors.map(sector => {
            return ManageSectorsService.modifySector(sector)
          })
        }),
      )
  }

  searchSectors(params: HttpParams | QueryParams): Observable<Sector[]> {
    return this.http
      .get<Sector[]>(`${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/search`, {
        headers: { authRequest: '' },
        params: params,
      })
      .pipe(
        map(sectors => {
          return sectors.map(sector => {
            return ManageSectorsService.modifySector(sector)
          })
        }),
      )
  }

  createSector(sector: any): Observable<Sector> {
    return this.http
      .post<Sector>(`${environment.API_SEGNALAME_URL_BASE}/api/management/sectors`, sector, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  editSector(sector: any): Observable<Sector> {
    return this.http
      .put<Sector>(`${environment.API_SEGNALAME_URL_BASE}/api/management/sectors`, sector, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  getSector(sectorId: number): Observable<Sector> {
    return this.http
      .get<Sector>(`${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}`, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  deleteSector(sectorId: number): Observable<any> {
    return this.http.delete(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}`,
      { headers: { authRequest: '' } },
    )
  }

  enableSector(sectorId: number): Observable<Sector> {
    return this.http
      .patch<Sector>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/enable`,
        null,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  disableSector(sectorId: number): Observable<Sector> {
    return this.http
      .patch<Sector>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/disable`,
        null,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  getAssignedUsers(sectorId: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/users`,
      { headers: { authRequest: '' } },
    )
  }

  assignUsers(sectorId: number, users: number[]): Observable<Sector> {
    return this.http
      .patch<Sector>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/assign-users`,
        users,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  removeUsers(sectorId: number, users: number[]): Observable<Sector> {
    return this.http
      .patch<Sector>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/remove-users`,
        users,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(sector => {
          return ManageSectorsService.modifySector(sector)
        }),
      )
  }

  uploadIcon(sectorId: number, file: File): Observable<ImageModel> {
    const formData: FormData = new FormData()
    formData.append('file', file)

    return this.http.post<ImageModel>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/icon/upload`,
      formData,
      { headers: { authRequest: '' } },
    )
  }

  uploadImage(sectorId: number, file: File): Observable<ImageModel> {
    const formData: FormData = new FormData()
    formData.append('file', file)

    return this.http.post<ImageModel>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/sectors/${sectorId}/image/upload`,
      formData,
      { headers: { authRequest: '' } },
    )
  }

  static modifySector(sector: Sector) {
    sector.iconPath = sector.iconPath ? environment.API_SEGNALAME_URL_BASE + sector.iconPath : null
    sector.imagePath = sector.imagePath
      ? environment.API_SEGNALAME_URL_BASE + sector.imagePath
      : null
    return sector
  }
}
