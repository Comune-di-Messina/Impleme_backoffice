import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { Reporting, ReportingStatus, ReportingFile } from '../../../../models/segnalame/reporting'

export interface QueryParams {
  [key: string]: string | string[]
}

@Injectable({
  providedIn: 'root',
})
export class ManageReportingsService {
  constructor(private http: HttpClient) {}

  getList(): Observable<Reporting[]> {
    return this.http
      .get<Reporting[]>(`${environment.API_SEGNALAME_URL_BASE}/api/management/reportings`, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(reportings => {
          return reportings.map(reporting => {
            return ManageReportingsService.modifyReporting(reporting)
          })
        }),
      )
  }

  searchReportings(params: HttpParams | QueryParams): Observable<HttpResponse<Reporting[]>> {
    return this.http.get<Reporting[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/search`,
      {
        observe: 'response',
        params: params,
        headers: { authRequest: '' },
      },
    )
  }

  // Reporting
  getReporting(reportingId: number): Observable<Reporting> {
    return this.http
      .get<Reporting>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${reportingId}`,
        { headers: { authRequest: '' } },
      )
      .pipe(
        map(reporting => {
          return ManageReportingsService.modifyReporting(reporting)
        }),
      )
  }

  editReporting(model: Reporting): Observable<Reporting> {
    return this.http
      .put<Reporting>(`${environment.API_SEGNALAME_URL_BASE}/api/management/reportings`, model, {
        headers: { authRequest: '' },
      })
      .pipe(
        map(reporting => {
          return ManageReportingsService.modifyReporting(reporting)
        }),
      )
  }

  acceptReporting(reportingId: number, notePrivate: string = null): Observable<Reporting> {
    return this.http
      .put<Reporting>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${reportingId}/accept`,
        null,
        {
          headers: { authRequest: '' },
          params: {
            notePrivate: notePrivate,
          },
        },
      )
      .pipe(
        map(reporting => {
          return ManageReportingsService.modifyReporting(reporting)
        }),
      )
  }

  refuseReporting(reportingId: number, notePublic: string = null): Observable<Reporting> {
    return this.http
      .put<Reporting>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${reportingId}/refuse`,
        null,
        {
          headers: { authRequest: '' },
          params: {
            notePublic: notePublic,
          },
        },
      )
      .pipe(
        map(reporting => {
          return ManageReportingsService.modifyReporting(reporting)
        }),
      )
  }

  closeReporting(
    reportingId: number,
    statusId: number,
    notePublic: string = null,
  ): Observable<Reporting> {
    return this.http
      .put<Reporting>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${reportingId}/close`,
        null,
        {
          headers: { authRequest: '' },
          params: {
            id: String(reportingId),
            idStatus: String(statusId),
            notePublic: notePublic,
          },
        },
      )
      .pipe(
        map(reporting => {
          return ManageReportingsService.modifyReporting(reporting)
        }),
      )
  }

  assignUser(reportingId: number, userId: number, note: string = null): Observable<Reporting> {
    return this.http
      .put<Reporting>(
        `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${reportingId}/assign`,
        null,
        {
          headers: { authRequest: '' },
          params: {
            idUser: String(userId),
            note: note,
          },
        },
      )
      .pipe(
        map(reporting => {
          return ManageReportingsService.modifyReporting(reporting)
        }),
      )
  }

  // Statuses
  getAllActiveStatuses(): Observable<ReportingStatus[]> {
    return this.http.get<ReportingStatus[]>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/statuses`,
      { headers: { authRequest: '' } },
    )
  }

  // Files
  getFile(instituteId: number, uuid: string): Observable<ReportingFile> {
    return this.http.get<ReportingFile>(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${instituteId}/files/${uuid}/content`,
      { headers: { authRequest: '' } },
    )
  }

  deleteFile(instituteId: number, uuid: string): Observable<any> {
    return this.http.delete(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${instituteId}/files/${uuid}/delete`,
      { headers: { authRequest: '' } },
    )
  }

  // Notification
  sendNotification(reportingId: number): Observable<any> {
    return this.http.get(
      `${environment.API_SEGNALAME_URL_BASE}/api/management/reportings/${reportingId}/sendNotification`,
      { headers: { authRequest: '' } },
    )
  }

  // DownloadFile
  downloadFile(url: string) {
    return this.http.get(`${url}`, { headers: { authRequest: '' }, responseType: 'blob' })
  }

  static modifyReporting(reporting: Reporting): Reporting {
    if (reporting.filePathList) {
      reporting.filePathList = reporting.filePathList.map(result => {
        return `${environment.API_SEGNALAME_URL_BASE}${result}`
      })
    }

    if (reporting.filesDTO) {
      reporting.filesDTO = reporting.filesDTO.map(file => {
        file.path = `${environment.API_SEGNALAME_URL_BASE}${file.path}`
        return file
      })
    }

    return reporting
  }
}
