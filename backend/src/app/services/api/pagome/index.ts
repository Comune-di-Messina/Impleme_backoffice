import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { AuthService } from '../../auth/auth.service'

@Injectable()
export class PagomeService {
  constructor(private http: HttpClient) {}

  getReportPagamento(
    ente: string,
    idTributo: string,
    dataInizio: string,
    dataFine: string,
  ): Observable<any> {
    let body = new HttpParams({
      fromObject: {
        ente,
        idTributo,
        dataInizio,
        dataFine,
      },
    })
    const headers = {
      authRequest: '',
      accept: 'text/csv',
      // contentType: 'text/csv',
    }
    // headers['content-type'] = ''

    return this.http
      .get(`${environment.API_URL_BASE}/pagome_rp/getReportPagamento`, {
        params: body,
        headers,
        responseType: 'arraybuffer',
      })
      .pipe(
        map((file: ArrayBuffer) => {
          return file
        }),
      )
  }
}
