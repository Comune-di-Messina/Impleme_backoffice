import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable()
export class MunicipalitiesService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_URL_BASE}/pagopa-tributi/v2/enti`, {
      params: body,
      headers,
    })
  }

  details(codice: string): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${codice}`, {
      params: body,
      headers,
    })
  }

  tributi(codice: string): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${codice}/tributi`, {
      params: body,
      headers,
    })
  }
}
