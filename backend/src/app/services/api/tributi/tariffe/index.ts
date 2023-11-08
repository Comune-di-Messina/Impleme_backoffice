import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { environment } from 'src/environments/environment'

@Injectable()
export class TariffeService {
  constructor(private http: HttpClient) {}

  index(idTributo): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(
      `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi/${idTributo}/tariffe`,
      {
        params: body,
        headers,
      },
    )
  }

  delete(idTributo, idTariffa): Observable<any> {
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
      `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi/${idTributo}/tariffe/${idTariffa}`,
      {
        headers,
      },
    )
  }

  create(model): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.post(
      `${environment.API_URL_BASE}/pagopa-tributi/v2/enti/${environment.ENTE_ID}/tributi/${model.idTributo}/tariffe/create`,
      model,
      {
        headers,
      },
    )
  }
}
