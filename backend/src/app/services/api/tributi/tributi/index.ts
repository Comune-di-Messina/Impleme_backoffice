import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'

@Injectable()
export class TributiService {
  constructor(private http: HttpClient) {}

  index(): Observable<any> {
    const body = new HttpParams()
    /*
      .set('grant_type', 'password')
      .set('scope', 'openid profile')
      .set('response_type', 'id_token token')
      .set('username', username)
      .set('password', password)
      */
    const headers = { authRequest: '' }
    return this.http.get(
      `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi`,
      {
        params: body,
        headers,
      },
    )
  }

  delete(id): Observable<any> {
    const body = new HttpParams()
    /*
      .set('grant_type', 'password')
      .set('scope', 'openid profile')
      .set('response_type', 'id_token token')
      .set('username', username)
      .set('password', password)
      */
    const headers = { authRequest: '' }
    return this.http.delete(
      `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi/${id}`,
      {
        headers,
      },
    )
  }

  create(model): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.post(
      `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi/create`,
      model,
      {
        headers,
      },
    )
  }

  downloadCSV(): Observable<any> {
    const headers = { authRequest: '' }
    headers['accept'] = 'text/csv'
    headers['content-type'] = 'text/csv'

    return this.http
      .get(
        `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi/csv`,
        {
          headers,
          responseType: 'arraybuffer',
        },
      )
      .pipe(
        map((file: ArrayBuffer) => {
          return file
        }),
      )
  }
}
