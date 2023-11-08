import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { environment } from 'src/environments/environment'
import { AuthService } from '../../auth/auth.service'

@Injectable()
export class EntiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  index(): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_URL_BASE}/pagopa-tributi/v2/enti`, {
      params: body,
      headers,
    })
  }

  view(codice: string): Observable<any> {
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
