import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable()
export class BookingsService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http
      .get(`${environment.API_URL_BASE}/newbolite/v2/roombookings/bookings`, {
        params: body,
        headers: headers,
      })
      .pipe(
        map((bookings: any[]) => ({
          bookings_open: bookings.filter(
            file => file.stato === 1 || file.stato === 2 || file.stato === 3 || file.stato === 4,
          ),
          bookings_closed: bookings.filter(
            file => file.stato === 5 || file.stato === 6 || file.stato === 7 || file.stato === 8,
          ),
          bookings_confirmed: bookings.filter(file => file.stato === 5),
          bookings_demandable: bookings.filter(file => file.stato === 4),
        })),
      )
  }

  states(): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http
      .get(`${environment.API_URL_BASE}/newbolite/v2/roombookings/status`, {
        params: body,
        headers: headers,
      })
      .pipe(
        map(response => ({
          stati: response,
        })),
      )
  }

  view(numeroPratica: any): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(
      `${environment.API_URL_BASE}/newbolite/v2/roombookings/bookings/${numeroPratica}`,
      {
        params: body,
        headers: headers,
      },
    )
  }

  documentContent(id: any): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_URL_BASE}/newbolite/v2/documents/${id}/content`, {
      params: body,
      headers: headers,
      responseType: 'blob',
    })
  }

  delete(numeroPratica, motivo): Observable<any> {
    const headers = { authRequest: '' }
    const url = `${environment.API_URL_BASE}/newbolite/v2/roombookings/bookings/${numeroPratica}`
    return this.http.request('delete', url, { headers, body: { motivo } })
  }
}
