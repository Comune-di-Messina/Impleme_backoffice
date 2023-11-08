import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { DettaglioStruttura } from 'src/app/models/dettaglio-struttura'
import { environment } from 'src/environments/environment'

@Injectable()
export class RoomsService {
  constructor(private http: HttpClient) {}

  list(comune): Observable<any> {
    let params = new HttpParams()
    params = params.set('comune', comune)
    const headers = { authRequest: '' }

    return this.http
      .get(`${environment.API_ROOMS_URL_BASE}/public/rooms`, {
        params,
        headers,
      })
      .pipe(map(res => DettaglioStruttura.fromJsonArray(res)))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }

  create(model): Observable<any> {
    const headers = { authRequest: '' }
    return this.http.post(`${environment.API_ROOMS_URL_BASE}/rooms`, model, {
      headers,
    })
  }

  update(model): Observable<any> {
    const headers = { authRequest: '' }
    return this.http.put(`${environment.API_ROOMS_URL_BASE}/rooms/${model.id}`, model, {
      headers,
    })
  }

  delete(id): Observable<any> {
    const headers = { authRequest: '' }
    return this.http.delete(`${environment.API_ROOMS_URL_BASE}/rooms/${id}`, {
      headers,
    })
  }

  view(roomId): Observable<any> {
    const headers = { authRequest: '' }
    return this.http
      .get(`${environment.API_ROOMS_URL_BASE}/public/rooms/${roomId}`, {
        headers,
      })
      .pipe(map(res => DettaglioStruttura.fromJson(res)))
    //.catch((error: any) => Observable.throw(error.json().status.message || 'Server error'));
  }
}
