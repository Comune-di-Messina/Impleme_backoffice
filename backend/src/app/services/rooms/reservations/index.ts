import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import * as store from 'store'
import { map } from 'rxjs/operators'
import { DettaglioStruttura } from 'src/app/models/dettaglio-struttura'
import { environment } from 'src/environments/environment'
import { AuthService } from '../../../auth/auth.service'

@Injectable()
export class ReservationsService {
  constructor(private http: HttpClient) {}

  create(roomId, model): Observable<any> {
    // const body = new HttpParams()
    const headers = { authRequest: '' }
    delete model.id // TODO: uhm... e se la chiamata va in eccezione?
    return this.http.post(`${environment.API_ROOMS_URL_BASE}/rooms/${roomId}/reservations`, model, {
      headers,
    })
  }

  update(roomId, model): Observable<any> {
    // const body = new HttpParams()
    const headers = { authRequest: '' }
    const id = model.id
    delete model.id
    return this.http.put(
      `${environment.API_ROOMS_URL_BASE}/rooms/${roomId}/reservations/${id}`,
      model,
      {
        headers,
      },
    )
  }

  delete(roomId, id): Observable<any> {
    // const body = new HttpParams()
    const headers = { authRequest: '' }
    return this.http.delete(
      `${environment.API_ROOMS_URL_BASE}/rooms/${roomId}/reservations/${id}`,
      {
        headers,
      },
    )
  }
}
