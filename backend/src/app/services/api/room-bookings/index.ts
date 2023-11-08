import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable()
export class RoomBookingBookingsService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.get(`${environment.API_URL_BASE}/newbolite/v2/roombookings/bookings`, {
      params: body,
      headers: headers,
    })
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
